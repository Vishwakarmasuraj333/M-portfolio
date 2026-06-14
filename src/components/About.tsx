"use client";

import { motion } from "framer-motion";
import { User, ShieldAlert, Cpu, Sparkles } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6 overflow-hidden">
      {/* Background neon blur spot */}
      <div className="absolute right-0 top-1/4 w-72 h-72 rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center gap-2 mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-orbitron text-xs text-primary tracking-widest font-semibold"
          >
            01 // COGNITIVE CORE
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron text-3xl md:text-4xl font-extrabold tracking-wide"
          >
            ABOUT <span className="text-primary text-glow">ME</span>
          </motion.h2>
          
          <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-secondary mt-1" />
        </div>

        {/* Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Futuristic Girl Developer SVG Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-[300px] h-[340px] md:w-[350px] md:h-[400px] rounded-2xl glass-panel-neon p-6 group flex items-center justify-center overflow-hidden"
            >
              {/* Outer cyber borders */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-primary rounded-tl" />
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-primary rounded-tr" />
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-primary rounded-bl" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-primary rounded-br" />

              {/* Glowing Background Radial */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,77,184,0.15)_0%,transparent_70%)] pointer-events-none" />

              {/* Custom Cyberpunk Girl Developer SVG */}
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 200 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10 drop-shadow-[0_0_20px_rgba(255,77,184,0.25)]"
              >
                <defs>
                  <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff4db8" />
                    <stop offset="100%" stopColor="#b84dff" />
                  </linearGradient>
                  <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffd2f0" />
                    <stop offset="100%" stopColor="#ffa6df" />
                  </linearGradient>
                  <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#120534" />
                    <stop offset="100%" stopColor="#050816" />
                  </linearGradient>
                  <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff4db8" />
                    <stop offset="50%" stopColor="#b84dff" />
                    <stop offset="100%" stopColor="#00ffff" />
                  </linearGradient>
                </defs>

                {/* Glowing Background Circles / Orbits */}
                <circle cx="100" cy="110" r="85" stroke="url(#neonGlow)" strokeWidth="0.5" strokeDasharray="4 8" className="animate-[spin_40s_linear_infinite]" />
                <circle cx="100" cy="110" r="70" stroke="#b84dff" strokeWidth="0.5" strokeOpacity="0.3" />

                {/* Code Window / Hologram (Floating on Left) */}
                <motion.g
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <rect x="15" y="45" width="45" height="30" rx="3" fill="rgba(11, 16, 32, 0.6)" stroke="#ff4db8" strokeWidth="1" />
                  <circle cx="21" cy="51" r="1.5" fill="#ff4db8" />
                  <circle cx="26" cy="51" r="1.5" fill="#b84dff" />
                  <circle cx="31" cy="51" r="1.5" fill="#00ffff" />
                  {/* Code Line Simulators */}
                  <line x1="20" y1="58" x2="40" y2="58" stroke="#ff80df" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="20" y1="64" x2="52" y2="64" stroke="#b84dff" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="20" y1="70" x2="33" y2="70" stroke="#00ffff" strokeWidth="1.5" strokeLinecap="round" />
                </motion.g>

                {/* Database Stack / Server (Floating on Right) */}
                <motion.g
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <rect x="145" y="115" width="38" height="32" rx="3" fill="rgba(11, 16, 32, 0.6)" stroke="#b84dff" strokeWidth="1" />
                  {/* Cylinders */}
                  <rect x="149" y="120" width="30" height="6" rx="1.5" fill="#050816" stroke="#00ffff" strokeWidth="0.7" />
                  <rect x="149" y="128" width="30" height="6" rx="1.5" fill="#050816" stroke="#ff4db8" strokeWidth="0.7" />
                  <rect x="149" y="136" width="30" height="6" rx="1.5" fill="#050816" stroke="#b84dff" strokeWidth="0.7" />
                  <circle cx="173" cy="123" r="1" fill="#00ffff" />
                  <circle cx="173" cy="131" r="1" fill="#ff4db8" />
                  <circle cx="173" cy="139" r="1" fill="#b84dff" />
                </motion.g>

                {/* Girl Developer Silhouette / Details */}
                {/* 1. Body & Clothes */}
                <path d="M60 200 C60 170, 75 160, 100 160 C125 160, 140 170, 140 200 Z" fill="#1b1238" stroke="#b84dff" strokeWidth="1" />
                <path d="M85 160 L115 160 L110 180 L90 180 Z" fill="url(#skinGrad)" /> {/* Neck */}
                
                {/* Collar/Shirt details */}
                <path d="M88 175 L100 190 L112 175" stroke="#ff4db8" strokeWidth="1.5" fill="none" />

                {/* 2. Head / Face */}
                <ellipse cx="100" cy="125" rx="22" ry="24" fill="url(#skinGrad)" stroke="#b84dff" strokeWidth="0.5" />

                {/* Eyes & Specs (Futuristic Cyber-Glasses) */}
                <path d="M86 123 Q100 128 114 123" stroke="#00ffff" strokeWidth="2.5" fill="none" strokeLinecap="round" className="glow-purple" />
                <rect x="83" y="118" width="14" height="9" rx="2" stroke="#00ffff" strokeWidth="1" fill="none" />
                <rect x="103" y="118" width="14" height="9" rx="2" stroke="#00ffff" strokeWidth="1" fill="none" />
                <line x1="97" y1="122" x2="103" y2="122" stroke="#00ffff" strokeWidth="1" />

                {/* Glowing cyber headset / neural node */}
                <circle cx="78" cy="125" r="4" fill="#ff4db8" />
                <path d="M78 125 A 22 24 0 0 1 100 101" fill="none" stroke="#ff4db8" strokeWidth="1.5" />

                {/* 3. Hair (Feminine ponytail & bangs) */}
                {/* Ponytail behind */}
                <path d="M120 120 C145 110, 150 145, 140 160 C130 170, 118 150, 122 135" fill="url(#hairGrad)" />
                {/* Hair Outline/Bangs */}
                <path d="M76 125 C75 100, 85 96, 100 96 C115 96, 125 100, 124 125 C124 105, 115 105, 100 108 C85 105, 76 105, 76 125 Z" fill="url(#hairGrad)" />
                <path d="M78 110 L74 135" stroke="url(#hairGrad)" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M122 110 L126 135" stroke="url(#hairGrad)" strokeWidth="2.5" strokeLinecap="round" />

                {/* Floating Laptop / Desk Area at Bottom */}
                <motion.g
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path d="M50 200 L150 200 L160 215 L40 215 Z" fill="url(#screenGrad)" stroke="#ff4db8" strokeWidth="1" />
                  <rect x="70" y="203" width="60" height="4" rx="1" fill="#ff80df" />
                  {/* Glowing Screen Reflected Light */}
                  <polygon points="65,200 135,200 120,185 80,185" fill="rgba(255, 77, 184, 0.15)" />
                </motion.g>

                {/* Floating WordPress & PHP Micro Icons */}
                <motion.g animate={{ y: [0, -5, 0], x: [0, 5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                  {/* WordPress Simolo W */}
                  <circle cx="50" cy="115" r="8" fill="#0073aa" stroke="#fff" strokeWidth="0.5" />
                  <path d="M47 119 L49 112 L50 116 L51 112 L53 119" stroke="#fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </motion.g>
                <motion.g animate={{ y: [0, 5, 0], x: [0, -5, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
                  {/* PHP Symbol */}
                  <ellipse cx="140" cy="65" rx="10" ry="7" fill="#777bb4" stroke="#fff" strokeWidth="0.5" />
                  <text x="133" y="68" fill="#fff" fontSize="8" fontFamily="monospace" fontWeight="bold">php</text>
                </motion.g>

                {/* Shooting Star Sparks */}
                <line x1="30" y1="160" x2="35" y2="160" stroke="#00ffff" strokeWidth="1.5" strokeLinecap="round" className="animate-pulse" />
                <line x1="165" y1="80" x2="170" y2="80" stroke="#ff4db8" strokeWidth="1.5" strokeLinecap="round" className="animate-pulse" />
              </svg>

              {/* Holographic Scan Line */}
              <div className="absolute left-0 right-0 h-[2px] bg-primary/20 shadow-[0_0_10px_#ff4db8] animate-[bounce_6s_infinite] pointer-events-none" />
            </motion.div>
          </div>

          {/* Right: Text and Narrative */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-gray-300 font-inter">
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2"
            >
              <Sparkles size={20} className="text-accent" />
              Mamta Yadav // Web Developer
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm md:text-base leading-relaxed"
            >
              Mamta Yadav is a passionate Web Developer who creates clean, responsive and professional websites. She specializes in WordPress development, PHP backend logic, MySQL database integration and modern frontend design using HTML, CSS, JavaScript and Bootstrap.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm md:text-base leading-relaxed"
            >
              By combining custom WordPress themes and plugins with robust PHP scripting and relational databases, she creates online solutions that are fast, secure, search-engine optimized, and easy to maintain.
            </motion.p>

            {/* Quick stats items */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {[
                { label: "EXPERIENCE", val: "3+ Yrs" },
                { label: "WP PROJECTS", val: "25+ Sites" },
                { label: "PHP WEB APPS", val: "10+ Apps" },
                { label: "SATISFACTION", val: "100%" },
              ].map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center text-center border-white/5 hover:border-primary/20 transition-colors"
                >
                  <span className="font-orbitron font-extrabold text-lg md:text-xl text-primary">{item.val}</span>
                  <span className="font-space-grotesk text-[9px] text-gray-500 tracking-wider mt-1">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
