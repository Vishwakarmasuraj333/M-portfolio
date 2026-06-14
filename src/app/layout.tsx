import type { Metadata } from "next";
import { Space_Grotesk, Orbitron, Inter } from "next/font/google";
import "./globals.css";
import ParticleBackground from "@/components/ui/ParticleBackground";
import CursorGlow from "@/components/ui/CursorGlow";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mamta Yadav | Web Developer | Space Portfolio",
  description: "Ultra-premium futuristic portfolio of Mamta Yadav, featuring dynamic WordPress, PHP, MySQL web development, custom space canvas, and admin management system.",
  keywords: ["Mamta Yadav", "Web Developer", "WordPress Developer", "PHP Developer", "MySQL Developer", "Portfolio", "GSAP Animations", "Tailwind CSS"],
  authors: [{ name: "Mamta Yadav" }],
  openGraph: {
    title: "Mamta Yadav | Web Developer Portfolio",
    description: "AAA game-like cinematic portfolio featuring advanced WordPress, PHP, MySQL capabilities, and secure admin control center.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${orbitron.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg-space-dark text-gray-100 font-inter relative select-none">
        {/* Core Animated Galaxy Canvas & Ambient Space Particles */}
        <ParticleBackground />
        
        {/* Trailing Neon Mouse Follower Cursor Effect */}
        <CursorGlow />

        {/* Global Scroll Tracking Progress Bar */}
        <ScrollProgressBar />

        {/* Premium Blur Navbar Header */}
        <Navbar />

        {/* Core Viewport Container */}
        <main className="relative z-10 flex-grow min-h-screen">
          {children}
        </main>

        {/* Cinematic Footer Section */}
        <Footer />
      </body>
    </html>
  );
}
