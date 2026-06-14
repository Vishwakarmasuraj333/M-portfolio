"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "WP Projects", href: "#wordpress-projects" },
  { name: "PHP Projects", href: "#php-mysql-projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Certifications", href: "#certifications" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll height to apply blur backdrop classes
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Track active section on scroll
      const sections = navLinks.map((link) => document.querySelector(link.href));
      const scrollPos = window.scrollY + 200;

      sections.forEach((section) => {
        if (!section) return;
        const top = (section as HTMLElement).offsetTop;
        const height = (section as HTMLElement).offsetHeight;
        const id = section.getAttribute("id") || "";

        if (scrollPos >= top && scrollPos < top + height) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? "py-4 bg-[#050816]/95 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/25"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="#home" className="flex items-center gap-2 group">
          <span className="font-orbitron font-extrabold text-2xl tracking-wider bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent group-hover:opacity-85 transition-opacity">
            MAMTA
          </span>
          <span className="font-space-grotesk text-xs border border-primary/30 px-1.5 py-0.5 rounded text-primary group-hover:bg-primary/10 transition-all duration-300">
            WEB.DEV
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name} className="relative">
                <Link
                  href={link.href}
                  onClick={() => setActiveSection(link.href.substring(1))}
                  className={`font-space-grotesk text-sm tracking-wide transition-colors ${
                    activeSection === link.href.substring(1)
                      ? "text-primary font-medium"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {link.name}
                  {/* Underline for active state */}
                  {activeSection === link.href.substring(1) && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-secondary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Admin and Console Portal CTA */}
          <Link
            href="/admin"
            className="flex items-center gap-1 font-orbitron text-xs tracking-wider text-accent border border-accent/20 px-3 py-1.5 rounded-full hover:bg-accent/10 transition-all duration-300"
          >
            Console
            <ArrowUpRight size={12} />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300 hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sliding Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 right-0 md:hidden bg-[#0b1020]/95 backdrop-blur-lg border-b border-primary/10 overflow-hidden shadow-2xl shadow-black/60"
          >
            <ul className="flex flex-col px-6 py-6 gap-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => {
                      setActiveSection(link.href.substring(1));
                      setIsOpen(false);
                    }}
                    className={`block font-space-grotesk text-base py-1 ${
                      activeSection === link.href.substring(1)
                        ? "text-primary font-semibold"
                        : "text-gray-300"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-white/5">
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between text-accent font-orbitron text-sm"
                >
                  <span>Admin Console</span>
                  <ArrowUpRight size={16} />
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
