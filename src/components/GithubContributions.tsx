"use client";

import { motion } from "framer-motion";
import { GitBranch, GitCommit, GitPullRequest } from "lucide-react";

// Generate a random year-long calendar contribution grid (53 weeks * 7 days)
const generateMockGrid = () => {
  const grid = [];
  for (let w = 0; w < 40; w++) {
    // Show 40 weeks to keep it readable on standard screens
    const week = [];
    for (let d = 0; d < 7; d++) {
      // Probability-based contribution weight
      const rand = Math.random();
      let level = 0;
      if (rand > 0.85) level = 4;
      else if (rand > 0.7) level = 3;
      else if (rand > 0.5) level = 2;
      else if (rand > 0.25) level = 1;
      week.push(level);
    }
    grid.push(week);
  }
  return grid;
};

const contributionColors = [
  "bg-white/5", // 0 contributions
  "bg-emerald-950", // 1
  "bg-emerald-700", // 2
  "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]", // 3
  "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]", // 4
];

export default function GithubContributions() {
  const grid = generateMockGrid();

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-[#050816]/30">
      {/* Background neon blur spot */}
      <div className="absolute left-0 bottom-1/4 w-80 h-80 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center gap-2 mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-orbitron text-xs text-emerald-400 tracking-widest font-semibold"
          >
            09 // OPEN SOURCE METRICS
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron text-3xl md:text-4xl font-extrabold tracking-wide"
          >
            GITHUB <span className="text-emerald-400 text-glow">CONTRIBUTIONS</span>
          </motion.h2>
          
          <div className="w-12 h-[2px] bg-gradient-to-r from-emerald-500 to-cyan-500 mt-1" />
        </div>

        {/* Outer Glass Panel Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-6 sm:p-8 rounded-2xl border-white/5 max-w-4xl mx-auto"
        >
          {/* Header Stats bar */}
          <div className="grid grid-cols-3 gap-4 border-b border-white/5 pb-6 mb-6">
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
              <span className="flex items-center gap-1.5 text-xs text-gray-500 font-space-grotesk uppercase">
                <GitCommit size={14} className="text-emerald-400" />
                Yearly Commits
              </span>
              <span className="font-orbitron font-extrabold text-white text-lg sm:text-xl">1,840 commits</span>
            </div>
            
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
              <span className="flex items-center gap-1.5 text-xs text-gray-500 font-space-grotesk uppercase">
                <GitBranch size={14} className="text-emerald-400" />
                Pull Requests
              </span>
              <span className="font-orbitron font-extrabold text-white text-lg sm:text-xl">120 merged</span>
            </div>

            <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
              <span className="flex items-center gap-1.5 text-xs text-gray-500 font-space-grotesk uppercase">
                <GitPullRequest size={14} className="text-emerald-400" />
                Active Repos
              </span>
              <span className="font-orbitron font-extrabold text-white text-lg sm:text-xl">34 projects</span>
            </div>
          </div>

          {/* Grid Panel Scrollable */}
          <div className="overflow-x-auto pb-4">
            <div className="flex flex-col gap-1.5 min-w-[640px]">
              {/* Day rows (7 days) */}
              {Array.from({ length: 7 }).map((_, dIdx) => (
                <div key={dIdx} className="flex gap-1.5 justify-center">
                  {grid.map((week, wIdx) => (
                    <div
                      key={wIdx}
                      className={`w-3.5 h-3.5 rounded-sm transition-colors duration-300 hover:scale-125 ${
                        contributionColors[week[dIdx]]
                      }`}
                      title={`${week[dIdx]} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend bar */}
          <div className="flex justify-end items-center gap-2 mt-4 text-xs font-space-grotesk text-gray-500">
            <span>Less</span>
            <div className="flex gap-1">
              {contributionColors.map((color, idx) => (
                <div key={idx} className={`w-3 h-3 rounded-sm ${color.split(" ")[0]}`} />
              ))}
            </div>
            <span>More</span>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
