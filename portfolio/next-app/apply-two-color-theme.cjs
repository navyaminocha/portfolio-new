const fs = require('fs');

// Two strict accent colors:
// Color 1 (Pastel Ice Blue): #bde6f6 (accent/glow: #9cd6f2)
// Color 2 (Pastel Lavender): #c99ee2 (accent/glow: #b687d6)
// Dark background: #0c071a, #130a27, #190e34

// 1. app/globals.css
const globalsCss = `@import "tailwindcss";
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
  --background: #0c071a;
  --foreground: #f4f0ff;
  --card: #140b2a;
  --card-foreground: #f4f0ff;
  --popover: #140b2a;
  --popover-foreground: #f4f0ff;
  --primary: #bde6f6;
  --primary-foreground: #0c071a;
  --secondary: #1d0f3d;
  --secondary-foreground: #f4f0ff;
  --muted: #180d34;
  --muted-foreground: #a69bbd;
  --accent: #c99ee2;
  --accent-foreground: #0c071a;
  --destructive: #c99ee2;
  --border: rgba(201, 158, 226, 0.22);
  --input: rgba(201, 158, 226, 0.28);
  --ring: #bde6f6;
  --radius: 0.75rem;
}

.dark {
  --background: #0c071a;
  --foreground: #f4f0ff;
  --card: #140b2a;
  --card-foreground: #f4f0ff;
  --popover: #140b2a;
  --popover-foreground: #f4f0ff;
  --primary: #bde6f6;
  --primary-foreground: #0c071a;
  --secondary: #1d0f3d;
  --secondary-foreground: #f4f0ff;
  --muted: #180d34;
  --muted-foreground: #a69bbd;
  --accent: #c99ee2;
  --accent-foreground: #0c071a;
  --destructive: #c99ee2;
  --border: rgba(201, 158, 226, 0.22);
  --input: rgba(201, 158, 226, 0.28);
  --ring: #bde6f6;
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-[#0c071a] text-[#f4f0ff];
  }
  html {
    scroll-behavior: smooth;
  }
}

/* Custom Scrollbar - 2-Color Theme */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #0c071a;
}
::-webkit-scrollbar-thumb {
  background: #25134c;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #c99ee2;
}
`;

