const fs = require('fs');

// 1. components/retro-terminal-intro.tsx
const retroTerminalCode = `'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Sparkles, Cpu, Radio, Shield, Code, ArrowUpRight, Zap, Play } from 'lucide-react';

interface RetroTerminalIntroProps {
  onEnter: () => void;
  isEntered: boolean;
}

export function RetroTerminalIntro({ onEnter, isEntered }: RetroTerminalIntroProps) {
  const [typedText, setTypedText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);

  const terminalLines = [
    '> INITIALIZING NEURAL_KERNEL v4.2.0...',
    '> LOADING MODEL: Navya_Minocha_DTU_CSE.pt',
    '> JEE MAINS: 99.46%ile | CGPA: 8.7 @ DTU',
    '> HCLTech GenAI Intern // RAG Optimization',
    '> AIMS DTU Co-Head // AI & ML Society',
    '> SIH Decode Winner @ IIIT Delhi',
    '> SYSTEM READY. CLICK TO DIVE INTO MATRIX...',
  ];

  useEffect(() => {
    if (lineIndex < terminalLines.length) {
      const currentLine = terminalLines[lineIndex];
      let charIdx = 0;
      const interval = setInterval(() => {
        if (charIdx <= currentLine.length) {
          setTypedText((prev) => {
            const lines = prev.split('\\n');
            lines[lines.length - 1] = currentLine.slice(0, charIdx);
            return lines.join('\\n');
          });
          charIdx++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setTypedText((prev) => prev + '\\n> ');
            setLineIndex((prev) => prev + 1);
          }, 350);
        }
      }, 25);
      return () => clearInterval(interval);
    }
  }, [lineIndex]);

  const handleScreenClick = () => {
    if (isZooming || isEntered) return;
    setIsZooming(true);
    setTimeout(() => {
      onEnter();
    }, 950);
  };

  return (
    <AnimatePresence>
      {!isEntered && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: isZooming ? 0 : 1,
            scale: isZooming ? 4.5 : 1,
            filter: isZooming ? 'blur(12px) brightness(2)' : 'blur(0px) brightness(1)',
          }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0515] overflow-hidden cursor-pointer select-none"
          onClick={handleScreenClick}
        >
          {/* CRT Scanline Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.45)_51%)] bg-[length:100%_4px] pointer-events-none z-30" />

          {/* Deep Ambient Synthwave Glowing Auras */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#a855f7]/30 via-[#ff2a85]/20 to-transparent rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[650px] h-[650px] bg-gradient-to-bl from-[#00f0ff]/25 via-[#9333ea]/20 to-transparent rounded-full blur-[150px] pointer-events-none" />

          {/* Main Retro Multi-Monitor Workstation Container */}
          <div className="relative w-full max-w-5xl px-4 sm:px-8 py-8 flex flex-col items-center justify-center z-20">
            {/* Top Retro HUD Bar */}
            <div className="w-full flex items-center justify-between mb-4 px-4 py-2 rounded-xl bg-[#150a2a]/80 border border-[#a855f7]/40 backdrop-blur-md text-[11px] font-mono text-[#00f0ff] shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff2a85] animate-ping" />
                <span className="font-bold text-white tracking-widest uppercase">
                  NAVYA_MINOCHA // WORKSTATION_v4.2
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="text-[#a855f7] font-semibold">DTU CSE 8.7 CGPA</span>
                <span className="text-[#fbbf24] hidden sm:inline">JEE 99.46%ile</span>
                <span className="text-[#4ade80]">STATUS: ONLINE</span>
              </div>
            </div>

            {/* 3-Monitor Retro Workstation Scene */}
            <div className="relative w-full aspect-[16/10] max-h-[580px] rounded-3xl overflow-hidden border-2 border-[#a855f7]/50 shadow-[0_0_60px_rgba(168,85,247,0.4)] bg-[#0d071c] flex items-center justify-center group">
              {/* Background Pixel Workstation Art (From Uploaded Image) */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/retro-computer.png"
                  alt="Retro AI Workstation"
                  fill
                  sizes="100vw"
                  className="object-cover object-center filter saturate-125 contrast-110"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0517]/80 via-transparent to-[#0b0517]/40" />
              </div>

              {/* Dynamic Interactive Terminal Code Overlay on the Center Screen */}
              <div className="relative z-10 w-[62%] sm:w-[50%] md:w-[42%] h-[56%] sm:h-[54%] p-3 sm:p-5 rounded-2xl bg-[#090314]/90 border border-[#a855f7]/60 shadow-[inset_0_0_30px_rgba(168,85,247,0.5),0_0_40px_rgba(0,240,255,0.3)] backdrop-blur-xs flex flex-col justify-between overflow-hidden">
                {/* Screen Header */}
                <div className="flex items-center justify-between pb-1.5 border-b border-[#a855f7]/30 text-[9px] sm:text-[10px] font-mono text-[#00f0ff]">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-[#ff2a85]" />
                    <span className="font-bold">terminal@navya-dtu:~</span>
                  </div>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#ff2a85]" />
                    <span className="w-2 h-2 rounded-full bg-[#fbbf24]" />
                    <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
                  </div>
                </div>

                {/* Animated Code / Terminal Output */}
                <div className="flex-1 my-2 font-mono text-[9px] sm:text-[11px] leading-relaxed text-[#c084fc] overflow-hidden whitespace-pre-wrap select-none">
                  <span className="text-[#4ade80]">def</span> <span className="text-[#00f0ff]">boot_portfolio</span>():
                  <br />
                  <span className="text-white/80">{typedText}</span>
                  <span className="inline-block w-2 h-3.5 bg-[#00f0ff] ml-1 animate-pulse align-middle" />
                </div>

                {/* Screen Click-To-Enter Button Overlay */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#ff2a85] via-[#9333ea] to-[#00f0ff] text-[#0a0515] font-black text-[10px] sm:text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,42,133,0.6)] animate-pulse cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>CLICK OR TAP SCREEN TO ENTER</span>
                </motion.div>
              </div>

              {/* Floating Holographic Telemetry Tags */}
              <div className="absolute top-6 left-6 hidden sm:flex flex-col gap-2 pointer-events-none">
                <div className="px-3 py-1.5 rounded-lg bg-[#0e071e]/90 border border-[#00f0ff]/40 text-[10px] font-mono text-[#00f0ff] backdrop-blur-md shadow-lg flex items-center gap-2">
                  <Radio className="w-3 h-3 text-[#4ade80] animate-pulse" />
                  <span>CV_NAV // 28.7499° N</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-[#0e071e]/90 border border-[#ff2a85]/40 text-[10px] font-mono text-[#ff2a85] backdrop-blur-md shadow-lg">
                  <span>mIoU: 0.6094 · OFF-ROAD</span>
                </div>
              </div>

              <div className="absolute bottom-6 right-6 hidden sm:flex flex-col gap-2 items-end pointer-events-none">
                <div className="px-3 py-1.5 rounded-lg bg-[#0e071e]/90 border border-[#fbbf24]/40 text-[10px] font-mono text-[#fbbf24] backdrop-blur-md shadow-lg flex items-center gap-2">
                  <Zap className="w-3 h-3" />
                  <span>RAG_OPTIMIZATION // HCLTECH</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-[#0e071e]/90 border border-[#a855f7]/40 text-[10px] font-mono text-[#a855f7] backdrop-blur-md shadow-lg">
                  <span>DTU CSE · 8.7 CGPA</span>
                </div>
              </div>
            </div>

            {/* Bottom Helper Bar */}
            <div className="mt-4 flex items-center justify-center gap-3 text-xs font-mono text-[#a855f7]">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
              <span className="text-white/70">
                Click anywhere on the computer screen to dive into the full portfolio
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
`;

