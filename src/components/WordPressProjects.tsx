"use client";

import { useEffect, useState } from "react";
import { Globe, Sparkles, FolderCode } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

const defaultWPProjects: Project[] = [
  {
    _id: "wp-p1",
    title: "WordPress Business Website",
    description: "A premium corporate website built for an enterprise consultancy. Features custom Gutenberg layouts, fast performance optimization, contact pipelines, and full responsiveness.",
    category: "WordPress Projects",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://wordpress.org",
    githubUrl: "https://github.com",
    techStack: ["WordPress", "Elementor Pro", "Custom CSS", "MySQL", "Yoast SEO"],
    featured: true,
  },
  {
    _id: "wp-p2",
    title: "Futuristic Blog Website",
    description: "A content-heavy publishing platform utilizing custom WordPress post types, custom taxologies, and dynamic templates, optimized for Core Web Vitals and SEO basics.",
    category: "WordPress Projects",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://wordpress.org",
    githubUrl: "https://github.com",
    techStack: ["WordPress CMS", "PHP", "Bootstrap", "Git", "XAMPP"],
    featured: true,
  },
  {
    _id: "wp-p3",
    title: "Product Gallery Showcase",
    description: "An interactive digital gallery designed for a creative studio. Features advanced filtering, smooth lightbox previews, WooCommerce integrations, and custom template loops.",
    category: "WordPress Projects",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://wordpress.org",
    githubUrl: "https://github.com",
    techStack: ["WordPress CMS", "WooCommerce", "Advanced Custom Fields", "JavaScript"],
    featured: false,
  }
];

export default function WordPressProjects() {
  const [projects, setProjects] = useState<Project[]>(defaultWPProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const wpFiltered = data.filter(p => p.category === "WordPress Projects");
          if (wpFiltered.length > 0) {
            setProjects(wpFiltered);
          }
        }
      })
      .catch((err) => console.error("Error fetching WP projects:", err))
      .finally(() => setLoading(false));
  }, []);

  // 3D Tilt Card physics (disabled on mobile for smooth scrolling)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    const rotateX = -(y / (box.height / 2)) * 12;
    const rotateY = (x / (box.width / 2)) * 12;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80";
  };

  return (
    <section id="wordpress-projects" className="relative py-24 px-6 overflow-hidden bg-[#050816]/20">
      {/* Background neon blur spot */}
      <div className="absolute left-0 top-1/3 w-96 h-96 rounded-full bg-secondary/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center gap-2 mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-orbitron text-xs text-secondary tracking-widest font-semibold"
          >
            06 // CMS ORBITALS
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron text-3xl md:text-4xl font-extrabold tracking-wide"
          >
            WORDPRESS <span className="text-secondary text-glow">PROJECTS</span>
          </motion.h2>
          
          <div className="w-12 h-[2px] bg-gradient-to-r from-secondary to-accent mt-1" />
        </div>

        {/* Projects Grid Display */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[250px]">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-secondary animate-spin" />
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {projects.map((project) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4 }}
                  className="h-full"
                >
                  <div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="card-3d h-full bg-[#120534]/20 border border-secondary/10 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-secondary/35 transition-all duration-300"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    
                    {/* Visual Cover Layer */}
                    <div className="relative aspect-video w-full overflow-hidden bg-bg-space-deep border-b border-white/5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={project.title}
                        onError={handleImageError}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                        loading="lazy"
                      />
                      
                      {project.featured && (
                        <span className="absolute top-3 right-3 flex items-center gap-1 bg-secondary/90 text-white font-orbitron text-[9px] tracking-wider font-semibold px-2 py-0.5 rounded shadow border border-secondary/20">
                          <Sparkles size={8} />
                          FEATURED
                        </span>
                      )}
                      
                      <span className="absolute bottom-3 left-3 bg-[#050816]/90 border border-white/10 text-accent font-space-grotesk text-[9px] px-2 py-0.5 rounded">
                        WordPress
                      </span>
                    </div>

                    {/* Meta/Text Layer */}
                    <div className="p-6 flex flex-col justify-between flex-grow" style={{ transform: "translateZ(20px)" }}>
                      <div>
                        <h3 className="font-orbitron font-bold text-white text-base sm:text-lg mb-2 group-hover:text-secondary transition-colors">
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
                              className="font-space-grotesk text-[9px] bg-white/5 px-2 py-0.5 rounded text-gray-400 border border-white/5"
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
                              className="flex items-center gap-1.5 font-space-grotesk text-xs text-secondary hover:text-white transition-colors font-medium"
                            >
                              <Globe size={13} />
                              <span>Live Site</span>
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
