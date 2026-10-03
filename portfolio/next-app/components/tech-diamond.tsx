'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TechItem {
  name: string;
  category: string;
  icon: string;
  color?: string;
}

export function TechDiamond() {
  const [hovered, setHovered] = useState<string | null>(null);

  const techGrid: { item: TechItem; row: number; col: number }[] = [
    { item: { name: 'PyTorch', category: 'Deep Learning', color: '#EE4C2C', icon: '🔥' }, row: 0, col: 2 },
    { item: { name: 'TensorFlow', category: 'ML & Neural Nets', color: '#FF6F00', icon: '⚡' }, row: 1, col: 1 },
    { item: { name: 'LangChain', category: 'GenAI & Agents', color: '#8acbc1', icon: '🦜' }, row: 1, col: 2 },
    { item: { name: 'OpenCV', category: 'Computer Vision', color: '#5C3EE8', icon: '👁️' }, row: 1, col: 3 },
    { item: { name: 'MediaPipe', category: 'Gesture & Vision', color: '#00A67E', icon: '🖐️' }, row: 2, col: 0 },
    { item: { name: 'FastAPI', category: 'Backend & APIs', color: '#05998B', icon: '🚀' }, row: 2, col: 1 },
    { item: { name: 'Python', category: 'Primary Language', color: '#3776AB', icon: '🐍' }, row: 2, col: 2 },
    { item: { name: 'LangGraph', category: 'Multi-Agent RAG', color: '#dbb057', icon: '🕸️' }, row: 2, col: 3 },
    { item: { name: 'Docker', category: 'Containerization', color: '#2496ED', icon: '🐳' }, row: 2, col: 4 },
    { item: { name: 'Scikit-Learn', category: 'Machine Learning', color: '#F7931E', icon: '📊' }, row: 3, col: 1 },
    { item: { name: 'PostgreSQL', category: 'PostGIS / DB', color: '#4169E1', icon: '🐘' }, row: 3, col: 2 },
    { item: { name: 'React', category: 'Frontend UI', color: '#61DAFB', icon: '⚛️' }, row: 3, col: 3 },
    { item: { name: 'Streamlit', category: 'AI Dashboards', color: '#FF4B4B', icon: '👑' }, row: 4, col: 2 },
  ];

  return (
    <div className="relative py-8 flex flex-col items-center justify-center">
      <div className="absolute w-72 h-72 rounded-full bg-[#8acbc1]/10 blur-[90px] pointer-events-none" />

      <div className="relative flex flex-col items-center gap-3 md:gap-4 select-none">
        {[0, 1, 2, 3, 4].map((rowIndex) => {
          const rowItems = techGrid.filter((t) => t.row === rowIndex);
          return (
            <div key={rowIndex} className="flex items-center justify-center gap-3 md:gap-4">
              {rowItems.map(({ item }) => {
                const isHovered = hovered === item.name;
                return (
                  <motion.div
                    key={item.name}
                    onMouseEnter={() => setHovered(item.name)}
                    onMouseLeave={() => setHovered(null)}
                    whileHover={{ scale: 1.15, zIndex: 30 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="relative group cursor-pointer"
                  >
                    <div
                      className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl flex items-center justify-center text-xl md:text-2xl transition-all duration-300 border ${
                        isHovered
                          ? 'bg-[#18262e] border-[#8acbc1] shadow-[0_0_25px_rgba(138,203,193,0.4)] ring-2 ring-[#8acbc1]/40'
                          : 'bg-[#12191f]/90 border-white/10 hover:border-white/25 shadow-lg backdrop-blur-md'
                      }`}
                    >
                      <span>{item.icon}</span>
                    </div>

                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 rounded-lg bg-[#0e171c] border border-[#8acbc1]/40 shadow-2xl text-center pointer-events-none whitespace-nowrap z-40"
                      >
                        <p className="text-xs font-bold text-white tracking-wide">{item.name}</p>
                        <p className="text-[10px] text-[#8acbc1] font-mono">{item.category}</p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="mt-8 h-8 text-center">
        {hovered ? (
          <p className="text-xs md:text-sm font-mono text-[#8acbc1] tracking-wider animate-pulse">
            // Exploring {hovered}
          </p>
        ) : (
          <p className="text-xs font-mono text-white/40 tracking-widest uppercase">
            [ Hover over nodes to inspect core stack ]
          </p>
        )}
      </div>
    </div>
  );
}