// 2. components/interactive-dot-grid.tsx (Updated with vibrant synthwave neon purple/cyan/magenta colors)
const dotGridCode = `'use client';

import React, { useEffect, useRef } from 'react';

export function InteractiveDotGrid({ className = '', dotSize = 2.5, gap = 28 }: { className?: string; dotSize?: number; gap?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 190,
      active: false,
    };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const render = () => {
      time += 0.015;

      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.1;
        mouse.y += (mouse.targetY - mouse.y) * 0.1;
      } else {
        mouse.x += (width / 2 + Math.sin(time * 0.5) * 120 - mouse.x) * 0.03;
        mouse.y += (height / 2 + Math.cos(time * 0.4) * 80 - mouse.y) * 0.03;
      }

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / gap) + 2;
      const rows = Math.ceil(height / gap) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const originX = i * gap;
          const originY = j * gap;

          const dx = mouse.x - originX;
          const dy = mouse.y - originY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = mouse.radius;
          let posX = originX;
          let posY = originY;
          let currentSize = dotSize;
          let opacity = 0.22;

          if (dist < maxDist) {
            const force = (1 - dist / maxDist);
            const angle = Math.atan2(dy, dx);
            const pushDist = Math.sin(force * Math.PI) * 22;
            posX -= Math.cos(angle) * pushDist;
            posY -= Math.sin(angle) * pushDist;

            currentSize = dotSize + force * 4.2;
            opacity = 0.3 + force * 0.7;
          }

          const wave = Math.sin(originX * 0.01 + originY * 0.01 + time);
          currentSize += wave * 0.5;

          const isNearCenter = dist < maxDist * 1.3;

          ctx.beginPath();
          ctx.arc(posX, posY, Math.max(0.8, currentSize), 0, Math.PI * 2);

          if (isNearCenter) {
            const ratio = (dist / (maxDist * 1.3));
            if (ratio < 0.35) {
              ctx.fillStyle = \`rgba(255, 42, 133, \${opacity})\`; // Neon Magenta
            } else if (ratio < 0.7) {
              ctx.fillStyle = \`rgba(0, 240, 255, \${opacity})\`; // Neon Cyan
            } else {
              ctx.fillStyle = \`rgba(192, 132, 252, \${opacity})\`; // Lavender Purple
            }
          } else {
            ctx.fillStyle = \`rgba(147, 51, 234, \${Math.max(0.08, opacity * 0.35)})\`;
          }

          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [dotSize, gap]);

  return <canvas ref={canvasRef} className={'absolute inset-0 pointer-events-auto ' + className} />;
}
`;

