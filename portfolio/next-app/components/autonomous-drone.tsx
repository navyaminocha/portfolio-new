'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AutonomousDrone() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setMousePos({
        x: (e.clientX - centerX) / 40,
        y: (e.clientY - centerY) / 40,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center select-none pointer-events-none">
      {/* Outer Telemetry HUD Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full border border-dashed border-[#7f8cf8]/25"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-8 rounded-full border border-dotted border-[#b9c2ff]/30"
      />

      {/* HUD Telemetry Target Brackets */}
      <div className="absolute top-2 left-2 font-mono text-[10px] text-[#7f8cf8] tracking-widest">
        [SYS://UAV_TENSOR_NODE]
      </div>
      <div className="absolute bottom-2 right-2 font-mono text-[10px] text-[#b9c2ff] tracking-widest">
        [LOCK: 38.24°N, 77.12°E]
      </div>

      {/* Floating 3D Drone Body */}
      <motion.div
        animate={{
          x: mousePos.x * 1.5,
          y: mousePos.y * 1.5 + Math.sin(Date.now() / 600) * 8,
          rotateX: -mousePos.y * 0.8,
          rotateY: mousePos.x * 0.8,
        }}
        transition={{ type: 'spring', damping: 15, stiffness: 120 }}
        className="relative w-64 h-64 flex items-center justify-center"
      >
        {/* Drone Center Chassis */}
        <div className="relative w-28 h-28 rounded-2xl bg-gradient-to-br from-[#12152d] via-[#0d0f20] to-[#060710] border-2 border-[#7f8cf8] shadow-[0_0_35px_rgba(127,140,248,0.45)] flex flex-col items-center justify-center p-2 z-20">
          <div className="w-12 h-12 rounded-full border border-[#b9c2ff] bg-[#7f8cf8]/20 flex items-center justify-center mb-1">
            <span className="w-3 h-3 rounded-full bg-[#b9c2ff] animate-ping" />
          </div>
          <span className="font-mono text-[9px] font-bold text-[#b9c2ff] tracking-wider">AI_NAV.v2</span>
          <span className="font-mono text-[8px] text-[#7f8cf8]">AUTONOMOUS</span>
        </div>

        {/* 4 Drone Carbon Arms */}
        {/* Top-Left */}
        <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-[#7f8cf8]/70 z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.3, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-3 -left-3 w-10 h-10 rounded-full border border-[#b9c2ff]/80 shadow-[0_0_12px_rgba(185,194,255,0.6)]"
          />
        </div>

        {/* Top-Right */}
        <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-[#7f8cf8]/70 z-10">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 0.3, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-3 -right-3 w-10 h-10 rounded-full border border-[#b9c2ff]/80 shadow-[0_0_12px_rgba(185,194,255,0.6)]"
          />
        </div>

        {/* Bottom-Left */}
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-[#7f8cf8]/70 z-10">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 0.3, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-3 -left-3 w-10 h-10 rounded-full border border-[#b9c2ff]/80 shadow-[0_0_12px_rgba(185,194,255,0.6)]"
          />
        </div>

        {/* Bottom-Right */}
        <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-[#7f8cf8]/70 z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.3, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full border border-[#b9c2ff]/80 shadow-[0_0_12px_rgba(185,194,255,0.6)]"
          />
        </div>

        {/* Scanning Laser Beam */}
        <motion.div
          animate={{ opacity: [0.2, 0.7, 0.2], scaleY: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -bottom-16 w-32 h-24 bg-gradient-to-b from-[#7f8cf8]/40 to-transparent blur-xs pointer-events-none"
          style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)' }}
        />
      </motion.div>
    </div>
  );
}
