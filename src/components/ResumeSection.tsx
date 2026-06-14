"use client";

import { motion } from "framer-motion";
import { Download, Terminal, User, FileText, CheckCircle2 } from "lucide-react";

export default function ResumeSection() {
  const handleDownload = () => {
    // Generate a simple print layout of the resume page, or link to a mock file
    window.print();
  };

  return (
    <section id="resume" className="relative py-24 px-6 overflow-hidden">
      {/* Background neon blur spot */}
      <div className="absolute right-0 top-1/4 w-80 h-80 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center gap-2 mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-orbitron text-xs text-primary tracking-widest font-semibold"
          >
            13 // CONSOLE OUTPUTS
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron text-3xl md:text-4xl font-extrabold tracking-wide"
          >
            MY <span className="text-primary text-glow">RESUME</span>
          </motion.h2>
          
          <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-secondary mt-1" />
        </div>

        {/* Outer Layout wrapper */}
        <div className="max-w-4xl mx-auto">
          
          {/* Futuristic Terminal Glass preview card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel-purple rounded-2xl border-white/5 overflow-hidden shadow-2xl relative"
          >
            {/* Top terminal headers */}
            <div className="bg-[#050816] px-6 py-3 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-secondary" />
                <span className="font-mono text-xs text-gray-400">MAM_YADAV_CV.md [READ-ONLY]</span>
              </div>
              
              {/* Terminal red-yellow-green controls */}
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
            </div>

            {/* Inside Paper-like contents */}
            <div className="p-6 sm:p-10 text-gray-300 font-inter space-y-8 select-text">
              
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 pb-6 border-b border-white/5">
                <div>
                  <h3 className="font-orbitron font-extrabold text-white text-xl sm:text-2xl">MAMTA YADAV</h3>
                  <p className="font-space-grotesk text-sm text-secondary tracking-wide mt-1">Web Developer & WordPress Specialist</p>
                </div>
                
                <div className="text-xs font-mono text-gray-500 flex flex-col gap-0.5 sm:text-right">
                  <span>MUMBAI, MH, INDIA</span>
                  <span>+91 98765 43210</span>
                  <span>MAMTA.Y@DEVSYSTEMS.IO</span>
                </div>
              </div>

              {/* Work summary */}
              <div>
                <h4 className="font-orbitron font-bold text-white text-sm uppercase tracking-wide border-l-2 border-primary pl-3 mb-4">
                  PROFESSIONAL SUMMARY
                </h4>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  Innovative Web Developer with 3+ years of experience designing high-performance sites. Expert in custom WordPress theme configuration, relational MySQL database integration, and dynamic PHP scripting. Committed to building beautiful digital experiences that are fully responsive and SEO optimized.
                </p>
              </div>

              {/* Skills checklist grid */}
              <div>
                <h4 className="font-orbitron font-bold text-white text-sm uppercase tracking-wide border-l-2 border-primary pl-3 mb-4">
                  CORE TECHNICAL PROFICIENCIES
                </h4>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                  {[
                    "WordPress CMS & Elementor Pro",
                    "PHP Scripting / Backend Logic",
                    "MySQL Database Management",
                    "HTML5 / CSS3 / ES6 JavaScript",
                    "Bootstrap Framework grids",
                    "Responsive Mobile Design",
                    "Local Testing via XAMPP",
                    "Git Version Repository Control",
                    "Basic Search Engine Optimization",
                  ].map((skill) => (
                    <div key={skill} className="flex items-center gap-2 text-gray-400">
                      <CheckCircle2 size={13} className="text-secondary shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education section */}
              <div>
                <h4 className="font-orbitron font-bold text-white text-sm uppercase tracking-wide border-l-2 border-primary pl-3 mb-4">
                  ACADEMIC PREPARATION
                </h4>
                
                <div className="text-xs sm:text-sm">
                  <h5 className="font-bold text-white">Bachelor of Computer Applications (BCA)</h5>
                  <p className="text-gray-500 font-space-grotesk mt-0.5">STATE UNIVERSITY // 2020 - 2024</p>
                </div>
              </div>

            </div>

            {/* Bottom download CTA bar */}
            <div className="bg-[#050816] p-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                <FileText size={14} className="text-primary animate-pulse" />
                <span>Format: PDF / Size: 1.2 MB / Updated: June 2026</span>
              </div>
              
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 font-space-grotesk text-xs bg-gradient-to-r from-primary to-secondary hover:opacity-90 px-6 py-2.5 rounded text-white font-bold tracking-wider shadow-[0_0_10px_rgba(255,77,184,0.3)] transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <Download size={14} />
                <span>DOWNLOAD / PRINT CV</span>
              </button>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