// 2. components/interactive-dot-grid.tsx
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
            if (ratio < 0.5) {
              ctx.fillStyle = \`rgba(189, 230, 246, \${opacity})\`; // Pastel Ice Blue (#bde6f6)
            } else {
              ctx.fillStyle = \`rgba(201, 158, 226, \${opacity})\`; // Pastel Lavender (#c99ee2)
            }
          } else {
            ctx.fillStyle = \`rgba(201, 158, 226, \${Math.max(0.08, opacity * 0.32)})\`;
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

// 3. components/retro-terminal-intro.tsx (2 colors: #bde6f6 and #c99ee2)
const retroTerminalCode = `'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Radio, Zap, Play } from 'lucide-react';

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
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c071a] overflow-hidden cursor-pointer select-none"
          onClick={handleScreenClick}
        >
          {/* CRT Scanline Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.45)_51%)] bg-[length:100%_4px] pointer-events-none z-30" />

          {/* 2-Color Ambient Auras (#c99ee2 and #bde6f6) */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#c99ee2]/25 via-transparent to-transparent rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[650px] h-[650px] bg-gradient-to-bl from-[#bde6f6]/25 via-transparent to-transparent rounded-full blur-[150px] pointer-events-none" />

          {/* Main Retro Multi-Monitor Workstation Container */}
          <div className="relative w-full max-w-5xl px-4 sm:px-8 py-8 flex flex-col items-center justify-center z-20">
            {/* Top Retro HUD Bar */}
            <div className="w-full flex items-center justify-between mb-4 px-4 py-2 rounded-xl bg-[#140b2a]/85 border border-[#c99ee2]/35 backdrop-blur-md text-[11px] font-mono text-[#bde6f6] shadow-[0_0_20px_rgba(201,158,226,0.25)]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c99ee2] animate-ping" />
                <span className="font-bold text-white tracking-widest uppercase">
                  NAVYA_MINOCHA // WORKSTATION_v4.2
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="text-[#c99ee2] font-semibold">DTU CSE 8.7 CGPA</span>
                <span className="text-[#bde6f6] hidden sm:inline">JEE 99.46%ile</span>
                <span className="text-[#bde6f6]">STATUS: ONLINE</span>
              </div>
            </div>

            {/* 3-Monitor Retro Workstation Scene */}
            <div className="relative w-full aspect-[16/10] max-h-[580px] rounded-3xl overflow-hidden border-2 border-[#c99ee2]/45 shadow-[0_0_60px_rgba(201,158,226,0.35)] bg-[#0d071c] flex items-center justify-center group">
              {/* Background Pixel Workstation Art */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/retro-computer.png"
                  alt="Retro AI Workstation"
                  fill
                  sizes="100vw"
                  className="object-cover object-center filter saturate-110 contrast-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c071a]/85 via-transparent to-[#0c071a]/45" />
              </div>

              {/* Dynamic Interactive Terminal Code Overlay on the Center Screen */}
              <div className="relative z-10 w-[62%] sm:w-[50%] md:w-[42%] h-[56%] sm:h-[54%] p-3 sm:p-5 rounded-2xl bg-[#0e071e]/92 border border-[#c99ee2]/50 shadow-[inset_0_0_30px_rgba(201,158,226,0.4),0_0_40px_rgba(189,230,246,0.25)] backdrop-blur-xs flex flex-col justify-between overflow-hidden">
                {/* Screen Header */}
                <div className="flex items-center justify-between pb-1.5 border-b border-[#c99ee2]/30 text-[9px] sm:text-[10px] font-mono text-[#bde6f6]">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-[#c99ee2]" />
                    <span className="font-bold">terminal@navya-dtu:~</span>
                  </div>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#c99ee2]" />
                    <span className="w-2 h-2 rounded-full bg-[#bde6f6]" />
                    <span className="w-2 h-2 rounded-full bg-[#c99ee2]" />
                  </div>
                </div>

                {/* Animated Code / Terminal Output */}
                <div className="flex-1 my-2 font-mono text-[9px] sm:text-[11px] leading-relaxed text-[#c99ee2] overflow-hidden whitespace-pre-wrap select-none">
                  <span className="text-[#bde6f6]">def</span> <span className="text-[#c99ee2]">boot_portfolio</span>():
                  <br />
                  <span className="text-white/85">{typedText}</span>
                  <span className="inline-block w-2 h-3.5 bg-[#bde6f6] ml-1 animate-pulse align-middle" />
                </div>

                {/* Screen Click-To-Enter Button Overlay */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#c99ee2] via-[#bde6f6] to-[#c99ee2] text-[#0c071a] font-black text-[10px] sm:text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(189,230,246,0.5)] animate-pulse cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>CLICK OR TAP SCREEN TO ENTER</span>
                </motion.div>
              </div>

              {/* Floating 2-Color Telemetry Tags */}
              <div className="absolute top-6 left-6 hidden sm:flex flex-col gap-2 pointer-events-none">
                <div className="px-3 py-1.5 rounded-lg bg-[#140b2a]/90 border border-[#bde6f6]/40 text-[10px] font-mono text-[#bde6f6] backdrop-blur-md shadow-lg flex items-center gap-2">
                  <Radio className="w-3 h-3 text-[#bde6f6] animate-pulse" />
                  <span>CV_NAV // 28.7499° N</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-[#140b2a]/90 border border-[#c99ee2]/40 text-[10px] font-mono text-[#c99ee2] backdrop-blur-md shadow-lg">
                  <span>mIoU: 0.6094 · OFF-ROAD</span>
                </div>
              </div>

              <div className="absolute bottom-6 right-6 hidden sm:flex flex-col gap-2 items-end pointer-events-none">
                <div className="px-3 py-1.5 rounded-lg bg-[#140b2a]/90 border border-[#bde6f6]/40 text-[10px] font-mono text-[#bde6f6] backdrop-blur-md shadow-lg flex items-center gap-2">
                  <Zap className="w-3 h-3" />
                  <span>RAG_OPTIMIZATION // HCLTECH</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-[#140b2a]/90 border border-[#c99ee2]/40 text-[10px] font-mono text-[#c99ee2] backdrop-blur-md shadow-lg">
                  <span>DTU CSE · 8.7 CGPA</span>
                </div>
              </div>
            </div>

            {/* Bottom Helper Bar */}
            <div className="mt-4 flex items-center justify-center gap-3 text-xs font-mono text-[#c99ee2]">
              <span className="w-2 h-2 rounded-full bg-[#bde6f6] animate-ping" />
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

// 4. app/page.tsx (2-color atmospheric auras)
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
import { Monitor } from "lucide-react";

export default function Page() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0c071a] text-[#f4f0ff] selection:bg-[#c99ee2]/40 selection:text-[#bde6f6] overflow-x-hidden">
      {/* 1. Retro CRT Terminal Boot Entrance Gateway */}
      <RetroTerminalIntro isEntered={hasEntered} onEnter={() => setHasEntered(true)} />

      {/* 2. Global Seamless 2-Color Auras & Particle Canvas (#bde6f6 & #c99ee2) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top ambient pastel lavender aura */}
        <div className="absolute top-[3%] left-[18%] w-[700px] h-[600px] rounded-full bg-gradient-to-br from-[#c99ee2]/25 via-[#1d0f3d]/30 to-transparent blur-[140px]" />
        
        {/* Mid-page pastel ice blue nebula */}
        <div className="absolute top-[32%] right-[8%] w-[650px] h-[550px] rounded-full bg-gradient-to-bl from-[#bde6f6]/20 via-[#1d0f3d]/25 to-transparent blur-[150px]" />

        {/* Lower projects lavender aura */}
        <div className="absolute top-[62%] left-[12%] w-[600px] h-[550px] rounded-full bg-gradient-to-tr from-[#c99ee2]/22 via-[#1d0f3d]/20 to-transparent blur-[140px]" />

        {/* Bottom contact ice blue aura */}
        <div className="absolute bottom-[8%] right-[15%] w-[550px] h-[500px] rounded-full bg-gradient-to-tl from-[#bde6f6]/18 via-[#1d0f3d]/20 to-transparent blur-[130px]" />

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
          className="fixed bottom-6 right-6 z-40 px-4 py-2.5 rounded-full bg-[#140b2a]/90 border border-[#bde6f6]/40 hover:border-[#c99ee2] text-xs font-mono text-[#bde6f6] hover:text-white shadow-[0_0_25px_rgba(189,230,246,0.35)] backdrop-blur-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Return to Retro CRT Workstation"
        >
          <Monitor className="w-3.5 h-3.5 text-[#c99ee2] animate-pulse" />
          <span>CRT TERMINAL</span>
        </button>
      )}
    </div>
  );
}
`;

// 5. components/navbar.tsx (2 colors: #bde6f6 and #c99ee2)
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
            ? 'py-3 bg-[#0c071a]/85 backdrop-blur-xl border-b border-[#c99ee2]/25 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'py-5 bg-transparent'
        }\`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between max-w-7xl">
          {/* Logo with Circular NM 2-Color Gradient Badge */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#bde6f6] to-[#c99ee2] flex items-center justify-center text-[#0c071a] font-black text-xs tracking-tight shadow-[0_0_20px_rgba(189,230,246,0.5)] border border-white/30 group-hover:scale-110 transition-transform">
              NM
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-white group-hover:text-[#bde6f6] transition-colors">
                Navya Minocha
              </span>
              <span className="text-[10px] font-mono text-[#c99ee2] tracking-widest uppercase">
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
                className="px-3 py-1.5 rounded-full bg-[#180d34] border border-[#c99ee2]/35 hover:border-[#bde6f6] text-[11px] font-mono text-[#c99ee2] hover:text-[#bde6f6] flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Monitor className="w-3 h-3 text-[#bde6f6]" />
                <span>CRT OS</span>
              </button>
            )}

            <button
              onClick={() => scrollTo('contact')}
              className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#bde6f6] to-[#c99ee2] text-[#0c071a] font-bold shadow-[0_0_20px_rgba(189,230,246,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
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
            className="fixed inset-x-0 top-[72px] z-40 bg-[#0c071a]/95 backdrop-blur-2xl border-b border-[#c99ee2]/30 p-6 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {navTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollTo(tab.id)}
                  className="text-left py-2 text-sm font-mono uppercase tracking-wider text-white/80 hover:text-[#bde6f6] transition-colors"
                >
                  {tab.label}
                </button>
              ))}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                {onReopenTerminal && (
                  <button
                    onClick={onReopenTerminal}
                    className="px-3 py-1.5 rounded-full bg-[#180d34] border border-[#c99ee2]/40 text-xs font-mono text-[#bde6f6]"
                  >
                    CRT OS
                  </button>
                )}
                <button
                  onClick={() => scrollTo('contact')}
                  className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#bde6f6] to-[#c99ee2] text-[#0c071a] font-bold"
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

// 6. components/hero.tsx (2 colors: #bde6f6 and #c99ee2)
const heroCode = `'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AutonomousDrone } from './autonomous-drone';
import { ArrowDown, ArrowUpRight, Terminal } from 'lucide-react';

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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#140b2a]/90 border border-[#c99ee2]/35 backdrop-blur-md shadow-[0_0_20px_rgba(201,158,226,0.2)]">
              <span className="w-2 h-2 rounded-full bg-[#bde6f6] animate-ping" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#bde6f6] font-semibold">
                Navya Minocha · B.Tech CSE @ DTU
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[74px] font-black tracking-tighter text-[#f4f0ff] leading-[1.02] select-none">
              <span>Machine Learning</span>
              <span className="text-[#c99ee2]">.</span> <br />
              <span>Deep Learning</span>
              <span className="text-[#bde6f6]">.</span> <br />
              <span className="bg-gradient-to-r from-white via-[#bde6f6] to-[#c99ee2] bg-clip-text text-transparent">
                Generative AI
              </span>
              <span className="text-[#c99ee2]">.</span>
            </h1>

            <p className="text-base sm:text-lg text-white/75 max-w-xl font-normal leading-relaxed">
              Machine Learning & GenAI engineer exploring RAG architectures, computer vision, autonomous drone perception, and neurosymbolic systems.
              AI/GenAI Intern at <span className="text-white font-semibold">HCLTech</span> & Co-Head at{' '}
              <span className="text-white font-semibold">AIMS DTU</span>.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs font-mono text-white/70">
              <span className="px-3 py-1.5 rounded-md bg-[#180d34]/80 border border-[#c99ee2]/30">
                JEE Mains 99.46%ile
              </span>
              <span className="px-3 py-1.5 rounded-md bg-[#180d34]/80 border border-[#bde6f6]/30">
                CGPA 8.7 @ DTU
              </span>
              <span className="px-3 py-1.5 rounded-md bg-[#180d34]/80 border border-[#c99ee2]/30">
                SIH Decode Winner
              </span>
              <span className="px-3 py-1.5 rounded-md bg-[#180d34]/80 border border-white/10">
                DTU Football Vice-Captain
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() => scrollTo('projects')}
                className="group px-7 py-3.5 rounded-full bg-gradient-to-r from-[#bde6f6] to-[#c99ee2] text-[#0c071a] font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(189,230,246,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Selected Work</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={() => scrollTo('skills')}
                className="px-6 py-3.5 rounded-full bg-[#180d34]/85 hover:bg-[#221345] border border-[#c99ee2]/35 hover:border-[#bde6f6]/60 text-white font-medium text-sm tracking-wide backdrop-blur-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-[#bde6f6]" />
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
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#c99ee2]">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-[#bde6f6]" />
        </motion.div>
      </div>
    </section>
  );
}
`;

// 7. components/about.tsx (2 colors: #bde6f6 and #c99ee2)
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
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#bde6f6]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c99ee2]" />
            <span>01 // About & Research</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
            Creativity<span className="text-[#c99ee2]">.</span> Innovation<span className="text-[#bde6f6]">.</span> Impact<span className="text-[#c99ee2]">.</span>
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
            {/* Ambient Profile Glow (2-Colors) */}
            <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-[#c99ee2]/25 via-transparent to-[#bde6f6]/20 blur-3xl pointer-events-none" />

            <div className="relative group">
              {/* Decorative Tech Corner Accents */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[#bde6f6] rounded-tl-lg pointer-events-none z-20" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[#c99ee2] rounded-br-lg pointer-events-none z-20" />

              {/* Profile Image Container */}
              <div className="relative w-64 sm:w-72 h-80 sm:h-96 rounded-3xl overflow-hidden border border-[#c99ee2]/35 shadow-[0_0_40px_rgba(201,158,226,0.25)] bg-[#140b2a]/80 backdrop-blur-md">
                <Image
                  src="/profile.jpg"
                  alt="Navya Minocha"
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                {/* Subtle Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c071a] via-transparent to-transparent opacity-85" />

                {/* Bottom Floating Info Badge */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-[#110724]/90 border border-[#c99ee2]/30 backdrop-blur-md flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">Navya Minocha</span>
                    <span className="text-[10px] font-mono text-[#bde6f6]">B.Tech CSE @ DTU</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-[#bde6f6] bg-[#1d0f3d] px-2 py-0.5 rounded-full border border-[#bde6f6]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#bde6f6] animate-pulse" />
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
              <strong className="text-[#bde6f6]">8.7 CGPA</strong>, having secured a{' '}
              <strong className="text-[#c99ee2]">99.46 percentile in JEE Mains</strong>.
            </p>

            <p className="text-base text-white/70 leading-relaxed font-normal">
              My engineering focus lies in building scalable machine learning pipelines, multimodal models, and neurosymbolic systems.
              During my internship at <strong className="text-white">HCLTech</strong>, I worked on optimizing enterprise RAG architectures.
              As Co-Head of <strong className="text-white">AIMS DTU</strong>, I mentor peers in deep learning and AI development.
            </p>

            {/* Academic & Extracurricular Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#140b2a]/80 border border-[#c99ee2]/30 hover:border-[#bde6f6]/50 transition-all shadow-lg">
                <div className="flex items-center gap-2 text-[#bde6f6] mb-1">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase font-bold">DTU CSE</span>
                </div>
                <div className="text-2xl font-black text-white">8.7 CGPA</div>
                <div className="text-xs text-[#a69bbd] mt-0.5">Sem 1 · Delhi Tech Univ</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#140b2a]/80 border border-[#c99ee2]/30 hover:border-[#c99ee2]/60 transition-all shadow-lg">
                <div className="flex items-center gap-2 text-[#c99ee2] mb-1">
                  <Award className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase font-bold">JEE Mains</span>
                </div>
                <div className="text-2xl font-black text-white">99.46%ile</div>
                <div className="text-xs text-[#a69bbd] mt-0.5">12k Rank in Advanced</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#140b2a]/80 border border-[#c99ee2]/30 hover:border-[#bde6f6]/50 transition-all shadow-lg">
                <div className="flex items-center gap-2 text-[#bde6f6] mb-1">
                  <Trophy className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase font-bold">SIH Decode</span>
                </div>
                <div className="text-xl font-bold text-white">Winner</div>
                <div className="text-xs text-[#a69bbd] mt-0.5">Render Track @ IIIT Delhi</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#140b2a]/80 border border-[#c99ee2]/30 hover:border-[#c99ee2]/60 transition-all shadow-lg">
                <div className="flex items-center gap-2 text-[#c99ee2] mb-1">
                  <Code className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase font-bold">Sports</span>
                </div>
                <div className="text-xl font-bold text-white">Vice-Captain</div>
                <div className="text-xs text-[#a69bbd] mt-0.5">DTU Football · 2x Gold</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
`;

