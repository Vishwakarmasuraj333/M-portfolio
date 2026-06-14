"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Twinkling stars configuration around the planet
const stars = [
  { id: 1, top: "8%", left: "12%", size: "4px", delay: "0.2s", duration: "2.5s" },
  { id: 2, top: "14%", left: "85%", size: "3px", delay: "0.8s", duration: "3.2s" },
  { id: 3, top: "45%", left: "5%", size: "5px", delay: "1.5s", duration: "2s" },
  { id: 4, top: "82%", left: "18%", size: "3px", delay: "0.4s", duration: "3.8s" },
  { id: 5, top: "78%", left: "88%", size: "4px", delay: "2.1s", duration: "4s" },
  { id: 6, top: "25%", left: "28%", size: "3px", delay: "1.2s", duration: "3s" },
  { id: 7, top: "68%", left: "76%", size: "4px", delay: "0.6s", duration: "2.8s" },
  { id: 8, top: "4%", left: "50%", size: "5px", delay: "1.9s", duration: "3.5s" },
  { id: 9, top: "92%", left: "62%", size: "3px", delay: "1.1s", duration: "3.4s" },
  { id: 10, top: "35%", left: "94%", size: "2px", delay: "2.5s", duration: "4.2s" },
  { id: 11, top: "58%", left: "92%", size: "4px", delay: "0.3s", duration: "2.7s" },
  { id: 12, top: "88%", left: "42%", size: "3px", delay: "1.7s", duration: "3.6s" },
  { id: 13, top: "20%", left: "72%", size: "4px", delay: "0.9s", duration: "3.1s" },
  { id: 14, top: "38%", left: "20%", size: "3px", delay: "2.2s", duration: "4s" },
  { id: 15, top: "72%", left: "10%", size: "4px", delay: "0.5s", duration: "2.9s" },
];

export default function HeroRightVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.4 }}
      className="relative w-[290px] h-[290px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] lg:w-[450px] lg:h-[450px] flex items-center justify-center"
    >
      {/* 1. Twinkling Stars / Particles */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle shadow-[0_0_8px_#ff80df]"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}

      {/* 2. Orbit Rings (Concentric paths scaled to match the orbit radii) */}
      {/* Ring 1: Thin Neon Pink (Outer - slow) */}
      <div
        className="absolute rounded-full border border-primary/20 animate-spin-slow pointer-events-none shadow-[0_0_15px_rgba(255,77,184,0.05)]"
        style={{
          width: "calc(var(--orbit-slow-r) * 2)",
          height: "calc(var(--orbit-slow-r) * 2)",
        }}
      />

      {/* Ring 2: Purple (Middle - medium) */}
      <div
        className="absolute rounded-full border border-secondary/15 animate-spin-reverse pointer-events-none shadow-[0_0_12px_rgba(184,77,255,0.04)]"
        style={{
          width: "calc(var(--orbit-med-r) * 2)",
          height: "calc(var(--orbit-med-r) * 2)",
        }}
      />

      {/* Ring 3: Dashed Accent (Inner - fast) */}
      <div
        className="absolute rounded-full border border-dashed border-accent/20 animate-spin-slow pointer-events-none"
        style={{
          width: "calc(var(--orbit-fast-r) * 2)",
          height: "calc(var(--orbit-fast-r) * 2)",
        }}
      />

      {/* 3. Main Planet Layer */}
      <div className="absolute w-[58%] h-[58%] rounded-full bg-gradient-to-tr from-bg-space-deep via-secondary to-primary shadow-[0_0_60px_rgba(255,77,184,0.35),inset_-25px_-25px_60px_rgba(0,0,0,0.85),inset_15px_15px_40px_rgba(255,255,255,0.15)] border border-primary/20 overflow-hidden animate-float">
        {/* Planet lighting overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(184,77,255,0.15),transparent)] opacity-40 animate-pulse" />
        
        {/* Texture lines */}
        <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 100 100">
          <path d="M 0 30 Q 50 60 100 30" fill="none" stroke="url(#planetLineGrad)" strokeWidth="0.8" />
          <path d="M 0 50 Q 50 80 100 50" fill="none" stroke="url(#planetLineGrad)" strokeWidth="0.8" />
          <path d="M 0 70 Q 50 95 100 70" fill="none" stroke="url(#planetLineGrad)" strokeWidth="0.8" />
          <path d="M 20 0 Q 55 50 20 100" fill="none" stroke="url(#planetLineGrad)" strokeWidth="0.5" strokeDasharray="1 2" />
          <path d="M 80 0 Q 45 50 80 100" fill="none" stroke="url(#planetLineGrad)" strokeWidth="0.5" strokeDasharray="1 2" />
          <defs>
            <linearGradient id="planetLineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#b84dff" stopOpacity="0" />
              <stop offset="50%" stopColor="#ff80df" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ff4db8" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Diagonal moving light reflection sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 rounded-full animate-pulse" />
      </div>

      {/* 4. Professional Female Coder Illustration (Centered, floating slightly above) */}
      <div className="absolute z-10 w-[50%] h-[50%] flex items-center justify-center pointer-events-none transform -translate-y-4 sm:-translate-y-6">
        <div className="relative w-full h-full flex items-center justify-center p-3 rounded-full bg-gradient-to-b from-white/10 to-transparent border border-white/15 backdrop-blur-[4px] shadow-[0_12px_36px_rgba(0,0,0,0.5),0_0_20px_rgba(255,77,184,0.15)]">
          <Image
            src="/images/girl-coder.svg"
            alt="Mamta Yadav - Professional Web Developer"
            width={220}
            height={220}
            className="object-contain w-[92%] h-[92%] select-none drop-shadow-[0_0_20px_rgba(255,77,184,0.4)]"
            priority
          />
        </div>
      </div>

      {/* 5. Orbiting Satellites System */}
      {/* Satellite 1: Outer Moon (Slow) */}
      <div className="absolute inset-0 flex items-center justify-center animate-orbit-slow pointer-events-none">
        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-gray-600 via-gray-400 to-accent border border-accent/20 shadow-[0_0_15px_rgba(255,128,223,0.6)]" />
      </div>

      {/* Satellite 2: Middle Moon (Medium) */}
      <div className="absolute inset-0 flex items-center justify-center animate-orbit-medium pointer-events-none">
        <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-secondary via-primary to-accent border border-primary/25 shadow-[0_0_10px_rgba(184,77,255,0.7)]" />
      </div>

      {/* Satellite 3: Inner Moon (Fast) */}
      <div className="absolute inset-0 flex items-center justify-center animate-orbit-fast pointer-events-none">
        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-primary via-accent to-white border border-accent/30 shadow-[0_0_8px_rgba(255,77,184,0.8)]" />
      </div>
    </motion.div>
  );
}
