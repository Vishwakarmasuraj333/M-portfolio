"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus("error");
      setErrorMessage("Please complete all input elements.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to deliver transmission.");
      }
    } catch (err) {
      console.error("Submit contact form error:", err);
      setStatus("error");
      setErrorMessage("Network interface failure.");
    }
  };

  return (
    <section id="contact" className="relative py-24 px-6 overflow-hidden">
      {/* Background neon blur spot */}
      <div className="absolute right-0 bottom-1/4 w-80 h-80 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center gap-2 mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-orbitron text-xs text-accent tracking-widest font-semibold"
          >
            12 // SIGNAL TRANSMISSION
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron text-3xl md:text-4xl font-extrabold tracking-wide"
          >
            GET IN <span className="text-accent text-glow">TOUCH</span>
          </motion.h2>
          
          <div className="w-12 h-[2px] bg-gradient-to-r from-accent to-primary mt-1" />
        </div>

        {/* Double Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          
          {/* Left: Contact Info Info-blocks */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-gray-300 font-inter">
            <h3 className="font-orbitron font-bold text-white text-lg mb-2">Establish Communications</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
              Need assistance building high-scale full stack platforms or integrating smart generative pipelines? Send a signal down the communication grid!
            </p>

            <div className="flex items-center gap-4 p-4 rounded-xl glass-panel border-white/5 hover:border-accent/20 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                <Mail size={18} />
              </div>
              <div>
                <h4 className="font-space-grotesk font-semibold text-white text-xs uppercase tracking-wide">ELECTRONIC MAIL</h4>
                <p className="text-xs sm:text-sm text-gray-400 mt-0.5">mamta.yadav@devmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl glass-panel border-white/5 hover:border-accent/20 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                <Phone size={18} />
              </div>
              <div>
                <h4 className="font-space-grotesk font-semibold text-white text-xs uppercase tracking-wide">COMMS CHANNEL</h4>
                <p className="text-xs sm:text-sm text-gray-400 mt-0.5">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl glass-panel border-white/5 hover:border-accent/20 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                <MapPin size={18} />
              </div>
              <div>
                <h4 className="font-space-grotesk font-semibold text-white text-xs uppercase tracking-wide">COORDINATES</h4>
                <p className="text-xs sm:text-sm text-gray-400 mt-0.5">Mumbai, Maharashtra, India</p>
              </div>
            </div>
          </div>

          {/* Right: Contact Form Panel */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-6 sm:p-8 rounded-2xl border-white/5 shadow-2xl relative"
            >
              {/* Submission Status Alerts */}
              {status === "success" && (
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg text-emerald-400 text-xs sm:text-sm mb-6 font-space-grotesk shadow shadow-emerald-500/10 animate-fade-in">
                  <CheckCircle size={16} />
                  <span>TRANSMISSION SHIPPED! Communication logs saved.</span>
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg text-rose-400 text-xs sm:text-sm mb-6 font-space-grotesk shadow shadow-rose-500/10 animate-fade-in">
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5 font-space-grotesk text-xs sm:text-sm">
                
                {/* Name / Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-gray-400 font-semibold tracking-wider">YOUR NAME</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      className="bg-white/5 border border-white/5 focus:border-accent/50 outline-none rounded p-3 text-white transition-all font-inter"
                      placeholder="Your name..."
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-gray-400 font-semibold tracking-wider">EMAIL ADRESS</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      className="bg-white/5 border border-white/5 focus:border-accent/50 outline-none rounded p-3 text-white transition-all font-inter"
                      placeholder="you@domain.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-gray-400 font-semibold tracking-wider">TRANSMISSION SUBJECT</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    className="bg-white/5 border border-white/5 focus:border-accent/50 outline-none rounded p-3 text-white transition-all font-inter"
                    placeholder="Project proposal / Freelance gig"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-gray-400 font-semibold tracking-wider">MESSAGE CONTENT</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    className="bg-white/5 border border-white/5 focus:border-accent/50 outline-none rounded p-3 text-white resize-none transition-all font-inter"
                    placeholder="Provide details about your query..."
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-primary hover:opacity-90 px-6 py-3 rounded text-white font-bold tracking-wider shadow-[0_0_15px_rgba(255,128,223,0.4)] transition-all cursor-pointer hover:scale-[1.02] active:scale-95 disabled:opacity-50 mt-2"
                >
                  {status === "loading" ? (
                    <div className="w-5 h-5 rounded-full border-2 border-t-transparent border-white animate-spin" />
                  ) : (
                    <>
                      <Send size={15} />
                      <span>SEND TRANSMISSION</span>
                    </>
                  )}
                </button>

              </form>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
