"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Review {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Marcus Aurelius",
    role: "Engineering Director",
    company: "Lumen Tech Group",
    quote: "Working with Mamta was a game-changer for our web design projects. The speed at which she shipped our custom WordPress theme while structuring backend databases was incredible. Our clients love the new design!",
    avatar: "M",
    rating: 5,
  },
  {
    id: 2,
    name: "Sophia Vance",
    role: "Founder & Creative Lead",
    company: "Aetherial Agency",
    quote: "The visual execution Mamta brings to web design is absolutely top-tier. She took our complex ideas and translated them into a cinematic sci-fi space themed portfolio that functions perfectly on mobile devices too.",
    avatar: "S",
    rating: 5,
  },
  {
    id: 3,
    name: "Vikram Malhotra",
    role: "Product Owner",
    company: "CryptoNode Ventures",
    quote: "A rare developer who understands both frontend animations and server/DB scaling. His JWT auth systems and MongoDB Atlas setups are robust, clean, and Vercel-ready. Highly recommended!",
    avatar: "V",
    rating: 5,
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="relative py-24 px-6 overflow-hidden">
      {/* Background neon blur spot */}
      <div className="absolute left-0 top-1/4 w-72 h-72 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center gap-2 mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-orbitron text-xs text-primary tracking-widest font-semibold"
          >
            07 // CLIENT COMMUNICATIONS
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron text-3xl md:text-4xl font-extrabold tracking-wide"
          >
            TESTIMONIALS & <span className="text-primary text-glow">REVIEWS</span>
          </motion.h2>
          
          <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-secondary mt-1" />
        </div>

        {/* Carousel Deck */}
        <div className="relative">
          
          {/* Main Card */}
          <div className="min-h-[250px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full glass-panel p-8 md:p-10 rounded-2xl border-white/5 relative flex flex-col justify-between"
              >
                
                {/* Floating Quotes Background */}
                <div className="absolute top-6 right-8 text-primary/10 select-none">
                  <Quote size={80} />
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: reviews[activeIndex].rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-accent text-accent" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-300 font-inter text-sm sm:text-base md:text-lg italic leading-relaxed mb-8 relative z-10">
                  "{reviews[activeIndex].quote}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-orbitron font-bold text-white shadow shadow-black/25">
                    {reviews[activeIndex].avatar}
                  </div>
                  <div>
                    <h4 className="font-orbitron font-bold text-white text-sm sm:text-base">
                      {reviews[activeIndex].name}
                    </h4>
                    <p className="font-space-grotesk text-xs text-gray-500">
                      {reviews[activeIndex].role} <span className="text-accent">@ {reviews[activeIndex].company}</span>
                    </p>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-white/5 hover:border-primary/20 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              aria-label="Previous Review"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="font-space-grotesk text-xs text-gray-500">
              {activeIndex + 1} / {reviews.length}
            </span>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-white/5 hover:border-primary/20 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              aria-label="Next Review"
            >
              <ChevronRight size={18} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
