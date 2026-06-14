"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import HeroRightVisual from "./HeroRightVisual";

const titles = ["Web Developer", "WordPress Developer", "PHP Developer"];

export default function Hero() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = titles[currentTitleIndex];
    const typingSpeed = isDeleting ? 30 : 80;

    if (!isDeleting && displayedText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 1500); // Wait before deleting
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    } else {
      timer = setTimeout(() => {
        setDisplayedText((prev) =>
          isDeleting ? prev.slice(0, -1) : fullText.slice(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTitleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden"
    >
      {/* Background radial spotlight grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,77,184,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Text and CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-orbitron tracking-widest"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
            SYSTEMS ONLINE
          </motion.div>

          <h1 className="font-orbitron text-4xl sm:text-5xl md:text-6xl font-black leading-none tracking-tight">
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="block text-gray-400 text-lg sm:text-xl font-space-grotesk tracking-widest mb-2"
            >
              HELLO, I'M MAMTA YADAV
            </motion.span>
            
            <motion.span
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent text-glow text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide mt-2"
            >
              Creating Beautiful Digital Experiences
            </motion.span>
          </h1>

          {/* Typewriter text block */}
          <div className="h-8 flex items-center">
            <span className="font-space-grotesk text-xl md:text-2xl text-accent font-semibold tracking-wide">
              {displayedText}
            </span>
            <span className="w-1 h-6 bg-accent ml-1 animate-pulse" />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-gray-400 font-inter text-sm md:text-base max-w-lg leading-relaxed"
          >
            I am a passionate Web Developer skilled in building modern, responsive and user-friendly websites using WordPress, PHP, MySQL, HTML, CSS, JavaScript and Bootstrap.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4 mt-4"
          >
            <Link
              href="#contact"
              className="flex items-center gap-2 font-space-grotesk text-sm tracking-wide bg-gradient-to-r from-primary to-secondary hover:opacity-90 px-6 py-3 rounded-full text-white font-medium shadow-[0_0_15px_rgba(255,77,184,0.4)] transition-all duration-300 hover:scale-105"
            >
              <span>Hire Me</span>
              <ArrowRight size={16} />
            </Link>
            
            <Link
              href="#projects"
              className="flex items-center gap-2 font-space-grotesk text-sm tracking-wide border border-white/10 hover:border-primary/30 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white transition-all duration-300 hover:scale-105"
            >
              View Projects
            </Link>
            
            <a
              href="#contact"
              className="flex items-center gap-2 font-space-grotesk text-sm tracking-wide text-gray-400 hover:text-accent transition-colors duration-300 px-4 py-3"
            >
              <Download size={16} />
              <span>Contact Mamta</span>
            </a>
          </motion.div>
        </div>

        {/* Right Side: Glowing Planet and Orbiting Moon */}
        <div className="lg:col-span-5 flex justify-center items-center relative py-12">
          <HeroRightVisual />
        </div>
      </div>

      {/* Right side scroll indicators */}
      <div className="absolute right-6 bottom-12 hidden md:flex flex-col items-center gap-4 z-10 pointer-events-none">
        <span className="font-orbitron text-[9px] tracking-[0.3em] text-gray-500 uppercase vertical-text origin-bottom">
          SCROLL TO EXPLORE
        </span>
        {/* Animated line gradient from top to bottom with glowing pulse */}
        <div className="w-[1.5px] h-24 rounded-full scroll-line-animated" />
        
        {/* Mouse icon animations */}
        <div className="w-5 h-8 rounded-full border border-primary/40 shadow-[0_0_8px_rgba(255,77,184,0.2)] flex justify-center p-1.5 opacity-80 bg-background/60 backdrop-blur-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-scroll-wheel shadow-[0_0_6px_rgba(255,77,184,0.8)]" />
        </div>
      </div>

    </section>
  );
}