// 3. app/globals.css
const globalsCssCode = `@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-heading: var(--font-sans);
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-destructive: var(--destructive);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
  --background: #0d071a;
  --foreground: #f3f0ff;
  --card: #150d2b;
  --card-foreground: #f3f0ff;
  --popover: #150d2b;
  --popover-foreground: #f3f0ff;
  --primary: #00f0ff;
  --primary-foreground: #0a0515;
  --secondary: #221245;
  --secondary-foreground: #f3f0ff;
  --muted: #1a0e36;
  --muted-foreground: #a79bbd;
  --accent: #ff2a85;
  --accent-foreground: #ffffff;
  --destructive: #ef4444;
  --border: rgba(168, 85, 247, 0.25);
  --input: rgba(168, 85, 247, 0.3);
  --ring: #00f0ff;
  --radius: 0.75rem;
}

.dark {
  --background: #0a0515;
  --foreground: #f3f0ff;
  --card: #130a26;
  --card-foreground: #f3f0ff;
  --popover: #130a26;
  --popover-foreground: #f3f0ff;
  --primary: #00f0ff;
  --primary-foreground: #0a0515;
  --secondary: #1f103d;
  --secondary-foreground: #f3f0ff;
  --muted: #190d33;
  --muted-foreground: #a79bbd;
  --accent: #ff2a85;
  --accent-foreground: #ffffff;
  --destructive: #f87171;
  --border: rgba(168, 85, 247, 0.25);
  --input: rgba(168, 85, 247, 0.3);
  --ring: #00f0ff;
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-[#0a0515] text-[#f3f0ff];
  }
  html {
    scroll-behavior: smooth;
  }
}

/* Retro Synthwave Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #0a0515;
}
::-webkit-scrollbar-thumb {
  background: #2b1458;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #ff2a85;
}
`;

