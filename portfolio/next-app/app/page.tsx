'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import About from '@/components/about';
import Education from '@/components/education';
import Skills from '@/components/skills';
import Projects from '@/components/projects';
import Experience from '@/components/experience';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import InteractiveDotGrid from '@/components/interactive-dot-grid';
import RetroTerminalIntro from '@/components/retro-terminal-intro';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [showRetroTerminal, setShowRetroTerminal] = useState(true);

  return (
    <main className="relative min-h-screen bg-[#060710] text-[#e2e7ff] overflow-x-hidden selection:bg-[#7f8cf8] selection:text-[#060710]">
      {/* Interactive Cyber CRT Phosphor Dot Grid */}
      <InteractiveDotGrid />

      {/* Cyberpunk Phosphor Ambient Glow Orbs */}
      <div 
        className="fixed top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full pointer-events-none z-0 blur-[130px] opacity-25"
        style={{
          background: 'radial-gradient(circle, #7f8cf8 0%, #353c7a 50%, transparent 80%)'
        }}
      />
      <div 
        className="fixed top-[40%] right-[-12%] w-[50vw] h-[50vw] rounded-full pointer-events-none z-0 blur-[140px] opacity-20"
        style={{
          background: 'radial-gradient(circle, #b9c2ff 0%, #5661b3 45%, transparent 75%)'
        }}
      />
      <div 
        className="fixed bottom-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full pointer-events-none z-0 blur-[150px] opacity-20"
        style={{
          background: 'radial-gradient(circle, #7f8cf8 0%, #12152d 60%, transparent 80%)'
        }}
      />

      {/* CRT Scanline Overlay Texture */}
      <div className="fixed inset-0 pointer-events-none z-[1] crt-scanlines opacity-40" />

      {/* Retro Multi-Monitor CRT Zoom-in Intro */}
      <AnimatePresence>
        {showRetroTerminal && (
          <RetroTerminalIntro onComplete={() => setShowRetroTerminal(false)} />
        )}
      </AnimatePresence>

      {/* Floating Toggle Button to re-enter Retro Terminal OS */}
      {!showRetroTerminal && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => setShowRetroTerminal(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#7f8cf8]/50 bg-[#0d0f20]/90 backdrop-blur-md text-[#b9c2ff] text-xs font-mono tracking-wider shadow-lg shadow-[#7f8cf8]/20 hover:border-[#b9c2ff] hover:bg-[#7f8cf8]/20 transition-all cursor-pointer group"
        >
          <span className="w-2 h-2 rounded-full bg-[#b9c2ff] animate-ping" />
          <span className="group-hover:text-white font-semibold">🖥️ CRT HUD OS</span>
        </motion.button>
      )}

      {/* Main Portfolio Content */}
      <div className="relative z-10">
        <Navbar onOpenTerminal={() => setShowRetroTerminal(true)} />
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
