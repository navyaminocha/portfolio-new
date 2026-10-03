'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

interface SwitchModeProps {
  className?: string;
  width?: number;
  height?: number;
}

export function SwitchMode({
  className = '',
  width = 68,
  height = 34,
}: SwitchModeProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || resolvedTheme === 'dark';

  const toggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const knobSize = height - 6;

  return (
    <button
      type="button"
      onClick={toggle}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle dark/light mode"
      style={{ width, height }}
      className={`relative inline-flex items-center rounded-full transition-colors duration-300 p-[3px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8acbc1] border ${
        isDark
          ? 'bg-[#11161a] border-white/15'
          : 'bg-[#e4ebf0] border-black/15'
      } ${className}`}
    >
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        <Sun
          className={`w-3.5 h-3.5 transition-opacity duration-200 ${
            isDark ? 'opacity-30 text-white' : 'opacity-90 text-amber-500'
          }`}
        />
        <Moon
          className={`w-3.5 h-3.5 transition-opacity duration-200 ${
            isDark ? 'opacity-90 text-[#8acbc1]' : 'opacity-30 text-slate-800'
          }`}
        />
      </div>

      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{
          width: knobSize,
          height: knobSize,
        }}
        className={`rounded-full flex items-center justify-center shadow-md z-10 ${
          isDark
            ? 'bg-[#1d272d] text-[#8acbc1] ml-auto border border-white/10'
            : 'bg-white text-amber-500 mr-auto border border-black/10'
        }`}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5" />
        ) : (
          <Sun className="w-3.5 h-3.5" />
        )}
      </motion.div>
    </button>
  );
}