"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alphaSpeed: number;
  alpha: number;
}

interface CosmicDust {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialize Twinkling Stars
    const stars: Star[] = Array.from({ length: 150 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      baseAlpha: Math.random() * 0.7 + 0.3,
      alphaSpeed: Math.random() * 0.02 + 0.005,
      alpha: Math.random(),
    }));

    // Initialize Cosmic Dust Particles
    const dusts: CosmicDust[] = Array.from({ length: 40 }, () => {
      const colors = ["#ff4db8", "#b84dff", "#ff80df", "#00ffff"];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2 - 0.05, // Slight upward drift
        size: Math.random() * 2.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
      };
    });

    // Handle Resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Track scroll for subtle parallax
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);

    // Nebula static configuration to render soft background glow spots
    const nebulas = [
      { x: 0.2, y: 0.3, radius: 250, color: "rgba(255, 77, 184, 0.04)" },
      { x: 0.8, y: 0.6, radius: 400, color: "rgba(184, 77, 255, 0.05)" },
      { x: 0.5, y: 0.8, radius: 300, color: "rgba(18, 5, 52, 0.4)" },
      { x: 0.8, y: 0.2, radius: 350, color: "rgba(255, 128, 223, 0.03)" },
    ];

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Deep Space Background Gradients (Nebulas)
      nebulas.forEach((n) => {
        // Apply parallax offset based on scroll
        const parallaxY = n.y * height - scrollY * 0.15;
        
        const grad = ctx.createRadialGradient(
          n.x * width,
          parallaxY,
          10,
          n.x * width,
          parallaxY,
          n.radius
        );
        grad.addColorStop(0, n.color);
        grad.addColorStop(1, "rgba(5, 8, 22, 0)");
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x * width, parallaxY, n.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Twinkling Stars
      stars.forEach((star) => {
        // Apply scroll-parallax
        const starY = (star.y - scrollY * 0.05 + height) % height;

        star.alpha += star.alphaSpeed;
        if (star.alpha > Math.PI * 2) star.alpha = 0;
        const currentAlpha = star.baseAlpha + Math.sin(star.alpha) * 0.25;

        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(1, currentAlpha))})`;
        ctx.beginPath();
        ctx.arc(star.x, starY, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw Floating Cosmic Dust
      dusts.forEach((dust) => {
        // Move dust
        dust.x += dust.vx;
        dust.y += dust.vy;

        // Reset positions if out of bounds
        if (dust.x < 0) dust.x = width;
        if (dust.x > width) dust.x = 0;
        if (dust.y < 0) dust.y = height;
        if (dust.y > height) dust.y = 0;

        // Parallax scroll shift
        const dustY = (dust.y - scrollY * 0.1 + height) % height;

        ctx.shadowBlur = 8;
        ctx.shadowColor = dust.color;
        ctx.fillStyle = dust.color;
        ctx.globalAlpha = dust.alpha;

        ctx.beginPath();
        ctx.arc(dust.x, dustY, dust.size, 0, Math.PI * 2);
        ctx.fill();

        // Reset shadow
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-50 bg-[#050816]"
      style={{ pointerEvents: "none" }}
    />
  );
}
