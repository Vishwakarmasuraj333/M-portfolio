"use client";

import { useEffect, useState } from "react";
import { Globe, Sparkles, Server } from "lucide-react";
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

const defaultPHPProjects: Project[] = [
  {
    _id: "php-p1",
    title: "PHP MySQL Login System",
    description: "A secure authentication module featuring user registration, salted password hashing, login verification, session validation, and account settings panels.",
    category: "PHP MySQL Projects",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    techStack: ["PHP", "MySQL", "HTML/CSS", "JavaScript", "XAMPP"],
    featured: true,
  },
  {
    _id: "php-p2",
    title: "Contact Form with Database",
    description: "A fully validated client submission form that sanitizes input parameters and records structured query entries inside relational MySQL tables.",
    category: "PHP MySQL Projects",
    image: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    techStack: ["PHP Backend", "MySQL", "Bootstrap", "AJAX", "Git"],
    featured: true,
  },
  {
    _id: "php-p3",
    title: "Admin Dashboard UI Portal",
    description: "A secure content hub to filter database records, read message tables, analyze traffic counts, and authorize system status parameters.",
    category: "PHP MySQL Projects",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    techStack: ["PHP MVC", "MySQL Database", "Bootstrap", "ChartJS", "XAMPP"],
    featured: false,
  }
];

export default function PhpMySqlProjects() {
  const [projects, setProjects] = useState<Project[]>(defaultPHPProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const phpFiltered = data.filter(p => p.category === "PHP MySQL Projects");
          if (phpFiltered.length > 0) {
            setProjects(phpFiltered);
          }
        }
      })
      .catch((err) => console.error("Error fetching PHP projects:", err))
      .finally(() => setLoading(false));
  }, []);

  // 3D Tilt Card physics
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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

  return (
    <section id="php-mysql-projects" className="relative py-24 px-6 overflow-hidden">
      {/* Background neon blur spot */}
      <div className="absolute right-0 top-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center gap-2 mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-orbitron text-xs text-primary tracking-widest font-semibold"
          >
            07 // DATABASE LOGISTICS
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron text-3xl md:text-4xl font-extrabold tracking-wide"
          >
            PHP & MYSQL <span className="text-primary text-glow">APPLICATIONS</span>
          </motion.h2>
          
          <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-secondary mt-1" />
        </div>

        {/* Projects Grid Display */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[250px]">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-primary animate-spin" />
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
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="h-full"
                >
                  <div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="card-3d h-full bg-[#0b1020]/45 border border-primary/10 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-primary/30 transition-all duration-300"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    
                    {/* Visual Cover Layer */}
                    <div className="relative aspect-video w-full overflow-hidden bg-bg-space-deep border-b border-white/5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                        loading="lazy"
                      />
                      
                      {project.featured && (
                        <span className="absolute top-3 right-3 flex items-center gap-1 bg-primary/90 text-white font-orbitron text-[9px] tracking-wider font-semibold px-2 py-0.5 rounded shadow border border-primary/20">
                          <Sparkles size={8} />
                          FEATURED
                        </span>
                      )}
                      
                      <span className="absolute bottom-3 left-3 bg-[#050816]/90 border border-white/10 text-accent font-space-grotesk text-[9px] px-2 py-0.5 rounded">
                        PHP + MySQL
                      </span>
                    </div>

                    {/* Meta/Text Layer */}
                    <div className="p-6 flex flex-col justify-between flex-grow" style={{ transform: "translateZ(20px)" }}>
                      <div>
                        <h3 className="font-orbitron font-bold text-white text-base sm:text-lg mb-2 group-hover:text-primary transition-colors">
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
                              className="flex items-center gap-1.5 font-space-grotesk text-xs text-primary hover:text-white transition-colors font-medium"
                            >
                              <Server size={13} />
                              <span>Source Code</span>
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
