"use client";

import { motion } from "framer-motion";
import { Code2, Terminal, Database, Cloud } from "lucide-react";

interface Skill {
  name: string;
  level: number; // percentage
  icon: string;
}

interface SkillCategory {
  title: string;
  icon: any;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Core Frontend",
    icon: Code2,
    skills: [
      { name: "HTML5", level: 95, icon: "📄" },
      { name: "CSS3", level: 90, icon: "🎨" },
      { name: "JavaScript (ES6+)", level: 88, icon: "💛" },
      { name: "Bootstrap", level: 92, icon: "💜" },
    ],
  },
  {
    title: "Backend & Databases",
    icon: Terminal,
    skills: [
      { name: "PHP Development", level: 85, icon: "🐘" },
      { name: "MySQL / SQL", level: 88, icon: "🐬" },
      { name: "XAMPP / Local Server", level: 90, icon: "💻" },
    ],
  },
  {
    title: "CMS & Ecosystem",
    icon: Database,
    skills: [
      { name: "WordPress / Plugins", level: 92, icon: "📝" },
      { name: "Git / Version Control", level: 85, icon: "🐙" },
    ],
  },
  {
    title: "Design & Optimization",
    icon: Cloud,
    skills: [
      { name: "Responsive Design", level: 95, icon: "📱" },
      { name: "SEO Basics", level: 82, icon: "🔍" },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 px-6 overflow-hidden bg-[#050816]/30">
      {/* Background neon blur spot */}
      <div className="absolute left-0 top-1/4 w-80 h-80 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center gap-2 mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-orbitron text-xs text-secondary tracking-widest font-semibold"
          >
            02 // TECHNICAL MATRIX
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron text-3xl md:text-4xl font-extrabold tracking-wide"
          >
            SKILLS & <span className="text-secondary text-glow">CAPABILITIES</span>
          </motion.h2>
          
          <div className="w-12 h-[2px] bg-gradient-to-r from-secondary to-accent mt-1" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIdx) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                className="glass-panel p-6 rounded-2xl border-white/5 hover:border-secondary/20 transition-all duration-300 relative group"
              >
                <div className="absolute top-4 right-4 text-secondary/30 group-hover:text-secondary/60 transition-colors">
                  <IconComponent size={24} />
                </div>

                <h3 className="font-orbitron font-bold text-gray-200 text-lg mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  {category.title}
                </h3>

                {/* Progress bars list */}
                <div className="flex flex-col gap-4">
                  {category.skills.map((skill, skillIdx) => (
                    <div key={skill.name} className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center text-xs sm:text-sm">
                        <span className="font-space-grotesk text-gray-300 flex items-center gap-2">
                          <span className="text-xs">{skill.icon}</span>
                          {skill.name}
                        </span>
                        <span className="font-orbitron text-gray-400 font-semibold">{skill.level}%</span>
                      </div>
                      
                      {/* Bar Track */}
                      <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: skillIdx * 0.05, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-secondary to-primary rounded-full shadow-[0_0_10px_#b84dff]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
