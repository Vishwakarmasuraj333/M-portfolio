"use client";

import { motion } from "framer-motion";
import { AppWindow, BrainCircuit, Layers, Cog, Search } from "lucide-react";

interface ServiceItem {
  icon: any;
  title: string;
  desc: string;
  color: string;
  tags: string[];
}

const servicesList: ServiceItem[] = [
  {
    icon: AppWindow,
    title: "WordPress Website Development",
    desc: "Building customized WordPress business sites, blogs, and product galleries. Crafting bespoke themes and integrating essential plugins.",
    color: "from-primary to-secondary",
    tags: ["WordPress", "Custom Themes", "WooCommerce", "Plugins"],
  },
  {
    icon: Layers,
    title: "Responsive Website Design",
    desc: "Creating elegant user interfaces that look stunning on desktops, tablets, and mobile screens alike using modern CSS and Bootstrap grid systems.",
    color: "from-secondary to-accent",
    tags: ["HTML5 / CSS3", "Bootstrap", "Responsive Layouts", "Flexbox"],
  },
  {
    icon: BrainCircuit,
    title: "PHP MySQL Web Applications",
    desc: "Developing dynamic web portals, database management panels, and secure login modules backed by robust backend logic and MySQL queries.",
    color: "from-accent to-primary",
    tags: ["PHP Backend", "MySQL Database", "XAMPP Testing", "APIs"],
  },
  {
    icon: AppWindow,
    title: "Landing Page Design",
    desc: "Designing high-converting marketing landing pages with clean animations and crisp visuals to showcase products or gather quality leads.",
    color: "from-primary to-accent",
    tags: ["UI/UX Mockups", "Bootstrap Elements", "Micro-animations"],
  },
  {
    icon: Layers,
    title: "Portfolio Website Development",
    desc: "Building premium interactive web portfolios for professionals and agencies, integrating interactive graphics and smooth transitions.",
    color: "from-secondary to-primary",
    tags: ["Creative Portfolio", "Framer Motion", "Branding", "Interactive"],
  },
  {
    icon: Cog,
    title: "Website Maintenance",
    desc: "Ensuring your website remains online, secure, and fast with regular version updates, backups, security audits, and layout improvements.",
    color: "from-accent to-secondary",
    tags: ["CMS Updates", "Database Backups", "Security Patches"],
  },
  {
    icon: Search,
    title: "Basic SEO Optimization",
    desc: "Structuring headings, meta descriptions, and alt tags correctly to improve indexing and search presence on Google and Bing.",
    color: "from-primary to-secondary",
    tags: ["Meta Tags", "Page Indexing", "Speed Audits", "SEO Basics"],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 px-6 overflow-hidden bg-[#050816]/30">
      {/* Background neon blur spot */}
      <div className="absolute left-0 top-1/3 w-72 h-72 rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center gap-2 mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-orbitron text-xs text-primary tracking-widest font-semibold"
          >
            04 // OPERATIONAL SCOPE
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron text-3xl md:text-4xl font-extrabold tracking-wide"
          >
            MY <span className="text-primary text-glow">SERVICES</span>
          </motion.h2>
          
          <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-secondary mt-1" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {servicesList.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="glass-panel p-6 rounded-2xl border-white/5 hover:border-primary/20 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-2"
              >
                <div>
                  {/* Floating colorful icon bubble */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${service.color} text-white shadow-md shadow-black/25 mb-6 group-hover:scale-110 transition-transform`}>
                    <IconComponent size={22} />
                  </div>

                  <h3 className="font-orbitron font-bold text-white text-base md:text-lg mb-3">{service.title}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-inter mb-6">{service.desc}</p>
                </div>

                {/* Subtech tag elements */}
                <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-white/5">
                  {service.tags.map((tag) => (
                    <span key={tag} className="font-space-grotesk text-[9px] bg-white/5 px-2 py-0.5 rounded text-gray-400">
                      {tag}
                    </span>
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
