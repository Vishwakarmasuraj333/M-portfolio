"use client";

import { useEffect } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import WordPressProjects from "@/components/WordPressProjects";
import PhpMySqlProjects from "@/components/PhpMySqlProjects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";

export default function Home() {
  // Telemetry page view tracker
  useEffect(() => {
    let device = "Desktop";
    if (typeof window !== "undefined") {
      if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        device = "Mobile";
      } else if (/iPad|PlayBook|Silk/i.test(navigator.userAgent)) {
        device = "Tablet";
      }

      // Send telemetry hit logs to next API router
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: "/",
          device,
          country: "India", // Default simulation coordinates
          referrer: document.referrer || "Direct Link",
        }),
      }).catch((err) => console.error("Telemetry error:", err));
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Landing Section */}
      <Hero />

      {/* 2. About Mamta */}
      <About />

      {/* 3. Operational Services */}
      <Services />

      {/* 4. Technical Skills Matrix */}
      <Skills />

      {/* 5. Portfolio Projects Showcase (General & Responsive) */}
      <Projects />

      {/* 6. WordPress Projects */}
      <WordPressProjects />

      {/* 7. PHP MySQL Projects */}
      <PhpMySqlProjects />

      {/* 8. Chronological Work Experience */}
      <Experience />

      {/* 9. Academic and Milestones Journey */}
      <Education />

      {/* 10. Credentials & Certifications */}
      <Certifications />

      {/* 11. Form Submission Contact grid */}
      <Contact />
    </div>
  );
}
