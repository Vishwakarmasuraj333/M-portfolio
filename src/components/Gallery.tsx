"use client";

import { useEffect, useState } from "react";
import { Eye, X, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  image: string;
  createdAt: string;
}

const categories = ["All", "Designs", "AI Art", "Certifications", "Workspace"];

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch gallery items from API
  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setItems(data);
        }
      })
      .catch((err) => console.error("Error fetching gallery:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredItems = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="gallery" className="relative py-24 px-6 overflow-hidden">
      {/* Background neon blur spot */}
      <div className="absolute right-0 top-1/4 w-80 h-80 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center gap-2 mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-orbitron text-xs text-primary tracking-widest font-semibold"
          >
            11 // VISUAL REGISTRY
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron text-3xl md:text-4xl font-extrabold tracking-wide"
          >
            CREATIVE <span className="text-primary text-glow">GALLERY</span>
          </motion.h2>
          
          <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-secondary mt-1" />
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 mb-16 max-w-2xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`font-space-grotesk text-xs px-4 py-2 rounded-full border transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-primary text-white border-primary shadow-[0_0_15px_#ff4db8]"
                  : "bg-white/5 text-gray-400 border-white/5 hover:border-primary/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-primary animate-spin" />
          </div>
        ) : (
          /* Masonry Grid layout */
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setLightboxItem(item)}
                  className="break-inside-avoid glass-panel rounded-2xl overflow-hidden cursor-pointer border-white/5 hover:border-primary/30 transition-all duration-300 relative group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  
                  {/* Hover visual details wrapper */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                    <span className="self-end bg-primary/95 text-white font-orbitron text-[9px] px-2 py-0.5 rounded border border-primary/20">
                      {item.category}
                    </span>
                    
                    <div>
                      <h3 className="font-orbitron font-bold text-white text-sm sm:text-base leading-tight mb-2">
                        {item.title}
                      </h3>
                      <span className="flex items-center gap-1 text-[10px] font-space-grotesk text-accent font-semibold">
                        <Eye size={12} />
                        VIEW FULLSCREEN
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Fullscreen Lightbox Overlay Modal */}
        <AnimatePresence>
          {lightboxItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            >
              {/* Close buttons */}
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-black/50 text-gray-400 hover:text-white border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>

              <div className="relative max-w-4xl max-h-[80vh] flex items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-bg-space-deep shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lightboxItem.image}
                  alt={lightboxItem.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              </div>

              {/* Title & Metadata row at bottom */}
              <div className="mt-4 text-center flex flex-col items-center gap-1.5 max-w-lg px-6">
                <span className="font-space-grotesk text-xs text-primary font-bold tracking-widest uppercase">
                  {lightboxItem.category}
                </span>
                <h3 className="font-orbitron font-extrabold text-white text-base md:text-lg">
                  {lightboxItem.title}
                </h3>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
