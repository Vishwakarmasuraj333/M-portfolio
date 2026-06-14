"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Lock,
  LayoutDashboard,
  FolderCode,
  BookOpen,
  Image as ImageIcon,
  Key,
  LogOut,
  Plus,
  Trash2,
  CheckCircle,
  Eye,
  Mail,
  RefreshCw,
  EyeOff,
  X
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);

  // Auth Inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Tab Selection
  const [activeTab, setActiveTab] = useState<"Overview" | "Projects" | "Blogs" | "Gallery" | "Account">("Overview");

  // Telemetry and database records state
  const [analytics, setAnalytics] = useState<any>({ totalViews: 0, deviceStats: [], countryStats: [], recentViews: [] });
  const [contacts, setContacts] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);

  // Feedback notifications
  const [sysMessage, setSysMessage] = useState("");
  const [sysError, setSysError] = useState("");

  // Create Form states
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    category: "WordPress Projects",
    image: "",
    liveUrl: "",
    githubUrl: "",
    techStack: "",
    featured: false,
    order: 0,
  });

  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    image: "",
    tags: "",
    published: true,
  });

  const [galleryForm, setGalleryForm] = useState({
    title: "",
    category: "Designs",
    image: "",
  });

  const [accountForm, setAccountForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  // Verify auth session on load
  useEffect(() => {
    fetch("/api/auth/verify")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setIsAuthenticated(true);
          fetchDashboardData();
        }
      })
      .catch((err) => console.error("Verify check error:", err))
      .finally(() => setAuthChecked(true));
  }, []);

  const fetchDashboardData = async () => {
    setApiLoading(true);
    try {
      // Run concurrent requests
      const [projRes, blogRes, galRes, contactRes, analyticRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/blogs"),
        fetch("/api/gallery"),
        fetch("/api/contacts"),
        fetch("/api/analytics"),
      ]);

      const [projData, blogData, galData, contactData, analyticData] = await Promise.all([
        projRes.json(),
        blogRes.json(),
        galRes.json(),
        contactRes.json(),
        analyticRes.json(),
      ]);

      if (Array.isArray(projData)) setProjects(projData);
      if (Array.isArray(blogData)) setBlogs(blogData);
      if (Array.isArray(galData)) setGallery(galData);
      if (Array.isArray(contactData)) setContacts(contactData);
      if (analyticData && !analyticData.error) setAnalytics(analyticData);
    } catch (err) {
      console.error("Error loading admin datasets:", err);
    } finally {
      setApiLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setLoginLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        fetchDashboardData();
      } else {
        setAuthError(data.error || "Credentials authorization failed.");
      }
    } catch (err) {
      setAuthError("Server route interface mismatch.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setIsAuthenticated(false);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error("Logout issue:", err);
    }
  };

  // Base64 file converter helper
  const handleFileEncode = (e: React.ChangeEvent<HTMLInputElement>, formType: "project" | "blog" | "gallery") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (formType === "project") setProjectForm((prev) => ({ ...prev, image: base64String }));
      if (formType === "blog") setBlogForm((prev) => ({ ...prev, image: base64String }));
      if (formType === "gallery") setGalleryForm((prev) => ({ ...prev, image: base64String }));
    };
    reader.readAsDataURL(file);
  };

  // CRUD PROJECT SUBMISSION
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSysMessage("");
    setSysError("");

    if (!projectForm.title || !projectForm.description || !projectForm.image) {
      setSysError("Complete all required project cells.");
      return;
    }

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...projectForm,
          techStack: projectForm.techStack.split(",").map((s) => s.trim()).filter(Boolean),
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSysMessage(data.message || "Project registered successfully.");
        // Insert into active table array
        setProjects((prev) => [data.project, ...prev]);
        setProjectForm({
          title: "",
          description: "",
          category: "WordPress Projects",
          image: "",
          liveUrl: "",
          githubUrl: "",
          techStack: "",
          featured: false,
          order: 0,
        });
      } else {
        setSysError(data.error || "Failed to create project");
      }
    } catch (err) {
      setSysError("Network error publishing project");
    }
  };

  const handleProjectDelete = async (id: string) => {
    if (!confirm("Remove project from registry?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        setProjects((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // CRUD BLOG SUBMISSION
  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSysMessage("");
    setSysError("");

    if (!blogForm.title || !blogForm.slug || !blogForm.summary || !blogForm.content || !blogForm.image) {
      setSysError("Complete all required blog inputs.");
      return;
    }

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...blogForm,
          tags: blogForm.tags.split(",").map((s) => s.trim()).filter(Boolean),
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSysMessage(data.message || "Article uploaded successfully.");
        setBlogs((prev) => [data.blog, ...prev]);
        setBlogForm({
          title: "",
          slug: "",
          summary: "",
          content: "",
          image: "",
          tags: "",
          published: true,
        });
      } else {
        setSysError(data.error || "Failed to post article");
      }
    } catch (err) {
      setSysError("Network error posting article");
    }
  };

  const handleBlogDelete = async (id: string) => {
    if (!confirm("Delete this article?")) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // CRUD GALLERY SUBMISSION
  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSysMessage("");
    setSysError("");

    if (!galleryForm.title || !galleryForm.image) {
      setSysError("Complete title and select graphic files.");
      return;
    }

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(galleryForm),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSysMessage(data.message || "Art catalogued successfully.");
        setGallery((prev) => [data.gallery, ...prev]);
        setGalleryForm({ title: "", category: "Designs", image: "" });
      } else {
        setSysError(data.error || "Failed to add design");
      }
    } catch (err) {
      setSysError("Network error updating gallery");
    }
  };

  const handleGalleryDelete = async (id: string) => {
    if (!confirm("Delete gallery artwork?")) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        setGallery((prev) => prev.filter((g) => g._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // MARK READ / DELETE CONTACT MESSAGE
  const toggleContactStatus = async (id: string, currentRead: boolean) => {
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !currentRead }),
      });
      if (res.ok) {
        setContacts((prev) =>
          prev.map((c) => (c._id === id ? { ...c, read: !currentRead } : c))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleContactDelete = async (id: string) => {
    if (!confirm("Delete contact message?")) return;
    try {
      const res = await fetch(`/api/contacts/${id}`, { method: "DELETE" });
      if (res.ok) {
        setContacts((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!authChecked) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center font-space-grotesk">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-primary animate-spin" />
        <span className="text-gray-500 text-xs mt-3 tracking-widest">LOADING SESSION SECURE SYSTEM...</span>
      </div>
    );
  }

  // 1. RENDER Futuristic Secure Login Form IF NOT Authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 relative">
        <div className="absolute w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md glass-panel-neon p-8 rounded-2xl relative"
        >
          {/* Top corner cyber headers */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary" />

          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center border border-primary/20 text-primary mb-3">
              <Lock size={20} className="animate-pulse" />
            </div>
            <h2 className="font-orbitron font-extrabold text-white text-xl tracking-wider">ADMIN CONSOLE</h2>
            <p className="font-space-grotesk text-[10px] text-gray-500 tracking-widest mt-1">SECURE PORTAL LEVEL 1</p>
          </div>

          {authError && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3 rounded text-xs font-space-grotesk mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4 font-space-grotesk text-xs sm:text-sm">
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-400 font-semibold tracking-wide">OPERATOR USERNAME</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loginLoading}
                className="bg-white/5 border border-white/5 focus:border-primary/50 outline-none rounded p-3 text-white transition-all font-inter"
                placeholder="Operator ID"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-gray-400 font-semibold tracking-wide">SECURE ACCESS CODE</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loginLoading}
                className="bg-white/5 border border-white/5 focus:border-primary/50 outline-none rounded p-3 text-white transition-all font-inter"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 px-6 py-3 rounded text-white font-bold tracking-wider shadow-[0_0_15px_rgba(255,77,184,0.4)] transition-all cursor-pointer hover:scale-[1.02] active:scale-95 disabled:opacity-50 mt-4"
            >
              {loginLoading ? (
                <div className="w-5 h-5 rounded-full border-2 border-t-transparent border-white animate-spin" />
              ) : (
                <span>INITIALIZE CONSOLE</span>
              )}
            </button>
          </form>

          {/* Seed notice helpful helper */}
          <div className="mt-8 border-t border-white/5 pt-4 text-center">
            <span className="text-[10px] text-gray-500 font-mono">
              Note: Seeds default credential `admin` / `admin-mamta-2026` on first run.
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  // 2. RENDER Active Admin Control Panel Dashboard
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
      
      {/* Sidebar Navigation */}
      <div className="lg:col-span-3 flex flex-col gap-6">
        <div className="glass-panel p-6 rounded-2xl border-white/5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-white/5 mb-6">
            <div className="w-9 h-9 rounded bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
              <LayoutDashboard size={16} />
            </div>
            <div>
              <h3 className="font-orbitron font-extrabold text-white text-sm">CONSOLE</h3>
              <p className="font-mono text-[9px] text-gray-500">USER: ADMIN // SECURE</p>
            </div>
          </div>

          <nav className="flex flex-col gap-2 font-space-grotesk text-xs">
            {[
              { name: "Overview", icon: LayoutDashboard },
              { name: "Projects", icon: FolderCode },
              { name: "Blogs", icon: BookOpen },
              { name: "Gallery", icon: ImageIcon },
              { name: "Account", icon: Key },
            ].map((tab) => {
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.name}
                  onClick={() => {
                    setActiveTab(tab.name as any);
                    setSysMessage("");
                    setSysError("");
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all cursor-pointer ${
                    activeTab === tab.name
                      ? "bg-secondary/15 text-white border-secondary/30"
                      : "bg-transparent text-gray-400 border-transparent hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <IconComp size={14} />
                  <span>{tab.name}</span>
                </button>
              );
            })}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-transparent hover:bg-rose-500/10 hover:text-rose-400 text-gray-400 transition-all cursor-pointer mt-6"
            >
              <LogOut size={14} />
              <span>Disconnect</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Panel Content Area */}
      <div className="lg:col-span-9 flex flex-col gap-6">
        
        {/* Status notification popups */}
        {sysMessage && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-xs sm:text-sm font-space-grotesk flex items-center gap-2">
            <CheckCircle size={16} />
            <span>{sysMessage}</span>
          </div>
        )}

        {sysError && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-4 rounded-xl text-xs sm:text-sm font-space-grotesk flex items-center gap-2">
            <X size={16} />
            <span>{sysError}</span>
          </div>
        )}

        {/* TAB 1: OVERVIEW & SYSTEM TELEMETRY */}
        {activeTab === "Overview" && (
          <div className="flex flex-col gap-6">
            {/* Quick telemetry counter grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "TELEMETRY VIEWS", value: analytics.totalViews, desc: "Total route impressions" },
                { title: "PROJECT RECORDS", value: projects.length, desc: "Active showcases" },
                { title: "BLOG ENTRIES", value: blogs.length, desc: "Articles published" },
                { title: "GALLERY DESIGNS", value: gallery.length, desc: "Media catalogued" },
              ].map((stat) => (
                <div key={stat.title} className="glass-panel p-4 rounded-xl border-white/5">
                  <h5 className="font-space-grotesk text-[9px] text-gray-500 font-bold uppercase tracking-wider">{stat.title}</h5>
                  <p className="font-orbitron font-extrabold text-2xl text-white mt-1">{stat.value}</p>
                  <p className="text-[9px] text-gray-500 mt-0.5">{stat.desc}</p>
                </div>
              ))}
            </div>

            {/* Inbox Section */}
            <div className="glass-panel p-6 rounded-2xl border-white/5">
              <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-6">
                <h4 className="font-orbitron font-bold text-white text-base flex items-center gap-2">
                  <Mail size={16} className="text-secondary" />
                  Signal Message Inbox
                </h4>
                
                <button
                  onClick={fetchDashboardData}
                  disabled={apiLoading}
                  className="w-8 h-8 rounded border border-white/10 flex items-center justify-center hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Refresh telemetry logs"
                >
                  <RefreshCw size={14} className={apiLoading ? "animate-spin" : ""} />
                </button>
              </div>

              {contacts.length === 0 ? (
                <div className="py-12 text-center text-gray-500 font-space-grotesk text-xs">
                  NO MESSAGES RECEIVED IN TRANSMISSION STREAMS.
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {contacts.map((msg) => (
                    <div
                      key={msg._id}
                      className={`p-4 rounded-xl border transition-colors ${
                        msg.read
                          ? "bg-transparent border-white/5 hover:border-white/10"
                          : "bg-secondary/5 border-secondary/20 hover:border-secondary/30"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2.5">
                        <div>
                          <span className="font-orbitron font-bold text-white text-sm">{msg.name}</span>
                          <span className="font-mono text-[10px] text-gray-500 block sm:inline sm:ml-2">({msg.email})</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleContactStatus(msg._id, msg.read)}
                            className={`w-7 h-7 rounded border flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer ${
                              msg.read ? "border-white/5 hover:bg-white/5" : "border-secondary/20 bg-secondary/10 hover:bg-secondary/20"
                            }`}
                            title={msg.read ? "Mark unread" : "Mark read"}
                          >
                            {msg.read ? <EyeOff size={12} /> : <Eye size={12} />}
                          </button>
                          
                          <button
                            onClick={() => handleContactDelete(msg._id)}
                            className="w-7 h-7 rounded border border-white/5 hover:border-rose-500/30 flex items-center justify-center hover:bg-rose-500/10 text-gray-400 hover:text-rose-400 transition-colors cursor-pointer"
                            title="Delete log"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>

                      <span className="font-space-grotesk text-accent text-xs block mb-1.5">{msg.subject}</span>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-inter">{msg.message}</p>
                      
                      <span className="text-[9px] font-mono text-gray-500 block mt-2 text-right">
                        RECEIVED // {new Date(msg.createdAt).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS MANAGEMENT */}
        {activeTab === "Projects" && (
          <div className="flex flex-col gap-8">
            {/* Create Project Form */}
            <div className="glass-panel p-6 rounded-2xl border-white/5">
              <h4 className="font-orbitron font-bold text-white text-base pb-4 border-b border-white/5 mb-6 flex items-center gap-2">
                <Plus size={16} className="text-primary" />
                Register New Showcase Project
              </h4>

              <form onSubmit={handleProjectSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 font-space-grotesk text-xs sm:text-sm">
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 font-semibold tracking-wide">PROJECT TITLE *</label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm((p) => ({ ...p, title: e.target.value }))}
                    className="bg-white/5 border border-white/5 focus:border-primary/50 outline-none rounded p-3 text-white transition-all font-inter"
                    placeholder="Project Name"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 font-semibold tracking-wide">DISPLAY CATEGORY *</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm((p) => ({ ...p, category: e.target.value }))}
                    className="bg-[#0b1020] border border-white/5 focus:border-primary/50 outline-none rounded p-3 text-white transition-all"
                  >
                    <option value="WordPress Projects">WordPress Projects</option>
                    <option value="PHP MySQL Projects">PHP MySQL Projects</option>
                    <option value="Responsive Design">Responsive Design</option>
                    <option value="Frontend">Frontend</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-gray-400 font-semibold tracking-wide">PROJECT DESCRIPTION *</label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) => setProjectForm((p) => ({ ...p, description: e.target.value }))}
                    rows={3}
                    className="bg-white/5 border border-white/5 focus:border-primary/50 outline-none rounded p-3 text-white resize-none transition-all font-inter"
                    placeholder="Provide description summary..."
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 font-semibold tracking-wide">LIVE DEMO URL</label>
                  <input
                    type="url"
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm((p) => ({ ...p, liveUrl: e.target.value }))}
                    className="bg-white/5 border border-white/5 focus:border-primary/50 outline-none rounded p-3 text-white transition-all font-inter"
                    placeholder="https://..."
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 font-semibold tracking-wide">CODE REPOSITORY URL</label>
                  <input
                    type="url"
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm((p) => ({ ...p, githubUrl: e.target.value }))}
                    className="bg-white/5 border border-white/5 focus:border-primary/50 outline-none rounded p-3 text-white transition-all font-inter"
                    placeholder="https://github.com/..."
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 font-semibold tracking-wide">TECH STACK (COMMA SEPARATED)</label>
                  <input
                    type="text"
                    value={projectForm.techStack}
                    onChange={(e) => setProjectForm((p) => ({ ...p, techStack: e.target.value }))}
                    className="bg-white/5 border border-white/5 focus:border-primary/50 outline-none rounded p-3 text-white transition-all font-inter"
                    placeholder="Next.js, TypeScript, Tailwind"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 font-semibold tracking-wide">SORT ORDER MATRIX</label>
                  <input
                    type="number"
                    value={projectForm.order}
                    onChange={(e) => setProjectForm((p) => ({ ...p, order: Number(e.target.value) || 0 }))}
                    className="bg-white/5 border border-white/5 focus:border-primary/50 outline-none rounded p-3 text-white transition-all font-inter"
                    placeholder="0"
                  />
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-gray-400 font-semibold tracking-wide">UPLOAD SCREENSHOT * (IMAGE FILE)</label>
                  <div className="flex items-center gap-4 flex-wrap">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileEncode(e, "project")}
                      className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:cursor-pointer"
                      required={!projectForm.image}
                    />
                    {projectForm.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={projectForm.image}
                        alt="Project Preview"
                        className="w-16 aspect-video object-cover rounded border border-white/10"
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={projectForm.featured}
                    onChange={(e) => setProjectForm((p) => ({ ...p, featured: e.target.checked }))}
                    className="w-4 h-4 rounded text-primary focus:ring-primary focus:ring-opacity-25"
                  />
                  <label htmlFor="featured" className="text-gray-400 font-semibold cursor-pointer">FEATURED HIGHLIGHT</label>
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 px-6 py-3 rounded text-white font-bold tracking-wider shadow-[0_0_15px_rgba(255,77,184,0.4)] transition-all cursor-pointer hover:scale-[1.02] active:scale-95 disabled:opacity-50 mt-4"
                  >
                    <Plus size={15} />
                    <span>CREATE PROJECT</span>
                  </button>
                </div>
              </form>
            </div>

            {/* List Table */}
            <div className="glass-panel p-6 rounded-2xl border-white/5">
              <h4 className="font-orbitron font-bold text-white text-base pb-4 border-b border-white/5 mb-6">
                Active Projects Registry
              </h4>

              {projects.length === 0 ? (
                <div className="py-12 text-center text-gray-500 font-space-grotesk text-xs">
                  NO SHOWCASE PROJECT ENTRIES IN DATABASE.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-space-grotesk text-xs text-gray-400">
                    <thead>
                      <tr className="border-b border-white/5 font-bold text-white">
                        <th className="py-3 px-2">COVER</th>
                        <th className="py-3 px-2">TITLE</th>
                        <th className="py-3 px-2">CATEGORY</th>
                        <th className="py-3 px-2">FEATURED</th>
                        <th className="py-3 px-2 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((proj) => (
                        <tr key={proj._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-3 px-2">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={proj.image}
                              alt={proj.title}
                              className="w-12 aspect-video object-cover rounded border border-white/10"
                            />
                          </td>
                          <td className="py-3 px-2 text-white font-semibold">{proj.title}</td>
                          <td className="py-3 px-2">{proj.category}</td>
                          <td className="py-3 px-2">{proj.featured ? "Yes" : "No"}</td>
                          <td className="py-3 px-2 text-right">
                            <button
                              onClick={() => handleProjectDelete(proj._id)}
                              className="w-7 h-7 rounded border border-white/5 hover:border-rose-500/30 flex items-center justify-center hover:bg-rose-500/10 text-gray-400 hover:text-rose-400 transition-colors cursor-pointer ml-auto"
                            >
                              <Trash2 size={12} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: BLOGS MANAGEMENT */}
        {activeTab === "Blogs" && (
          <div className="flex flex-col gap-8">
            {/* Create Blog Form */}
            <div className="glass-panel p-6 rounded-2xl border-white/5">
              <h4 className="font-orbitron font-bold text-white text-base pb-4 border-b border-white/5 mb-6 flex items-center gap-2">
                <Plus size={16} className="text-secondary" />
                Compose New Blog Post
              </h4>

              <form onSubmit={handleBlogSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 font-space-grotesk text-xs sm:text-sm">
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 font-semibold tracking-wide">POST TITLE *</label>
                  <input
                    type="text"
                    value={blogForm.title}
                    onChange={(e) => {
                      const titleVal = e.target.value;
                      const slugVal = titleVal.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                      setBlogForm((b) => ({ ...b, title: titleVal, slug: slugVal }));
                    }}
                    className="bg-white/5 border border-white/5 focus:border-secondary/50 outline-none rounded p-3 text-white transition-all font-inter"
                    placeholder="Article Title"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 font-semibold tracking-wide">URL SLUG *</label>
                  <input
                    type="text"
                    value={blogForm.slug}
                    onChange={(e) => setBlogForm((b) => ({ ...b, slug: e.target.value }))}
                    className="bg-white/5 border border-white/5 focus:border-secondary/50 outline-none rounded p-3 text-white transition-all font-inter"
                    placeholder="article-url-slug"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-gray-400 font-semibold tracking-wide">SUMMARY EXCERPT *</label>
                  <textarea
                    value={blogForm.summary}
                    onChange={(e) => setBlogForm((b) => ({ ...b, summary: e.target.value }))}
                    rows={2}
                    className="bg-white/5 border border-white/5 focus:border-secondary/50 outline-none rounded p-3 text-white resize-none transition-all font-inter"
                    placeholder="Short summary excerpt..."
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-gray-400 font-semibold tracking-wide">MARKDOWN CONTENT *</label>
                  <textarea
                    value={blogForm.content}
                    onChange={(e) => setBlogForm((b) => ({ ...b, content: e.target.value }))}
                    rows={8}
                    className="bg-white/5 border border-white/5 focus:border-secondary/50 outline-none rounded p-3 text-white resize-none transition-all font-mono text-xs"
                    placeholder="## Heading\n\nWrite article copy..."
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 font-semibold tracking-wide">TAGS (COMMA SEPARATED)</label>
                  <input
                    type="text"
                    value={blogForm.tags}
                    onChange={(e) => setBlogForm((b) => ({ ...b, tags: e.target.value }))}
                    className="bg-white/5 border border-white/5 focus:border-secondary/50 outline-none rounded p-3 text-white transition-all font-inter"
                    placeholder="React, Frontend, WebDev"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 font-semibold tracking-wide">UPLOAD THUMBNAIL *</label>
                  <div className="flex items-center gap-4 flex-wrap">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileEncode(e, "blog")}
                      className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20 file:cursor-pointer"
                      required={!blogForm.image}
                    />
                    {blogForm.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={blogForm.image}
                        alt="Blog Preview"
                        className="w-16 aspect-video object-cover rounded border border-white/10"
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    id="published"
                    checked={blogForm.published}
                    onChange={(e) => setBlogForm((b) => ({ ...b, published: e.target.checked }))}
                    className="w-4 h-4 rounded text-secondary focus:ring-secondary focus:ring-opacity-25"
                  />
                  <label htmlFor="published" className="text-gray-400 font-semibold cursor-pointer">PUBLISHED DIRECTLY</label>
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-secondary to-primary hover:opacity-90 px-6 py-3 rounded text-white font-bold tracking-wider shadow-[0_0_15px_rgba(184,77,255,0.4)] transition-all cursor-pointer hover:scale-[1.02] active:scale-95 disabled:opacity-50 mt-4"
                  >
                    <Plus size={15} />
                    <span>PUBLISH POST</span>
                  </button>
                </div>
              </form>
            </div>

            {/* List Table */}
            <div className="glass-panel p-6 rounded-2xl border-white/5">
              <h4 className="font-orbitron font-bold text-white text-base pb-4 border-b border-white/5 mb-6">
                Active Articles Registry
              </h4>

              {blogs.length === 0 ? (
                <div className="py-12 text-center text-gray-500 font-space-grotesk text-xs">
                  NO ARTICLE POSTS IN DATABASE.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-space-grotesk text-xs text-gray-400">
                    <thead>
                      <tr className="border-b border-white/5 font-bold text-white">
                        <th className="py-3 px-2">THUMBNAIL</th>
                        <th className="py-3 px-2">TITLE</th>
                        <th className="py-3 px-2">SLUG</th>
                        <th className="py-3 px-2">PUBLISHED</th>
                        <th className="py-3 px-2 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.map((b) => (
                        <tr key={b._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-3 px-2">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={b.image}
                              alt={b.title}
                              className="w-12 aspect-video object-cover rounded border border-white/10"
                            />
                          </td>
                          <td className="py-3 px-2 text-white font-semibold">{b.title}</td>
                          <td className="py-3 px-2">{b.slug}</td>
                          <td className="py-3 px-2">{b.published ? "Yes" : "No"}</td>
                          <td className="py-3 px-2 text-right">
                            <button
                              onClick={() => handleBlogDelete(b._id)}
                              className="w-7 h-7 rounded border border-white/5 hover:border-rose-500/30 flex items-center justify-center hover:bg-rose-500/10 text-gray-400 hover:text-rose-400 transition-colors cursor-pointer ml-auto"
                            >
                              <Trash2 size={12} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: GALLERY MANAGEMENT */}
        {activeTab === "Gallery" && (
          <div className="flex flex-col gap-8">
            {/* Create Gallery Form */}
            <div className="glass-panel p-6 rounded-2xl border-white/5">
              <h4 className="font-orbitron font-bold text-white text-base pb-4 border-b border-white/5 mb-6 flex items-center gap-2">
                <Plus size={16} className="text-secondary" />
                Upload Gallery Artwork
              </h4>

              <form onSubmit={handleGallerySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 font-space-grotesk text-xs sm:text-sm">
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 font-semibold tracking-wide">IMAGE TITLE *</label>
                  <input
                    type="text"
                    value={galleryForm.title}
                    onChange={(e) => setGalleryForm((g) => ({ ...g, title: e.target.value }))}
                    className="bg-white/5 border border-white/5 focus:border-secondary/50 outline-none rounded p-3 text-white transition-all font-inter"
                    placeholder="Art Title"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 font-semibold tracking-wide">DISPLAY CATEGORY *</label>
                  <select
                    value={galleryForm.category}
                    onChange={(e) => setGalleryForm((g) => ({ ...g, category: e.target.value }))}
                    className="bg-[#0b1020] border border-white/5 focus:border-secondary/50 outline-none rounded p-3 text-white transition-all"
                  >
                    <option value="Designs">Designs</option>
                    <option value="AI Art">AI Art</option>
                    <option value="Certifications">Certifications</option>
                    <option value="Workspace">Workspace</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-gray-400 font-semibold tracking-wide">SELECT IMAGE FILE *</label>
                  <div className="flex items-center gap-4 flex-wrap">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileEncode(e, "gallery")}
                      className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20 file:cursor-pointer"
                      required={!galleryForm.image}
                    />
                    {galleryForm.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={galleryForm.image}
                        alt="Gallery Preview"
                        className="w-14 h-14 object-cover rounded border border-white/10"
                      />
                    )}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-secondary to-primary hover:opacity-90 px-6 py-3 rounded text-white font-bold tracking-wider shadow-[0_0_15px_rgba(184,77,255,0.4)] transition-all cursor-pointer hover:scale-[1.02] active:scale-95 disabled:opacity-50 mt-4"
                  >
                    <Plus size={15} />
                    <span>UPLOAD IMAGE</span>
                  </button>
                </div>
              </form>
            </div>

            {/* List Grid */}
            <div className="glass-panel p-6 rounded-2xl border-white/5">
              <h4 className="font-orbitron font-bold text-white text-base pb-4 border-b border-white/5 mb-6">
                Active Gallery Catalog
              </h4>

              {gallery.length === 0 ? (
                <div className="py-12 text-center text-gray-500 font-space-grotesk text-xs">
                  NO GALLERY ARTWORK REGISTERED IN DATABASE.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {gallery.map((g) => (
                    <div key={g._id} className="relative group border border-white/5 rounded-xl overflow-hidden aspect-square bg-[#050816]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={g.image}
                        alt={g.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                        <span className="bg-secondary/90 text-[8px] text-white px-1.5 py-0.5 rounded font-space-grotesk self-start">
                          {g.category}
                        </span>
                        
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] text-white font-space-grotesk line-clamp-1">{g.title}</span>
                          <button
                            onClick={() => handleGalleryDelete(g._id)}
                            className="w-6 h-6 rounded bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer flex items-center justify-center border border-rose-500/20"
                          >
                            <Trash2 size={10} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: ACCOUNT CREDENTIALS */}
        {activeTab === "Account" && (
          <div className="glass-panel p-6 rounded-2xl border-white/5 max-w-md">
            <h4 className="font-orbitron font-bold text-white text-base pb-4 border-b border-white/5 mb-6 flex items-center gap-2">
              <Key size={16} className="text-accent" />
              Operator Security Settings
            </h4>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setSysMessage("");
                setSysError("");

                if (!accountForm.newPassword) return;
                if (accountForm.newPassword !== accountForm.confirmPassword) {
                  setSysError("Passwords mismatch verification.");
                  return;
                }

                try {
                  const res = await fetch("/api/auth/login", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ newPassword: accountForm.newPassword }),
                  });
                  const data = await res.json();
                  if (res.ok && data.success) {
                    setSysMessage(data.message || "Credential keys modified.");
                    setAccountForm({ newPassword: "", confirmPassword: "" });
                  } else {
                    setSysError(data.error || "Failed modifying database password.");
                  }
                } catch (err) {
                  setSysError("Network error changing credentials.");
                }
              }}
              className="flex flex-col gap-4 font-space-grotesk text-xs sm:text-sm"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-400 font-semibold tracking-wide">NEW PASSWORD</label>
                <input
                  type="password"
                  value={accountForm.newPassword}
                  onChange={(e) => setAccountForm((a) => ({ ...a, newPassword: e.target.value }))}
                  className="bg-white/5 border border-white/5 focus:border-accent/50 outline-none rounded p-3 text-white transition-all font-inter"
                  placeholder="New Secure Code"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-gray-400 font-semibold tracking-wide">CONFIRM NEW PASSWORD</label>
                <input
                  type="password"
                  value={accountForm.confirmPassword}
                  onChange={(e) => setAccountForm((a) => ({ ...a, confirmPassword: e.target.value }))}
                  className="bg-white/5 border border-white/5 focus:border-accent/50 outline-none rounded p-3 text-white transition-all font-inter"
                  placeholder="Confirm New Code"
                  required
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-primary hover:opacity-90 px-6 py-3 rounded text-white font-bold tracking-wider shadow-[0_0_15px_rgba(255,128,223,0.4)] transition-all cursor-pointer hover:scale-[1.02] active:scale-95 mt-4"
              >
                <span>UPDATE KEY</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