// 4. app/page.tsx (With Retro Terminal Boot & Cyber Theme)
const pageCode = `'use client';

import React, { useState } from 'react';
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Education } from "@/components/education";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { InteractiveDotGrid } from "@/components/interactive-dot-grid";
import { RetroTerminalIntro } from "@/components/retro-terminal-intro";
import { Terminal, Monitor } from "lucide-react";

export default function Page() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0a0515] text-[#f3f0ff] selection:bg-[#ff2a85]/40 selection:text-[#00f0ff] overflow-x-hidden">
      {/* 1. Retro CRT Terminal Boot Entrance Gateway */}
      <RetroTerminalIntro isEntered={hasEntered} onEnter={() => setHasEntered(true)} />

      {/* 2. Global Seamless Synthwave/Cyber Auras & Particle Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top ambient violet/magenta aura */}
        <div className="absolute top-[3%] left-[18%] w-[700px] h-[600px] rounded-full bg-gradient-to-br from-[#7e22ce]/35 via-[#ff2a85]/20 to-transparent blur-[140px]" />
        
        {/* Mid-page neon cyan/indigo nebula */}
        <div className="absolute top-[32%] right-[8%] w-[650px] h-[550px] rounded-full bg-gradient-to-bl from-[#00f0ff]/20 via-[#4f46e5]/25 to-transparent blur-[150px]" />

        {/* Lower projects cyber-purple aura */}
        <div className="absolute top-[62%] left-[12%] w-[600px] h-[550px] rounded-full bg-gradient-to-tr from-[#9333ea]/30 via-[#ec4899]/20 to-transparent blur-[140px]" />

        {/* Bottom contact electric amber/gold aura */}
        <div className="absolute bottom-[8%] right-[15%] w-[550px] h-[500px] rounded-full bg-gradient-to-tl from-[#fbbf24]/20 via-[#ff2a85]/15 to-transparent blur-[130px]" />

        {/* Continuous Interactive Dot Grid throughout entire page */}
        <InteractiveDotGrid className="opacity-75" />
      </div>

      {/* 3. Main Foreground Website Content */}
      <div className="relative z-10">
        <Navbar onReopenTerminal={() => setHasEntered(false)} />
        <main>
          <Hero />
          <About />
          <Education />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Floating Retro Terminal Re-enter Shortcut Button */}
      {hasEntered && (
        <button
          onClick={() => setHasEntered(false)}
          className="fixed bottom-6 right-6 z-40 px-4 py-2.5 rounded-full bg-[#160a2c]/90 border border-[#00f0ff]/50 hover:border-[#ff2a85] text-xs font-mono text-[#00f0ff] hover:text-white shadow-[0_0_25px_rgba(0,240,255,0.4)] backdrop-blur-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Return to Retro CRT Workstation"
        >
          <Monitor className="w-3.5 h-3.5 text-[#ff2a85] animate-pulse" />
          <span>CRT TERMINAL</span>
        </button>
      )}
    </div>
  );
}
`;

// 5. components/navbar.tsx (Cyber Synthwave Theme & Terminal Switcher)
const navbarCode = `'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContinuousTabs } from './continuous-tabs';
import { SwitchMode } from './switch-mode';
import { Menu, X, Monitor } from 'lucide-react';

const navTabs = [
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({ onReopenTerminal }: { onReopenTerminal?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={\`fixed top-0 left-0 right-0 z-40 transition-all duration-300 \${
          isScrolled
            ? 'py-3 bg-[#0d071a]/85 backdrop-blur-xl border-b border-[#a855f7]/30 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'py-5 bg-transparent'
        }\`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between max-w-7xl">
          {/* Logo with Circular NM Gradient Badge */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#00f0ff] via-[#c084fc] to-[#ff2a85] flex items-center justify-center text-[#0a0515] font-black text-xs tracking-tight shadow-[0_0_20px_rgba(0,240,255,0.6)] border border-white/30 group-hover:scale-110 transition-transform">
              NM
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-white group-hover:text-[#00f0ff] transition-colors">
                Navya Minocha
              </span>
              <span className="text-[10px] font-mono text-[#c084fc] tracking-widest uppercase">
                AI / ML · DTU CSE
              </span>
            </div>
          </button>

          <div className="hidden lg:block">
            <ContinuousTabs tabs={navTabs} />
          </div>

          <div className="hidden sm:flex items-center gap-3">
            {onReopenTerminal && (
              <button
                onClick={onReopenTerminal}
                className="px-3 py-1.5 rounded-full bg-[#180e30] border border-[#a855f7]/40 hover:border-[#00f0ff] text-[11px] font-mono text-[#c084fc] hover:text-[#00f0ff] flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Monitor className="w-3 h-3 text-[#ff2a85]" />
                <span>CRT OS</span>
              </button>
            )}

            <button
              onClick={() => scrollTo('contact')}
              className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#ff2a85] to-[#9333ea] hover:from-[#ff4797] hover:to-[#a855f7] text-white shadow-[0_0_25px_rgba(255,42,133,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Get in touch
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-[#0d071a]/95 backdrop-blur-2xl border-b border-[#a855f7]/30 p-6 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {navTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollTo(tab.id)}
                  className="text-left py-2 text-sm font-mono uppercase tracking-wider text-white/80 hover:text-[#00f0ff] transition-colors"
                >
                  {tab.label}
                </button>
              ))}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                {onReopenTerminal && (
                  <button
                    onClick={onReopenTerminal}
                    className="px-3 py-1.5 rounded-full bg-[#180e30] border border-[#a855f7]/40 text-xs font-mono text-[#00f0ff]"
                  >
                    CRT OS
                  </button>
                )}
                <button
                  onClick={() => scrollTo('contact')}
                  className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#ff2a85] text-white"
                >
                  Get in touch
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
`;

