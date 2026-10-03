'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Cpu, Sparkles, Terminal } from 'lucide-react';
import AutonomousDrone from '@/components/autonomous-drone';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headlines & Bios */}
        <div className="lg:col-span-7 space-y-6">
          {/* Kicker Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#7f8cf8]/40 bg-[#0d0f20]/80 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#b9c2ff] animate-pulse" />
            <span className="font-mono text-xs font-semibold tracking-wider text-[#b9c2ff]">
              B.TECH CSE @ DELHI TECHNOLOGICAL UNIVERSITY
            </span>
          </motion.div>

          {/* Main Giant Display Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-1"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-white">
              NAVYA
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-[#b9c2ff] hud-glow">
              MINOCHA
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-[#707cb8] max-w-xl font-normal leading-relaxed"
          >
            Building intelligent systems at the intersection of <span className="text-[#b9c2ff] font-medium">Deep Learning</span>, <span className="text-[#7f8cf8] font-medium">Computer Vision</span>, and <span className="text-[#b9c2ff] font-medium">Generative AI</span>.
          </motion.p>

          {/* Key Stat Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap gap-3 pt-2"
          >
            <div className="px-3 py-1.5 rounded-lg border border-[#7f8cf8]/30 bg-[#0d0f20]/60 text-xs font-mono text-[#b9c2ff] flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-[#7f8cf8]" />
              <span>JEE Mains 99.46%ile</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg border border-[#7f8cf8]/30 bg-[#0d0f20]/60 text-xs font-mono text-[#b9c2ff] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#7f8cf8]" />
              <span>8.7 CGPA @ DTU</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg border border-[#7f8cf8]/30 bg-[#0d0f20]/60 text-xs font-mono text-[#b9c2ff] flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#7f8cf8]" />
              <span>HCLTech GenAI Intern</span>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <a
              href="#projects"
              className="px-7 py-3 rounded-xl bg-[#7f8cf8] text-[#060710] font-mono text-sm font-bold tracking-wide hover:bg-[#b9c2ff] hover:shadow-[0_0_30px_rgba(185,194,255,0.5)] transition-all cursor-pointer"
            >
              EXPLORE PROJECTS ➔
            </a>
            <a
              href="#about"
              className="px-7 py-3 rounded-xl border border-[#7f8cf8]/40 bg-[#0d0f20]/70 text-[#b9c2ff] font-mono text-sm font-semibold hover:border-[#b9c2ff] hover:bg-[#7f8cf8]/20 transition-all cursor-pointer"
            >
              VIEW CREDENTIALS
            </a>
          </motion.div>
        </div>

        {/* Right Column: Free-Floating Unboxed Autonomous Drone */}
        <div className="lg:col-span-5 flex items-center justify-center relative min-h-[420px]">
          <AutonomousDrone />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#707cb8] pointer-events-none"
      >
        <span className="font-mono text-[10px] tracking-widest text-[#7f8cf8]">SCROLL TO EXPLORE</span>
        <ArrowDown className="w-4 h-4 text-[#7f8cf8]" />
      </motion.div>
    </section>
  );
}
