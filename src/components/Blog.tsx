"use client";

import { useEffect, useState } from "react";
import { Calendar, Tag, BookOpen, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string;
  tags: string[];
  createdAt: string;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from API
  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBlogs(data);
        }
      })
      .catch((err) => console.error("Error fetching blogs:", err))
      .finally(() => setLoading(false));
  }, []);

  // Prevent scroll when reading modal is open
  useEffect(() => {
    if (selectedBlog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedBlog]);

  return (
    <section id="blog" className="relative py-24 px-6 overflow-hidden bg-[#050816]/30">
      {/* Background neon blur spot */}
      <div className="absolute right-0 bottom-1/4 w-80 h-80 rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center gap-2 mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-orbitron text-xs text-secondary tracking-widest font-semibold"
          >
            10 // COGNITIVE ARCHIVES
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron text-3xl md:text-4xl font-extrabold tracking-wide"
          >
            LATEST <span className="text-secondary text-glow">ARTICLES</span>
          </motion.h2>
          
          <div className="w-12 h-[2px] bg-gradient-to-r from-secondary to-accent mt-1" />
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[250px]">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-secondary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post, idx) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => setSelectedBlog(post)}
                className="glass-panel rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer border-white/5 hover:border-secondary/20 hover:scale-[1.02] transition-all duration-300 relative group"
              >
                {/* Visual Cover image */}
                <div className="aspect-video relative overflow-hidden bg-bg-space-deep border-b border-white/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-space-dark/80 to-transparent pointer-events-none" />
                </div>

                {/* Text Details */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    {/* Timestamp & Tag items */}
                    <div className="flex items-center gap-3 text-[10px] font-space-grotesk text-accent mb-3 uppercase">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      {post.tags.length > 0 && (
                        <span className="flex items-center gap-1">
                          <Tag size={11} />
                          {post.tags[0]}
                        </span>
                      )}
                    </div>

                    <h3 className="font-orbitron font-bold text-white text-base md:text-lg mb-2 group-hover:text-secondary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-inter line-clamp-3 mb-6">
                      {post.summary}
                    </p>
                  </div>

                  {/* Read button link */}
                  <span className="flex items-center gap-1 text-xs font-space-grotesk text-secondary mt-auto pt-4 border-t border-white/5 group-hover:text-white transition-colors">
                    <BookOpen size={13} />
                    <span>READ ARTICLE</span>
                  </span>
                </div>

              </motion.div>
            ))}
          </div>
        )}

        {/* Detailed Lightbox overlay Reader Modal */}
        <AnimatePresence>
          {selectedBlog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-3xl h-[80vh] bg-[#0b1020] border border-secondary/20 rounded-2xl overflow-hidden flex flex-col justify-between relative shadow-2xl"
              >
                
                {/* Close Button top-right */}
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-black/50 text-gray-400 hover:text-white border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                  aria-label="Close reader"
                >
                  <X size={16} />
                </button>

                {/* Inner scrolling body panel */}
                <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-6">
                  
                  {/* Banner Image */}
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/5 bg-bg-space-deep mt-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedBlog.image}
                      alt={selectedBlog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Header Titles */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 text-xs font-space-grotesk text-accent uppercase">
                      <span>
                        {new Date(selectedBlog.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span>•</span>
                      <div className="flex gap-1.5">
                        {selectedBlog.tags.map((tag) => (
                          <span key={tag} className="border border-accent/20 bg-accent/5 px-2 py-0.5 rounded text-[10px]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <h3 className="font-orbitron font-extrabold text-white text-xl sm:text-2xl md:text-3xl leading-tight">
                      {selectedBlog.title}
                    </h3>
                  </div>

                  {/* Rich Summary & Content */}
                  <div className="border-t border-white/5 pt-6 text-gray-300 font-inter text-sm md:text-base leading-relaxed space-y-6">
                    <p className="font-medium text-white/90 border-l-2 border-secondary pl-4 py-1 italic bg-white/5 rounded-r">
                      {selectedBlog.summary}
                    </p>
                    
                    {/* Simplified markdown display rendering headings and paragraphs */}
                    <div className="space-y-4 whitespace-pre-wrap">
                      {selectedBlog.content}
                    </div>
                  </div>

                </div>

                {/* Footer panel */}
                <div className="p-4 bg-[#050816]/60 border-t border-white/5 flex justify-end">
                  <button
                    onClick={() => setSelectedBlog(null)}
                    className="font-space-grotesk text-xs bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-4 py-2 rounded border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
                  >
                    CLOSE READER
                  </button>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