// 6. components/hero.tsx (Matching Cyber Synthwave Theme)
const heroCode = `'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AutonomousDrone } from './autonomous-drone';
import { ArrowDown, ArrowUpRight, Terminal, Sparkles } from 'lucide-react';

export function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      <div className="container relative z-20 mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headline & Intro */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-6 flex flex-col items-start gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#160a2c]/90 border border-[#a855f7]/40 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.25)]">
              <span className="w-2 h-2 rounded-full bg-[#ff2a85] animate-ping" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#00f0ff] font-semibold">
                Navya Minocha · B.Tech CSE @ DTU
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[74px] font-black tracking-tighter text-[#f3f0ff] leading-[1.02] select-none">
              <span>Machine Learning</span>
              <span className="text-[#ff2a85]">.</span> <br />
              <span>Deep Learning</span>
              <span className="text-[#00f0ff]">.</span> <br />
              <span className="bg-gradient-to-r from-white via-[#00f0ff] to-[#ff2a85] bg-clip-text text-transparent">
                Generative AI
              </span>
              <span className="text-[#fbbf24]">.</span>
            </h1>

            <p className="text-base sm:text-lg text-white/75 max-w-xl font-normal leading-relaxed">
              Machine Learning & GenAI engineer exploring RAG architectures, computer vision, autonomous drone perception, and neurosymbolic systems.
              AI/GenAI Intern at <span className="text-white font-semibold">HCLTech</span> & Co-Head at{' '}
              <span className="text-white font-semibold">AIMS DTU</span>.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs font-mono text-white/70">
              <span className="px-3 py-1.5 rounded-md bg-[#180e30]/80 border border-[#a855f7]/30">
                JEE Mains 99.46%ile
              </span>
              <span className="px-3 py-1.5 rounded-md bg-[#180e30]/80 border border-[#00f0ff]/30">
                CGPA 8.7 @ DTU
              </span>
              <span className="px-3 py-1.5 rounded-md bg-[#180e30]/80 border border-[#ff2a85]/30">
                SIH Decode Winner
              </span>
              <span className="px-3 py-1.5 rounded-md bg-[#180e30]/80 border border-white/10">
                DTU Football Vice-Captain
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() => scrollTo('projects')}
                className="group px-7 py-3.5 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#38bdf8] text-[#0a0515] font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(0,240,255,0.45)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Selected Work</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={() => scrollTo('skills')}
                className="px-6 py-3.5 rounded-full bg-[#180e30]/85 hover:bg-[#221345] border border-[#a855f7]/40 hover:border-[#00f0ff]/60 text-white font-medium text-sm tracking-wide backdrop-blur-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-[#fbbf24]" />
                <span>Technical Arsenal</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: 100% UNBOXED FREE-FLOATING AUTONOMOUS AI DRONE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col items-center justify-center relative w-full min-h-[460px]"
          >
            <div className="w-full relative flex items-center justify-center">
              <AutonomousDrone />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none opacity-60">
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#c084fc]">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-[#00f0ff]" />
        </motion.div>
      </div>
    </section>
  );
}
`;

