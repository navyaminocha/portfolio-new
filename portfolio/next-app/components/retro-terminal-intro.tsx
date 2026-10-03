'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Power, X, ArrowRight } from 'lucide-react';

interface RetroTerminalIntroProps {
  onComplete: () => void;
}

export default function RetroTerminalIntro({ onComplete }: RetroTerminalIntroProps) {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const fullCode = `>>> INITIALIZING NAVYA_MINOCHA_OS [v2.6.4]...
>>> DTU CSE DEPT // AI & ML SPECIALIZATION
>>> ACADEMICS: 8.7 CGPA | 99.46%ile JEE MAINS
>>> SYSTEM MODULES: DL, CV, RAG, LTN, AUTONOMOUS DRONE
>>> PORTFOLIO ENVIRONMENT READY. ENTERING MAIN INTERFACE...`;

  useEffect(() => {
    if (terminalOpen && textIndex < fullCode.length) {
      const timeout = setTimeout(() => {
        setTextIndex((prev) => prev + 1);
      }, 10);
      return () => clearTimeout(timeout);
    }
  }, [terminalOpen, textIndex, fullCode.length]);

  const handleTapComputer = () => {
    if (isExiting) return;
    setTerminalOpen(true);
  };

  const handleEnterPortfolio = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] w-screen h-screen bg-[#060710] flex items-center justify-center select-none overflow-hidden"
    >
      {/* 16:9 Master Workstation Background: Fills Screen Completely */}
      <img
        src="/retro-workstation-full.png"
        alt="Retro Computer Workstation"
        onClick={handleTapComputer}
        className="absolute inset-0 w-full h-full object-cover object-center filter contrast-110 brightness-100 cursor-pointer"
      />

      {/* Atmospheric CRT Scanline & Phosphor Overlay */}
      <div className="absolute inset-0 crt-scanlines opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#060710]/15 to-[#060710]/60 pointer-events-none" />

      {/* Top Floating Cyber Header Bar */}
      <div className="absolute top-4 left-6 right-6 flex items-center justify-between font-mono text-xs text-[#b9c2ff] pointer-events-none z-10">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#060710]/85 backdrop-blur-md border border-[#7f8cf8]/40 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#b9c2ff] animate-ping" />
          <span className="font-bold">CRT HUD OS // NAVYA MINOCHA</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#060710]/85 backdrop-blur-md border border-[#7f8cf8]/40 shadow-lg text-[11px] text-[#707cb8]">
          <span>FREQ: 38.24 MHz</span>
          <span>|</span>
          <span className="text-[#b9c2ff]">DTU.AI.CORE.ONLINE</span>
        </div>
      </div>

      {/* Terminal Modal Window (Opens when computer is tapped) */}
      <AnimatePresence>
        {terminalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative z-30 max-w-xl w-[90%] sm:w-[80%] md:w-[600px] rounded-2xl bg-[#060710]/95 backdrop-blur-xl border-2 border-[#b9c2ff] shadow-[0_0_60px_rgba(127,140,248,0.5)] overflow-hidden font-mono text-xs text-[#b9c2ff] flex flex-col"
          >
            {/* Terminal Title Bar */}
            <div className="h-9 bg-[#12152d] border-b border-[#7f8cf8]/40 flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7f8cf8] animate-pulse" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#b9c2ff]/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#5661b3]" />
                <span className="font-bold text-[#b9c2ff] ml-1 text-[11px]">
                  SYS://TERMINAL.OS
                </span>
              </div>
              <button
                onClick={handleEnterPortfolio}
                className="p-1 rounded hover:bg-[#7f8cf8]/20 text-[#707cb8] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Terminal Body with Live Typing */}
            <div className="p-5 space-y-4 leading-relaxed">
              <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm text-[#b9c2ff] leading-relaxed">
                {fullCode.slice(0, textIndex)}
                {textIndex < fullCode.length && (
                  <span className="inline-block w-2 h-4 bg-[#7f8cf8] animate-pulse align-middle ml-1" />
                )}
              </pre>

              {/* Action Button */}
              <div className="pt-3 border-t border-[#7f8cf8]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[10px] text-[#707cb8]">
                  <span className="w-2 h-2 rounded-full bg-[#b9c2ff] animate-ping" />
                  <span>ALL SYSTEMS READY</span>
                </div>
                <button
                  onClick={handleEnterPortfolio}
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#7f8cf8] text-[#060710] font-mono text-xs font-bold tracking-wider hover:bg-[#b9c2ff] hover:shadow-[0_0_25px_rgba(185,194,255,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer uppercase"
                >
                  <span>ENTER PORTFOLIO</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Idle Tap Prompt (Visible before terminal opens) */}
      {!terminalOpen && (
        <motion.div
          animate={{ y: [0, -6, 0], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          onClick={handleTapComputer}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-[#060710]/90 backdrop-blur-md border-2 border-[#b9c2ff] shadow-[0_0_35px_rgba(185,194,255,0.5)] flex items-center gap-3 cursor-pointer group hover:bg-[#12152d] z-20"
        >
          <Power className="w-4 h-4 text-[#b9c2ff] animate-pulse" />
          <span className="font-mono text-xs sm:text-sm font-bold text-[#b9c2ff] tracking-wider uppercase group-hover:text-white transition-colors">
            TAP COMPUTER TO OPEN TERMINAL ➔
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