// 8. components/autonomous-drone.tsx (2 colors: #bde6f6 and #c99ee2)
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
      <div className="absolute top-0 left-0 right-0 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[#bde6f6] px-3 pointer-events-auto">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-[#bde6f6] animate-pulse" />
          <span className="font-bold text-white tracking-widest text-xs uppercase drop-shadow-[0_0_8px_rgba(189,230,246,0.8)]">
            DRONE_VISION // SYS_ONLINE
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-white/80">
            ALT: <strong className="text-[#c99ee2]">{telemetry.altitude}</strong>
          </span>
          <span className="text-white/80">
            FPS: <strong className="text-[#bde6f6]">{telemetry.fps}</strong>
          </span>
          <span className="text-white/80 hidden sm:inline">
            CONF: <strong className="text-[#c99ee2]">{telemetry.confidence}</strong>
          </span>
        </div>
      </div>

      {/* Dynamic Laser Scanning Cone & Radar Reticles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[360px] h-[360px] rounded-full bg-gradient-to-r from-[#c99ee2]/20 via-transparent to-[#bde6f6]/20 blur-3xl animate-pulse" />
        <div className="absolute w-72 h-72 rounded-full border border-[#bde6f6]/25 border-dashed animate-[spin_40s_linear_infinite]" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-[#c99ee2]/20 animate-[spin_70s_linear_infinite_reverse]" />
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
          className="absolute z-10 pointer-events-none flex flex-col justify-between p-2 rounded-lg border border-[#bde6f6]/70 bg-[#bde6f6]/10 backdrop-blur-xs shadow-[0_0_18px_rgba(189,230,246,0.35)]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-[#bde6f6] bg-[#0d071c]/90 px-1.5 py-0.5 rounded shadow">
              {t.id}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#c99ee2] animate-ping" />
          </div>
          <div className="flex items-center justify-between text-[8px] font-mono text-[#c99ee2]">
            <Scan className="w-3 h-3 text-[#bde6f6]" />
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
        <div className="relative w-64 h-48 filter drop-shadow-[0_20px_35px_rgba(189,230,246,0.4)]">
          <svg viewBox="0 0 260 200" className="w-full h-full">
            <path
              d="M 50 45 L 130 100 L 210 45 M 50 155 L 130 100 L 210 155"
              stroke="#bde6f6"
              strokeWidth="5"
              strokeLinecap="round"
              strokeOpacity="0.9"
            />
            <path
              d="M 30 100 L 230 100"
              stroke="#c99ee2"
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
              fill="#140b2a"
              stroke="#bde6f6"
              strokeWidth="2.5"
            />
            <circle cx="130" cy="95" r="12" fill="#1d0f3d" stroke="#c99ee2" strokeWidth="2" />
            <circle cx="130" cy="95" r="5" fill="#c99ee2" className="animate-pulse" />
            <circle cx="130" cy="115" r="7" fill="#000" stroke="#bde6f6" strokeWidth="2" />
            <circle cx="130" cy="115" r="3" fill="#bde6f6" />

            <circle cx="50" cy="45" r="16" fill="#100620" stroke="#bde6f6" strokeWidth="2.5" />
            <ellipse
              cx="50"
              cy="45"
              rx="34"
              ry="8"
              fill="none"
              stroke="#bde6f6"
              strokeWidth="2"
              className="animate-[spin_0.2s_linear_infinite] origin-[50px_45px]"
            />
            <circle cx="50" cy="45" r="4" fill="#c99ee2" />

            <circle cx="210" cy="45" r="16" fill="#100620" stroke="#bde6f6" strokeWidth="2.5" />
            <ellipse
              cx="210"
              cy="45"
              rx="34"
              ry="8"
              fill="none"
              stroke="#bde6f6"
              strokeWidth="2"
              className="animate-[spin_0.2s_linear_infinite] origin-[210px_45px]"
            />
            <circle cx="210" cy="45" r="4" fill="#c99ee2" />

            <circle cx="50" cy="155" r="16" fill="#100620" stroke="#bde6f6" strokeWidth="2.5" />
            <ellipse
              cx="50"
              cy="155"
              rx="34"
              ry="8"
              fill="none"
              stroke="#bde6f6"
              strokeWidth="2"
              className="animate-[spin_0.2s_linear_infinite] origin-[50px_155px]"
            />
            <circle cx="50" cy="155" r="4" fill="#c99ee2" />

            <circle cx="210" cy="155" r="16" fill="#100620" stroke="#bde6f6" strokeWidth="2.5" />
            <ellipse
              cx="210"
              cy="155"
              rx="34"
              ry="8"
              fill="none"
              stroke="#bde6f6"
              strokeWidth="2"
              className="animate-[spin_0.2s_linear_infinite] origin-[210px_155px]"
            />
            <circle cx="210" cy="155" r="4" fill="#c99ee2" />

            <circle cx="40" cy="45" r="3" fill="#c99ee2" className="animate-ping" />
            <circle cx="220" cy="45" r="3" fill="#bde6f6" className="animate-ping" />
          </svg>
        </div>

        <div className="mt-1 flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#120824]/90 border border-[#bde6f6]/40 text-[10px] font-mono text-[#bde6f6] shadow-lg">
          <Crosshair className="w-3 h-3 text-[#c99ee2] animate-spin" />
          <span>AUTONOMOUS_PATROL // 28.7499° N</span>
        </div>
      </motion.div>

      {/* Free-Floating Feature Badges */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-center justify-center gap-2.5 text-[11px] font-mono pointer-events-auto">
        <div className="px-3.5 py-1.5 rounded-full bg-[#140b2a]/85 border border-[#bde6f6]/40 backdrop-blur-md flex items-center gap-2 text-white/90 shadow-lg">
          <Eye className="w-3.5 h-3.5 text-[#bde6f6]" />
          <span>Real-time CNN CV</span>
        </div>
        <div className="px-3.5 py-1.5 rounded-full bg-[#140b2a]/85 border border-[#c99ee2]/40 backdrop-blur-md flex items-center gap-2 text-white/90 shadow-lg">
          <Shield className="w-3.5 h-3.5 text-[#c99ee2]" />
          <span>mIoU: 0.6094 Off-Road</span>
        </div>
        <div className="px-3.5 py-1.5 rounded-full bg-[#140b2a]/85 border border-[#bde6f6]/40 backdrop-blur-md flex items-center gap-2 text-white/90 shadow-lg">
          <Scan className="w-3.5 h-3.5 text-[#bde6f6]" />
          <span>Multi-Target Track</span>
        </div>
      </div>
    </div>
  );
}
`;

// 9. components/education.tsx
const educationCode = `'use client';