// 7. components/about.tsx (Featuring Profile Photo with Synthwave Glow)
const aboutCode = `'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Code, Trophy } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      <div className="container relative z-20 mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex flex-col gap-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#00f0ff]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a85]" />
            <span>01 // About & Research</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
            Creativity<span className="text-[#ff2a85]">.</span> Innovation<span className="text-[#00f0ff]">.</span> Impact<span className="text-[#fbbf24]">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Real Profile Photo Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            {/* Ambient Profile Glow */}
            <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-[#ff2a85]/30 via-[#a855f7]/25 to-[#00f0ff]/20 blur-3xl pointer-events-none" />

            <div className="relative group">
              {/* Decorative Tech Corner Accents */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[#00f0ff] rounded-tl-lg pointer-events-none z-20" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[#ff2a85] rounded-br-lg pointer-events-none z-20" />

              {/* Profile Image Container */}
              <div className="relative w-64 sm:w-72 h-80 sm:h-96 rounded-3xl overflow-hidden border border-[#a855f7]/40 shadow-[0_0_40px_rgba(168,85,247,0.35)] bg-[#130a26]/80 backdrop-blur-md">
                <Image
                  src="/profile.jpg"
                  alt="Navya Minocha"
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                {/* Subtle Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0515] via-transparent to-transparent opacity-85" />

                {/* Bottom Floating Info Badge */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-[#110724]/90 border border-[#a855f7]/30 backdrop-blur-md flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">Navya Minocha</span>
                    <span className="text-[10px] font-mono text-[#00f0ff]">B.Tech CSE @ DTU</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-[#4ade80] bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-500/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
                    <span>Open to AI/ML</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio & Credentials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <p className="text-base sm:text-lg text-white/85 leading-relaxed font-normal">
              I am a 2nd-year B.Tech Computer Science student at{' '}
              <strong className="text-white">Delhi Technological University (formerly DCE)</strong> with an{' '}
              <strong className="text-[#00f0ff]">8.7 CGPA</strong>, having secured a{' '}
              <strong className="text-[#fbbf24]">99.46 percentile in JEE Mains</strong>.
            </p>

            <p className="text-base text-white/70 leading-relaxed font-normal">
              My engineering focus lies in building scalable machine learning pipelines, multimodal models, and neurosymbolic systems.
              During my internship at <strong className="text-white">HCLTech</strong>, I worked on optimizing enterprise RAG architectures.
              As Co-Head of <strong className="text-white">AIMS DTU</strong>, I mentor peers in deep learning and AI development.
            </p>

            {/* Academic & Extracurricular Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#150a2c]/80 border border-[#a855f7]/30 hover:border-[#00f0ff]/50 transition-all shadow-lg">
                <div className="flex items-center gap-2 text-[#00f0ff] mb-1">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase font-bold">DTU CSE</span>
                </div>
                <div className="text-2xl font-black text-white">8.7 CGPA</div>
                <div className="text-xs text-[#a79bbd] mt-0.5">Sem 1 · Delhi Tech Univ</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#150a2c]/80 border border-[#a855f7]/30 hover:border-[#fbbf24]/50 transition-all shadow-lg">
                <div className="flex items-center gap-2 text-[#fbbf24] mb-1">
                  <Award className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase font-bold">JEE Mains</span>
                </div>
                <div className="text-2xl font-black text-white">99.46%ile</div>
                <div className="text-xs text-[#a79bbd] mt-0.5">12k Rank in Advanced</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#150a2c]/80 border border-[#a855f7]/30 hover:border-[#ff2a85]/50 transition-all shadow-lg">
                <div className="flex items-center gap-2 text-[#ff2a85] mb-1">
                  <Trophy className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase font-bold">SIH Decode</span>
                </div>
                <div className="text-xl font-bold text-white">Winner</div>
                <div className="text-xs text-[#a79bbd] mt-0.5">Render Track @ IIIT Delhi</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#150a2c]/80 border border-[#a855f7]/30 hover:border-[#4ade80]/50 transition-all shadow-lg">
                <div className="flex items-center gap-2 text-[#4ade80] mb-1">
                  <Code className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase font-bold">Sports</span>
                </div>
                <div className="text-xl font-bold text-white">Vice-Captain</div>
                <div className="text-xs text-[#a79bbd] mt-0.5">DTU Football · 2x Gold</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
`;

