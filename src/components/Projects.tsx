"use client";

import { useEffect, useState } from "react";
import { Globe, Sparkles, FolderCode } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack: string[];
  featured: boolean;
}

const defaultProjects: Project[] = [
  {
    _id: "res-p1",
    title: "Responsive Portfolio Website",
    description: "An ultra-premium personal portfolio website featuring smooth animations, space visuals, custom SVG assets, contact logs, and full responsive support.",
    category: "Responsive Design",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    techStack: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Framer Motion"],
    featured: true,
  },
  {
    _id: "res-p2",
    title: "Bootstrap Landing Page",
    description: "A fast, fully optimized lead generation landing page built on Bootstrap v5 grids with clean layouts and basic SEO setup.",
    category: "Frontend",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    techStack: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "SEO Basics"],
    featured: true,
  },
  {
    _id: "res-p3",
    title: "Admin Dashboard UI Platform",
    description: "A sleek, responsive administration control panel interface featuring statistics charts, message boards, and interactive tables.",
    category: "Frontend",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    techStack: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "ChartJS"],
    featured: false,
  }
];

const categories = ["All", "Featured Projects", "Responsive Design", "Frontend"];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Fetch dynamic projects from API
  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const generalFiltered = data.filter(p => p.category === "Responsive Design" || p.category === "Frontend");
          if (generalFiltered.length > 0) {
            setProjects(generalFiltered);
          }
        }
      })
      .catch((err) => console.error("Error fetching projects:", err))
      .finally(() => setLoading(false));
  }, []);

  // Filter projects by active tab
  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "Featured Projects") return project.featured;
    return project.category === selectedCategory;
  });

  // Zero-dependency 3D Tilt Card physics (disabled on mobile for smooth scrolling)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Limits rotation angles to max 12 degrees
    const rotateX = -(y / (box.height / 2)) * 12;
    const rotateY = (x / (box.width / 2)) * 12;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80";
  };

  return (
    <section id="projects" className="relative py-24 px-6 overflow-hidden">
      {/* Background neon blur spot */}
      <div className="absolute right-0 top-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center gap-2 mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-orbitron text-xs text-primary tracking-widest font-semibold"
          >
            05 // SYSTEM BLUEPRINTS
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron text-3xl md:text-4xl font-extrabold tracking-wide"
          >
            PROJECTS & <span className="text-primary text-glow">REPOSITORIES</span>
          </motion.h2>
          
          <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-secondary mt-1" />
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 mb-16 max-w-2xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`font-space-grotesk text-xs sm:text-sm px-4 py-2 rounded-full border transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-primary text-white border-primary shadow-[0_0_15px_#ff4db8]"
                  : "bg-white/5 text-gray-400 border-white/5 hover:border-primary/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid Display */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-primary animate-spin" />
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.4 }}
                  className="h-full"
                >
                  {/* Outer Tilt Container */}
                  <div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="card-3d h-full bg-[#0b1020]/45 border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-primary/20 transition-all duration-300"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    
                    {/* Visual Cover Layer */}
                    <div className="relative aspect-video w-full overflow-hidden bg-bg-space-deep border-b border-white/5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={project.title}
                        onError={handleImageError}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        loading="lazy"
                      />
                      
                      {/* Top Corner Floating Labels */}
                      {project.featured && (
                        <span className="absolute top-3 right-3 flex items-center gap-1 bg-primary/95 text-white font-orbitron text-[9px] tracking-wider font-semibold px-2 py-0.5 rounded shadow shadow-black/50 border border-primary/20">
                          <Sparkles size={8} />
                          FEATURED
                        </span>
                      )}
                      
                      <span className="absolute bottom-3 left-3 bg-[#050816]/85 border border-white/10 text-accent font-space-grotesk text-[9px] px-2 py-0.5 rounded">
                        {project.category}
                      </span>
                    </div>

                    {/* Meta/Text Layer */}
                    <div className="p-6 flex flex-col justify-between flex-grow" style={{ transform: "translateZ(20px)" }}>
                      <div>
                        <h3 className="font-orbitron font-extrabold text-white text-base sm:text-lg mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-inter mb-6">
                          {project.description}
                        </p>
                      </div>

                      {/* Stack details + CTA icons */}
                      <div className="mt-auto">
                        <div className="flex flex-wrap gap-1 mb-6">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="font-space-grotesk text-[9px] bg-white/5 px-2 py-0.5 rounded text-gray-400"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 font-space-grotesk text-xs text-primary hover:text-white transition-colors font-medium"
                            >
                              <Globe size={13} />
                              <span>Live Demo</span>
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 font-space-grotesk text-xs text-gray-400 hover:text-white transition-colors"
                            >
                              <GithubIcon style={{ width: "13px", height: "13px" }} />
                              <span>Source</span>
                            </a>
                          )}
                        </div>
                      </div>

                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
}