import React from 'react';
import { motion } from 'framer-motion';

const educationData = [
  {
    institution: 'Delhi Technological University (formerly DCE)',
    degree: 'B.Tech in Computer Science and Engineering',
    score: '8.7 CGPA (Semester 1)',
    period: '2025 - Present (2nd Year)',
    details: 'Focusing on Machine Learning, Deep Learning, Data Structures, and Computer Vision.',
    highlight: '8.7 CGPA',
  },
  {
    institution: 'Joint Entrance Examination (JEE)',
    degree: 'JEE Mains & JEE Advanced 2025',
    score: '99.46 Percentile',
    period: '2025',
    details: 'Secured 99.46%ile in JEE Mains and All India Rank 12,000 in JEE Advanced out of 1.4+ million candidates.',
    highlight: '99.46%ile · Top 0.5%',
  },
  {
    institution: 'Sardar Patel Vidyalaya, New Delhi',
    degree: 'CBSE Class XII (Senior Secondary)',
    score: '97.0%',
    period: '2025',
    details: 'Physics, Chemistry, Mathematics, Computer Science. Academic excellence with top honors.',
    highlight: '97.0%',
  },
  {
    institution: 'Sardar Patel Vidyalaya, New Delhi',
    degree: 'CBSE Class X (Secondary)',
    score: '96.8%',
    period: '2023',
    details: 'Excellence in Science and Mathematics foundation with outstanding scholastic performance.',
    highlight: '96.8%',
  },
];