// 8. components/autonomous-drone.tsx (Updated with Synthwave Neon Palette)
const droneCode = `'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Crosshair, Scan, Radio, Shield, Eye } from 'lucide-react';

export function AutonomousDrone({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [telemetry, setTelemetry] = useState({
    altitude: '43.5m',
    fps: 60.4,
    confidence: '98.4%',
    heading: '042° NNE',
    pitch: '0.0°',
    mode: 'AUTONOMOUS_CV_v4',
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 110 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const droneRotateX = useTransform(smoothY, [-180, 180], [14, -14]);
  const droneRotateY = useTransform(smoothX, [-180, 180], [-18, 18]);
  const droneRotateZ = useTransform(smoothX, [-180, 180], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = Math.max(-220, Math.min(220, e.clientX - centerX));
      const dy = Math.max(-160, Math.min(160, e.clientY - centerY));
      mouseX.set(dx);
      mouseY.set(dy);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        ...prev,
        fps: +(59.5 + Math.random() * 1.5).toFixed(1),
        altitude: (43.0 + Math.sin(Date.now() / 1200) * 1.2).toFixed(1) + 'm',
        heading: (40 + Math.floor(Math.sin(Date.now() / 2000) * 5)).toString().padStart(3, '0') + '° NNE',
      }));
    }, 900);
    return () => clearInterval(interval);
  }, []);

  const targets = [
    { id: '38.24', x: 60, y: -50, w: 105, h: 95, label: 'PRIMARY_LOCK' },
    { id: '36.76', x: -130, y: -90, w: 85, h: 80, label: 'TARGET_ALPHA' },
    { id: '37.07', x: -160, y: 40, w: 90, h: 90, label: 'TERRAIN_VEG' },
    { id: '36.47', x: -60, y: -20, w: 75, h: 65, label: 'WAYPOINT' },
    { id: '36.81', x: 130, y: 50, w: 95, h: 85, label: 'OBSTACLE_02' },
  ];

  return (
    <div
      ref={containerRef}
      className={\`relative w-full h-[440px] flex items-center justify-center select-none \${className}\`}
    >
      {/* Free-floating Ambient Telemetry Header (NO BOX) */}
      <div className="absolute top-0 left-0 right-0 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[#00f0ff] px-3 pointer-events-auto">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-[#4ade80] animate-pulse" />
          <span className="font-bold text-white tracking-widest text-xs uppercase drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">
            DRONE_VISION // SYS_ONLINE
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-white/80">
            ALT: <strong className="text-[#fbbf24]">{telemetry.altitude}</strong>
          </span>
          <span className="text-white/80">
            FPS: <strong className="text-[#4ade80]">{telemetry.fps}</strong>
          </span>
          <span className="text-white/80 hidden sm:inline">
            CONF: <strong className="text-[#ff2a85]">{telemetry.confidence}</strong>
          </span>
        </div>
      </div>

      {/* Dynamic Laser Scanning Cone & Radar Reticles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[360px] h-[360px] rounded-full bg-gradient-to-r from-[#ff2a85]/20 via-[#a855f7]/15 to-[#00f0ff]/20 blur-3xl animate-pulse" />
        <div className="absolute w-72 h-72 rounded-full border border-[#00f0ff]/25 border-dashed animate-[spin_40s_linear_infinite]" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-[#a855f7]/20 animate-[spin_70s_linear_infinite_reverse]" />
      </div>

      {/* Free-Floating Target Bounding Boxes */}
      {targets.map((t, idx) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0.8 }}
          animate={{
            x: [t.x, t.x + (idx % 2 === 0 ? 8 : -8), t.x],
            y: [t.y, t.y + (idx % 3 === 0 ? -6 : 6), t.y],
            opacity: [0.75, 1, 0.75],
          }}
          transition={{
            duration: 3.5 + idx * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ width: t.w, height: t.h }}
          className="absolute z-10 pointer-events-none flex flex-col justify-between p-2 rounded-lg border border-[#00f0ff]/70 bg-[#00f0ff]/10 backdrop-blur-xs shadow-[0_0_18px_rgba(0,240,255,0.4)]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-[#00f0ff] bg-[#0d071c]/90 px-1.5 py-0.5 rounded shadow">
              {t.id}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#ff2a85] animate-ping" />
          </div>
          <div className="flex items-center justify-between text-[8px] font-mono text-[#4ade80]">
            <Scan className="w-3 h-3 text-[#00f0ff]" />
            <span className="tracking-wider font-semibold">LOCK</span>
          </div>
        </motion.div>
      ))}

      {/* Interactive 3D Flying Drone Body */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          rotateX: droneRotateX,
          rotateY: droneRotateY,
          rotateZ: droneRotateZ,
        }}
        className="relative z-20 flex flex-col items-center justify-center transition-transform duration-75 ease-out cursor-grab pointer-events-auto"
      >
        <div className="relative w-64 h-48 filter drop-shadow-[0_20px_35px_rgba(0,240,255,0.45)]">
          <svg viewBox="0 0 260 200" className="w-full h-full">
            <path
              d="M 50 45 L 130 100 L 210 45 M 50 155 L 130 100 L 210 155"
              stroke="#00f0ff"
              strokeWidth="5"
              strokeLinecap="round"
              strokeOpacity="0.9"
            />
            <path
              d="M 30 100 L 230 100"
              stroke="#a855f7"
              strokeWidth="3.5"
              strokeDasharray="6 3"
              strokeOpacity="0.7"
            />
            <rect
              x="100"
              y="75"
              width="60"
              height="50"
              rx="16"
              fill="#120824"
              stroke="#00f0ff"
              strokeWidth="2.5"
            />
            <circle cx="130" cy="95" r="12" fill="#1e0f3d" stroke="#ff2a85" strokeWidth="2" />
            <circle cx="130" cy="95" r="5" fill="#ff2a85" className="animate-pulse" />
            <circle cx="130" cy="115" r="7" fill="#000" stroke="#00f0ff" strokeWidth="2" />
            <circle cx="130" cy="115" r="3" fill="#00f0ff" />

            <circle cx="50" cy="45" r="16" fill="#100620" stroke="#00f0ff" strokeWidth="2.5" />
            <ellipse
              cx="50"
              cy="45"
              rx="34"
              ry="8"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="2"
              className="animate-[spin_0.2s_linear_infinite] origin-[50px_45px]"
            />
            <circle cx="50" cy="45" r="4" fill="#ff2a85" />

            <circle cx="210" cy="45" r="16" fill="#100620" stroke="#00f0ff" strokeWidth="2.5" />
            <ellipse
              cx="210"
              cy="45"
              rx="34"
              ry="8"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="2"
              className="animate-[spin_0.2s_linear_infinite] origin-[210px_45px]"
            />
            <circle cx="210" cy="45" r="4" fill="#ff2a85" />

            <circle cx="50" cy="155" r="16" fill="#100620" stroke="#00f0ff" strokeWidth="2.5" />
            <ellipse
              cx="50"
              cy="155"
              rx="34"
              ry="8"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="2"
              className="animate-[spin_0.2s_linear_infinite] origin-[50px_155px]"
            />
            <circle cx="50" cy="155" r="4" fill="#ff2a85" />

            <circle cx="210" cy="155" r="16" fill="#100620" stroke="#00f0ff" strokeWidth="2.5" />
            <ellipse
              cx="210"
              cy="155"
              rx="34"
              ry="8"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="2"
              className="animate-[spin_0.2s_linear_infinite] origin-[210px_155px]"
            />
            <circle cx="210" cy="155" r="4" fill="#ff2a85" />

            <circle cx="40" cy="45" r="3" fill="#ff2a85" className="animate-ping" />
            <circle cx="220" cy="45" r="3" fill="#00f0ff" className="animate-ping" />
          </svg>
        </div>

        <div className="mt-1 flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#120824]/90 border border-[#00f0ff]/40 text-[10px] font-mono text-[#00f0ff] shadow-lg">
          <Crosshair className="w-3 h-3 text-[#ff2a85] animate-spin" />
          <span>AUTONOMOUS_PATROL // 28.7499° N</span>
        </div>
      </motion.div>

      {/* Free-Floating Feature Badges */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-center justify-center gap-2.5 text-[11px] font-mono pointer-events-auto">
        <div className="px-3.5 py-1.5 rounded-full bg-[#150a2c]/85 border border-[#00f0ff]/40 backdrop-blur-md flex items-center gap-2 text-white/90 shadow-lg">
          <Eye className="w-3.5 h-3.5 text-[#00f0ff]" />
          <span>Real-time CNN CV</span>
        </div>
        <div className="px-3.5 py-1.5 rounded-full bg-[#150a2c]/85 border border-[#ff2a85]/40 backdrop-blur-md flex items-center gap-2 text-white/90 shadow-lg">
          <Shield className="w-3.5 h-3.5 text-[#ff2a85]" />
          <span>mIoU: 0.6094 Off-Road</span>
        </div>
        <div className="px-3.5 py-1.5 rounded-full bg-[#150a2c]/85 border border-[#4ade80]/40 backdrop-blur-md flex items-center gap-2 text-white/90 shadow-lg">
          <Scan className="w-3.5 h-3.5 text-[#4ade80]" />
          <span>Multi-Target Track</span>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('components/retro-terminal-intro.tsx', retroTerminalCode, 'utf8');
fs.writeFileSync('components/interactive-dot-grid.tsx', dotGridCode, 'utf8');
fs.writeFileSync('app/globals.css', globalsCssCode, 'utf8');
fs.writeFileSync('app/page.tsx', pageCode, 'utf8');
fs.writeFileSync('components/navbar.tsx', navbarCode, 'utf8');
fs.writeFileSync('components/hero.tsx', heroCode, 'utf8');
fs.writeFileSync('components/about.tsx', aboutCode, 'utf8');
fs.writeFileSync('components/autonomous-drone.tsx', droneCode, 'utf8');

console.log('Successfully written retro terminal boot and updated theme colors!');
