"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

interface Job {
  id: number;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
}

const experiences: Job[] = [
  {
    id: 1,
    role: "Lead Web Developer & WordPress Specialist",
    company: "Nexus Digital Systems",
    period: "2024 - Present",
    location: "Mumbai, India (Hybrid)",
    description: [
      "Led development of client business and e-commerce websites utilizing WordPress and PHP backend logic.",
      "Built bespoke responsive WordPress themes from scratch using HTML5, CSS3, JavaScript, and Bootstrap.",
      "Optimized site loading performance, database structures, and implemented basic SEO configurations."
    ]
  },
  {
    id: 2,
    role: "PHP & Backend Developer",
    company: "Synthetix Lab LLC",
    period: "2022 - 2024",
    location: "Remote",
    description: [
      "Developed secure PHP backend portals and integrated MySQL databases with indexes and relational structures.",
      "Engineered user login modules, contact validation pipelines, and administrative search dashboards.",
      "Deployed and maintained sites locally using XAMPP and managed version repositories with Git."
    ]
  },
  {
    id: 3,
    role: "Junior Web Designer & Developer",
    company: "Pixel Perfect Solutions",
    period: "2021 - 2022",
    location: "Pune, India",
    description: [
      "Crafted interactive frontends and landing pages using HTML, CSS, JavaScript, and Bootstrap v4/v5.",
      "Completed standard website maintenance tasks, content updates, and optimized assets for mobile devices.",
      "Ensured all design assets were fully responsive and compliant with cross-browser display constraints."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 px-6 overflow-hidden">
      {/* Background neon blur spot */}
      <div className="absolute right-0 top-1/3 w-80 h-80 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center gap-2 mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-orbitron text-xs text-accent tracking-widest font-semibold"
          >
            03 // CHRONOLOGICAL MATRIX
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron text-3xl md:text-4xl font-extrabold tracking-wide"
          >
            EXPERIENCE <span className="text-accent text-glow">TIMELINE</span>
          </motion.h2>
          
          <div className="w-12 h-[2px] bg-gradient-to-r from-accent to-primary mt-1" />
        </div>

        {/* Timeline Path */}
        <div className="relative max-w-4xl mx-auto flex flex-col items-stretch">
          
          {/* Main glowing line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-accent shadow-[0_0_10px_#ff4db8]" />

          {experiences.map((job, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={job.id}
                className={`flex flex-col md:flex-row items-stretch gap-8 mb-16 relative w-full ${
                  isLeft ? "md:flex-row-reverse" : ""
                }`}
              >
                
                {/* 1. Bullet connector */}
                <div className="absolute left-[9px] md:left-1/2 -translate-x-[7px] md:-translate-x-[9px] top-6 w-4 h-4 rounded-full bg-bg-space-dark border-2 border-secondary flex items-center justify-center z-25">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                </div>

                {/* 2. Timeline Card content */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0">
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="glass-panel p-6 rounded-2xl border-white/5 hover:border-secondary/20 transition-all duration-300 relative"
                  >
                    {/* Header info */}
                    <div className="flex flex-col gap-1 mb-4">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-space-grotesk text-accent">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {job.period}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {job.location}
                        </span>
                      </div>
                      <h3 className="font-orbitron font-extrabold text-white text-lg mt-1">{job.role}</h3>
                      <h4 className="font-space-grotesk font-semibold text-secondary text-sm">{job.company}</h4>
                    </div>

                    {/* Bullet list description */}
                    <ul className="flex flex-col gap-2 list-disc pl-4 text-gray-400 text-xs sm:text-sm leading-relaxed font-inter">
                      {job.description.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* 3. Spacer for desktop view */}
                <div className="hidden md:block w-1/2" />

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
