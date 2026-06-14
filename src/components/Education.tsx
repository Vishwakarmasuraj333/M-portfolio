"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Milestone } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  detail: string;
  type: "academic" | "milestone";
}

const timelineItems: TimelineItem[] = [
  {
    year: "2020 - 2024",
    title: "Bachelor of Computer Applications (BCA)",
    subtitle: "State University",
    detail: "Focused on Database Management, Web Technologies, and Software Application Design. Graduated with First Class.",
    type: "academic",
  },
  {
    year: "2023",
    title: "WordPress Blog & Portal Launched",
    subtitle: "Community Portal",
    detail: "Developed and launched an interactive blog website with customized templates and search visibility.",
    type: "milestone",
  },
  {
    year: "2022",
    title: "PHP & Web Development Diploma",
    subtitle: "Tech Horizons Institute",
    detail: "Completed an intensive program focusing on dynamic database systems, SQL query scripting, and client-side styling.",
    type: "academic",
  },
  {
    year: "2021",
    title: "First Freelance WordPress Site Delivered",
    subtitle: "Freelance Contract",
    detail: "Successfully designed and deployed a responsive business website using custom themes and plug-ins.",
    type: "milestone",
  },
];

export default function Education() {
  return (
    <section id="education" className="relative py-24 px-6 overflow-hidden bg-[#050816]/30">
      {/* Background neon blur spot */}
      <div className="absolute right-0 top-1/4 w-80 h-80 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center gap-2 mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-orbitron text-xs text-accent tracking-widest font-semibold"
          >
            08 // JOURNEY PATHWAY
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron text-3xl md:text-4xl font-extrabold tracking-wide"
          >
            EDUCATION & <span className="text-accent text-glow">JOURNEY</span>
          </motion.h2>
          
          <div className="w-12 h-[2px] bg-gradient-to-r from-accent to-primary mt-1" />
        </div>

        {/* Double Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          
          {/* Academic Journey */}
          <div>
            <h3 className="font-orbitron font-bold text-white text-lg mb-8 flex items-center gap-2">
              <GraduationCap className="text-primary" size={20} />
              Academic History
            </h3>
            
            <div className="flex flex-col gap-6 border-l border-white/5 pl-6 relative">
              {timelineItems
                .filter((item) => item.type === "academic")
                .map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative"
                  >
                    {/* Ring Bullet */}
                    <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-bg-space-dark border border-primary" />
                    
                    <span className="font-space-grotesk text-xs text-primary font-bold">{item.year}</span>
                    <h4 className="font-orbitron font-bold text-white text-base mt-1">{item.title}</h4>
                    <p className="font-space-grotesk text-xs text-gray-500">{item.subtitle}</p>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-inter mt-2">{item.detail}</p>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Development Milestones */}
          <div>
            <h3 className="font-orbitron font-bold text-white text-lg mb-8 flex items-center gap-2">
              <Milestone className="text-secondary" size={20} />
              Career Milestones
            </h3>
            
            <div className="flex flex-col gap-6 border-l border-white/5 pl-6 relative">
              {timelineItems
                .filter((item) => item.type === "milestone")
                .map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative"
                  >
                    {/* Ring Bullet */}
                    <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-bg-space-dark border border-secondary" />
                    
                    <span className="font-space-grotesk text-xs text-secondary font-bold">{item.year}</span>
                    <h4 className="font-orbitron font-bold text-white text-base mt-1">{item.title}</h4>
                    <p className="font-space-grotesk text-xs text-gray-500">{item.subtitle}</p>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-inter mt-2">{item.detail}</p>
                  </motion.div>
                ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