export function Education() {
  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        <div className="mb-14">
          <p className="text-xs font-mono uppercase tracking-widest text-[#bde6f6] mb-3">
            02 // Academic Track
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Education<span className="text-[#c99ee2]">.</span> Foundation<span className="text-[#bde6f6]">.</span> Growth<span className="text-[#c99ee2]">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-6 rounded-2xl bg-[#140b2a]/85 border border-[#c99ee2]/30 hover:border-[#bde6f6]/60 shadow-[0_0_25px_rgba(201,158,226,0.15)] backdrop-blur-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#1d0f3d] border border-[#c99ee2]/40 text-[#c99ee2]">
                    0{index + 1}
                  </span>
                  <span className="text-xs font-mono text-[#bde6f6] font-semibold">
                    {item.period}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{item.institution}</h3>
                <p className="text-sm font-medium text-[#bde6f6] mb-3">{item.degree}</p>
                <p className="text-xs text-[#a69bbd] leading-relaxed mb-4">{item.details}</p>
              </div>

              <div className="pt-4 border-t border-[#c99ee2]/20 flex items-center justify-between">
                <span className="text-xs font-mono text-white/50">Score / Grade</span>
                <span className="text-sm font-mono font-bold text-[#c99ee2] bg-[#c99ee2]/10 px-2.5 py-1 rounded-md border border-[#c99ee2]/30">
                  {item.highlight}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
`;

// 10. components/skills.tsx
const skillsCode = `'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Cpu, Wrench } from 'lucide-react';

const skillCategories = [
  {
    category: 'Languages',
    icon: <Code className="w-5 h-5 text-[#bde6f6]" />,
    skills: ['C', 'C++', 'Python', 'JavaScript', 'SQL'],
  },
  {
    category: 'ML / AI & Frameworks',
    icon: <Cpu className="w-5 h-5 text-[#c99ee2]" />,
    skills: [
      'Machine Learning',
      'Deep Learning',
      'Computer Vision',
      'NLP',
      'RAG Pipelines',
      'Generative AI',
      'Logic Tensor Networks',
      'PyTorch',
      'TensorFlow',
      'Scikit-learn',
      'OpenCV',
      'LangChain',
      'LangGraph',
      'FastAPI',
      'React',
    ],
  },
  {
    category: 'Developer Tools & Platforms',
    icon: <Wrench className="w-5 h-5 text-[#bde6f6]" />,
    skills: ['Git', 'GitHub', 'VS Code', 'Docker', 'Streamlit', 'ChromaDB', 'PostgreSQL', 'PostGIS'],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        <div className="mb-14">
          <p className="text-xs font-mono uppercase tracking-widest text-[#bde6f6] mb-3">
            03 // Tech Stack
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Technical Arsenal<span className="text-[#c99ee2]">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-[#140b2a]/85 border border-[#c99ee2]/30 hover:border-[#bde6f6]/50 shadow-[0_0_25px_rgba(201,158,226,0.15)] backdrop-blur-md transition-all flex flex-col"
            >
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-[#c99ee2]/20">
                <div className="p-2.5 rounded-xl bg-[#1d0f3d] border border-[#c99ee2]/40 shadow-inner">
                  {cat.icon}
                </div>
                <h3 className="text-base font-bold text-white">{cat.category}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono text-white/90 bg-[#1d0f3d]/70 border border-[#c99ee2]/30 hover:border-[#bde6f6] hover:text-[#bde6f6] transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
`;

// 11. components/projects.tsx
const projectsCode = `'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RadialCarousel, ProjectItem } from './radial-carousel';
import { Orbit, LayoutGrid } from 'lucide-react';

const resumeProjects: ProjectItem[] = [
  {
    id: 1,
    title: 'Gesture-Based Desktop Control System',
    type: 'Desktop App · Computer Vision',
    url: '/images/projects/gesture-control.png',
    description:
      'Built a real-time computer vision application using MediaPipe, OpenCV and CNNs to recognize static and dynamic hand gestures and control common desktop operations hands-free.',
    tags: ['MediaPipe', 'OpenCV', 'CNNs', 'Computer Vision'],
  },
  {
    id: 2,
    title: 'Digital Twin of a Scientist',
    type: 'RAG Chatbot · Generative AI',
    url: '/images/projects/digital-twin.png',
    description:
      'Created a chatbot on a RAG pipeline with ChromaDB and HuggingFace embeddings with long-term memory, temporal awareness, voice interaction to simulate personalized conversations and the scientist’s knowledge.',
    tags: ['RAG Pipeline', 'ChromaDB', 'HuggingFace', 'Voice Interaction'],
  },
  {
    id: 3,
    title: 'Neurosymbolic Biomass Prediction',
    type: 'Logic Tensor Networks · Multimodal',
    url: '/images/projects/biomass-prediction.png',
    description:
      'Developed a multimodal model combining image and metadata features using MobileNetV2 and EfficientNet-B0, with LTN-inspired soft logic constraints for biologically consistent predictions.',
    tags: ['MobileNetV2', 'EfficientNet-B0', 'Logic Tensor Networks', 'PyTorch'],
  },
  {
    id: 4,
    title: 'Semantic Segmentation for Off-Road Navigation',
    type: 'Deep Learning · Autonomous Systems',
    url: '/images/projects/semantic-segmentation.png',
    description:
      'Developed a semantic segmentation model for autonomous off-road navigation, achieving a mean IoU of 0.6094 and mAP50 of 0.60 across challenging desert environments with varying terrain conditions.',
    tags: ['Semantic Segmentation', 'mIoU 0.6094', 'mAP50 0.60', 'Autonomous Driving'],
  },
  {
    id: 5,
    title: 'VoiceSplit AI',
    type: 'Multi-Speaker Speech Separation · Audio ML',
    url: '/images/projects/voicesplit.png',
    description:
      'Built an end-to-end deep learning pipeline using fine-tuned DPRNN, VAD, SI-SDR based track pruning, and WOLA to automatically separate and enhance up to five overlapping speakers in noisy real-world audio.',
    tags: ['DPRNN', 'SI-SDR', 'Speech Processing', 'VAD'],
  },
  {
    id: 6,
    title: 'VeriGrid: Crowd-Verified Geospatial Platform',
    type: 'Full Stack App · Spatial Analytics',
    url: '/images/projects/verigrid.png',
    description:
      'Built a crowdsourced geospatial verification platform using FastAPI, PostgreSQL/PostGIS, and DBSCAN to aggregate citizen reports, verify spatial claims, and identify hazard clusters in real time.',
    tags: ['FastAPI', 'PostgreSQL', 'PostGIS', 'DBSCAN Spatial Clustering'],
  },
];

export function Projects() {
  const [viewMode, setViewMode] = useState<'radial' | 'grid'>('radial');

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-[#bde6f6] mb-3">
              04 // Selected Work
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Engineered for Impact<span className="text-[#c99ee2]">.</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 p-1 rounded-full bg-[#140b2a]/85 border border-[#c99ee2]/30 backdrop-blur-md shadow-lg">
            <button
              onClick={() => setViewMode('radial')}
              className={\`px-4 py-1.5 rounded-full text-xs font-mono flex items-center gap-2 transition-all cursor-pointer \${
                viewMode === 'radial'
                  ? 'bg-gradient-to-r from-[#bde6f6] to-[#c99ee2] text-[#0c071a] font-bold shadow-[0_0_15px_rgba(189,230,246,0.4)]'
                  : 'text-white/60 hover:text-white'
              }\`}
            >
              <Orbit className="w-3.5 h-3.5" />
              <span>Orbit View</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={\`px-4 py-1.5 rounded-full text-xs font-mono flex items-center gap-2 transition-all cursor-pointer \${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-[#c99ee2] to-[#bde6f6] text-[#0c071a] font-bold shadow-[0_0_15px_rgba(201,158,226,0.4)]'
                  : 'text-white/60 hover:text-white'
              }\`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
          </div>
        </div>

        {viewMode === 'radial' ? (
          <div className="w-full">
            <RadialCarousel items={resumeProjects} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumeProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="p-6 rounded-2xl bg-[#140b2a]/85 border border-[#c99ee2]/30 hover:border-[#bde6f6]/50 shadow-[0_0_25px_rgba(201,158,226,0.15)] backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-[#bde6f6] font-bold">
                      0{index + 1}
                    </span>
                    <span className="text-[11px] font-mono text-[#c99ee2] font-semibold">
                      {project.type.split('·')[0]}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-xs text-[#a69bbd] leading-relaxed mb-4">{project.description}</p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#c99ee2]/20">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono text-[#c99ee2] bg-[#1d0f3d]/60 border border-[#c99ee2]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
`;

// 12. components/experience.tsx
const experienceCode = `'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Trophy, Award, Users } from 'lucide-react';

const experiences = [
  {
    role: 'AI / GenAI Intern',
    organization: 'HCLTech',
    period: 'June 2026 - July 2026',
    description:
      'Evaluated and optimized RAG pipelines using Precision@K, Recall@K, MRR, NDCG, faithfulness, and context relevance. Worked across vector search, retrieval, reranking, and LLM-based response generation.',
    highlight: 'RAG & Vector Search Optimization',
    icon: <Briefcase className="w-5 h-5 text-[#bde6f6]" />,
  },
  {
    role: 'Winner - Render Track (Nagrik AI)',
    organization: 'SIH Decode @ IIIT Delhi',
    period: 'September 2026',
    description:
      'Built Nagrik AI, a citizen-facing AI assistant tackling civic grievance routing and spatial verification, winning the Render Track at SIH Decode.',
    highlight: '1st Place Hackathon Award',
    icon: <Trophy className="w-5 h-5 text-[#c99ee2]" />,
  },
  {
    role: 'Co-Head',
    organization: 'AIMS DTU (Artificial Intelligence & Machine Learning Society)',
    period: '2025 - Present',
    description:
      'Leading the official AI/ML Society of Delhi Technological University. Organizing workshops, hackathons, and research mentorship for 500+ student engineers.',
    highlight: 'Technical Leadership & Mentorship',
    icon: <Users className="w-5 h-5 text-[#bde6f6]" />,
  },
  {
    role: 'Vice-Captain',
    organization: 'DTU Football Team',
    period: '2025 - Present',
    description:
      'Gold Medalist at IIT BHU Sports Fest (2025) and Arena DTU (2025). Anchoring varsity defense and tournament tactical preparations.',
    highlight: '2x Gold Medalist',
    icon: <Award className="w-5 h-5 text-[#c99ee2]" />,
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        <div className="mb-14">
          <p className="text-xs font-mono uppercase tracking-widest text-[#bde6f6] mb-3">
            05 // Trajectory & Leadership
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Experience & Milestones<span className="text-[#c99ee2]">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-6 rounded-2xl bg-[#140b2a]/85 border border-[#c99ee2]/30 hover:border-[#bde6f6]/50 shadow-[0_0_25px_rgba(201,158,226,0.15)] backdrop-blur-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-[#1d0f3d] border border-[#c99ee2]/40 shadow-inner">
                    {exp.icon}
                  </div>
                  <span className="text-xs font-mono text-[#bde6f6] font-semibold">
                    {exp.period}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{exp.role}</h3>
                <p className="text-sm font-medium text-[#bde6f6] mb-3">{exp.organization}</p>
                <p className="text-xs text-[#a69bbd] leading-relaxed mb-4">{exp.description}</p>
              </div>

              <div className="pt-3 border-t border-[#c99ee2]/20 flex items-center justify-between">
                <span className="text-xs font-mono text-white/50">Core Impact</span>
                <span className="text-xs font-mono font-bold text-[#c99ee2] bg-[#1d0f3d] px-2.5 py-1 rounded-md border border-[#c99ee2]/30">
                  {exp.highlight}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
`;

// 13. components/contact.tsx
const contactCode = `'use client';

import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

function GithubIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function LinkedinIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

function LeetcodeIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 4.818 3.655 5.928 5.928 0 0 0 3.328-.73 5.875 5.875 0 0 0 2.062-2.148l4.088-6.195a1.37 1.37 0 0 0-.28-1.897 1.376 1.376 0 0 0-1.921.28l-3.79 5.742a3.14 3.14 0 0 1-1.103 1.147 3.167 3.167 0 0 1-1.777.39 3.18 3.18 0 0 1-2.576-1.956 3.138 3.138 0 0 1-.033-1.264 3.104 3.104 0 0 1 .65-1.127l3.704-3.965 5.09-5.46A1.373 1.373 0 0 0 13.483 0z"/>
    </svg>
  );
}

export function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#140b2a]/85 border border-[#c99ee2]/35 shadow-[0_0_50px_rgba(201,158,226,0.2)] backdrop-blur-xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-xs font-mono uppercase tracking-widest text-[#bde6f6] mb-3">
              06 // Connect
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Let&apos;s Build Something <span className="text-[#c99ee2]">Extraordinary</span>.
            </h2>
            <p className="text-sm text-[#a69bbd]">
              Open for Machine Learning, Computer Vision, and Generative AI research collaborations & engineering roles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <a
              href="mailto:minochanavya08@gmail.com"
              className="p-4 rounded-2xl bg-[#1d0f3d]/70 border border-[#c99ee2]/30 hover:border-[#bde6f6] transition-all flex flex-col items-center text-center group"
            >
              <Mail className="w-6 h-6 text-[#bde6f6] mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-mono text-white/50 mb-1">Email</span>
              <span className="text-xs font-bold text-white group-hover:text-[#bde6f6] transition-colors truncate max-w-full">
                minochanavya08@gmail.com
              </span>
            </a>

            <a
              href="tel:+919911021777"
              className="p-4 rounded-2xl bg-[#1d0f3d]/70 border border-[#c99ee2]/30 hover:border-[#c99ee2] transition-all flex flex-col items-center text-center group"
            >
              <Phone className="w-6 h-6 text-[#c99ee2] mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-mono text-white/50 mb-1">Phone</span>
              <span className="text-xs font-bold text-white group-hover:text-[#c99ee2] transition-colors">
                +91 9911021777
              </span>
            </a>

            <div className="p-4 rounded-2xl bg-[#1d0f3d]/70 border border-[#c99ee2]/30 flex flex-col items-center text-center">
              <MapPin className="w-6 h-6 text-[#bde6f6] mb-2" />
              <span className="text-xs font-mono text-white/50 mb-1">Location</span>
              <span className="text-xs font-bold text-white">New Delhi, India</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-[#c99ee2]/20">
            <a
              href="https://linkedin.com/in/navyaminocha"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#1d0f3d] border border-[#c99ee2]/40 hover:border-[#bde6f6] text-xs font-mono text-white hover:text-[#bde6f6] flex items-center gap-2 transition-all hover:scale-105 shadow-md"
            >
              <LinkedinIcon size={16} />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/NavyaMinocha"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#1d0f3d] border border-[#c99ee2]/40 hover:border-[#c99ee2] text-xs font-mono text-white hover:text-[#c99ee2] flex items-center gap-2 transition-all hover:scale-105 shadow-md"
            >
              <GithubIcon size={16} />
              <span>GitHub</span>
            </a>

            <a
              href="https://leetcode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#1d0f3d] border border-[#c99ee2]/40 hover:border-[#bde6f6] text-xs font-mono text-white hover:text-[#bde6f6] flex items-center gap-2 transition-all hover:scale-105 shadow-md"
            >
              <LeetcodeIcon size={16} />
              <span>LeetCode</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
`;

// 14. components/footer.tsx
const footerCode = `'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="py-8 border-t border-[#c99ee2]/20 bg-[#0c071a]/90 backdrop-blur-xl relative z-20">
      <div className="container mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#a69bbd]">
        <p>© 2026 Navya Minocha · B.Tech CSE @ Delhi Technological University</p>
        <p className="text-[#bde6f6]">AI / ML · Computer Vision · Generative AI</p>
      </div>
    </footer>
  );
}
`;

fs.writeFileSync('app/globals.css', globalsCss, 'utf8');
fs.writeFileSync('components/interactive-dot-grid.tsx', dotGridCode, 'utf8');
fs.writeFileSync('components/retro-terminal-intro.tsx', retroTerminalCode, 'utf8');
fs.writeFileSync('app/page.tsx', pageCode, 'utf8');
fs.writeFileSync('components/navbar.tsx', navbarCode, 'utf8');
fs.writeFileSync('components/hero.tsx', heroCode, 'utf8');
fs.writeFileSync('components/about.tsx', aboutCode, 'utf8');
fs.writeFileSync('components/autonomous-drone.tsx', droneCode, 'utf8');
fs.writeFileSync('components/education.tsx', educationCode, 'utf8');
fs.writeFileSync('components/skills.tsx', skillsCode, 'utf8');
fs.writeFileSync('components/projects.tsx', projectsCode, 'utf8');
fs.writeFileSync('components/experience.tsx', experienceCode, 'utf8');
fs.writeFileSync('components/contact.tsx', contactCode, 'utf8');
fs.writeFileSync('components/footer.tsx', footerCode, 'utf8');

console.log('Successfully applied STRICT 2-Color Theme (#bde6f6 & #c99ee2) across all files!');
