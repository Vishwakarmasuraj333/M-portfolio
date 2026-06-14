"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, CheckCircle } from "lucide-react";

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verifyUrl: string;
  badge: string;
}

const certificateList: Certificate[] = [
  {
    title: "WordPress Certified Developer",
    issuer: "Global CMS Alliance",
    date: "Aug 2025",
    credentialId: "WPC-DEV-7712",
    verifyUrl: "https://wordpress.org",
    badge: "📝",
  },
  {
    title: "PHP & MySQL Web Developer Certificate",
    issuer: "Tech Horizons Institute",
    date: "Jun 2025",
    credentialId: "PHP-MSQ-0814",
    verifyUrl: "https://github.com",
    badge: "🐘",
  },
  {
    title: "Modern Responsive Web Design",
    issuer: "freeCodeCamp Academy",
    date: "Mar 2025",
    credentialId: "FCC-RWD-3184",
    verifyUrl: "https://freecodecamp.org",
    badge: "📱",
  },
  {
    title: "Advanced CSS & Bootstrap Specialist",
    issuer: "W3Schools Systems",
    date: "Jan 2025",
    credentialId: "W3S-BST-4467",
    verifyUrl: "https://w3schools.com",
    badge: "💜",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-24 px-6 overflow-hidden">
      {/* Background neon blur spot */}
      <div className="absolute right-0 top-1/4 w-72 h-72 rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center gap-2 mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-orbitron text-xs text-secondary tracking-widest font-semibold"
          >
            06 // CREDENTIAL REGISTRY
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron text-3xl md:text-4xl font-extrabold tracking-wide"
          >
            CERTIFICATIONS & <span className="text-secondary text-glow">BADGES</span>
          </motion.h2>
          
          <div className="w-12 h-[2px] bg-gradient-to-r from-secondary to-accent mt-1" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificateList.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="glass-panel p-6 rounded-2xl border-white/5 hover:border-secondary/20 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Corner accent glow indicator */}
              <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-secondary/10 group-hover:bg-secondary/20 transition-colors" />

              <div>
                {/* Badge Visual Symbol */}
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center font-orbitron text-lg text-secondary mb-6 shadow shadow-black/10">
                  {cert.badge}
                </div>

                <h3 className="font-orbitron font-bold text-white text-sm md:text-base leading-tight mb-2 group-hover:text-secondary transition-colors">
                  {cert.title}
                </h3>
                
                <p className="font-space-grotesk text-xs text-accent">{cert.issuer}</p>
                <p className="text-gray-500 text-[10px] font-space-grotesk tracking-wide mt-1">ISSUED // {cert.date}</p>
              </div>

              {/* ID + Link verification bottom */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-gray-500 font-mono text-[9px]">ID: {cert.credentialId}</span>
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-space-grotesk text-[10px] text-secondary hover:text-white transition-colors"
                >
                  <ShieldCheck size={12} />
                  <span>VERIFY</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
