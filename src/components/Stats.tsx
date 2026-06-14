"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  glow: string;
}

const stats: StatItem[] = [
  { label: "LINES OF CODE", value: 180, suffix: "K+", glow: "shadow-[0_0_20px_rgba(255,77,184,0.2)] text-primary" },
  { label: "COFFEE CONSUMED", value: 650, suffix: "Ltr", glow: "shadow-[0_0_20px_rgba(184,77,255,0.2)] text-secondary" },
  { label: "COMMITS PUSHED", value: 2400, suffix: "+", glow: "shadow-[0_0_20px_rgba(255,128,223,0.2)] text-accent" },
  { label: "SERVERS ONLINE", value: 8, suffix: " units", glow: "shadow-[0_0_20px_rgba(0,255,255,0.2)] text-cyan-400" },
];

export default function Stats() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));

  useEffect(() => {
    if (!isInView) return;

    const durations = stats.map(() => Math.floor(Math.random() * 1000) + 1000); // Between 1s and 2s
    const steps = 40; // Number of update cycles

    const intervals = stats.map((stat, idx) => {
      const stepValue = stat.value / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        setCounts((prev) => {
          const next = [...prev];
          next[idx] = Math.min(stat.value, Math.round(stepValue * currentStep));
          return next;
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, durations[idx] / steps);

      return timer;
    });

    return () => intervals.forEach((int) => clearInterval(int));
  }, [isInView]);

  return (
    <section ref={containerRef} className="relative py-20 px-6 overflow-hidden bg-[#050816]/50">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="glass-panel p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center text-center border-white/5 relative group hover:-translate-y-1 hover:border-white/10 transition-all duration-300"
            >
              {/* Outer decorative line glow */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${stat.glow}`} />

              <span className="font-orbitron font-black text-3xl sm:text-4xl md:text-5xl tracking-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent flex items-baseline">
                {counts[idx]}
                <span className="text-sm font-space-grotesk text-accent ml-1 uppercase">{stat.suffix}</span>
              </span>

              <span className="font-space-grotesk text-[10px] sm:text-xs text-gray-500 tracking-wider mt-3 font-semibold uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
