'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Orbit, ExternalLink, X } from 'lucide-react';
import { ProjectData, GithubIcon } from '@/components/projects';

interface RadialCarouselProps {
  projects: ProjectData[];
}

export default function RadialCarousel({ projects }: RadialCarouselProps) {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveredCenter, setIsHoveredCenter] = useState(false);

  const startXRef = useRef(0);
  const startAngleRef = useRef(0);

  const numItems = projects.length;
  const angleStep = 360 / numItems;
  const ringRadius = 190; // Radius of the circular ring (px)

  // Sync selected index based on rotation angle
  useEffect(() => {
    let normalized = ((-rotationAngle % 360) + 360) % 360;
    const index = Math.round(normalized / angleStep) % numItems;
    setSelectedIndex((index + numItems) % numItems);
  }, [rotationAngle, angleStep, numItems]);

  const selectProject = (index: number) => {
    setSelectedIndex(index);
    const targetAngle = -index * angleStep;
    setRotationAngle(targetAngle);
  };

  const handlePrev = () => {
    setRotationAngle((prev) => prev + angleStep);
  };

  const handleNext = () => {
    setRotationAngle((prev) => prev - angleStep);
  };

  // Drag to rotate the circular ring
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    startAngleRef.current = rotationAngle;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.current;
    setRotationAngle(startAngleRef.current + deltaX * 0.4);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    let normalized = ((-rotationAngle % 360) + 360) % 360;
    const nearestIndex = Math.round(normalized / angleStep) % numItems;
    selectProject(nearestIndex);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
    startAngleRef.current = rotationAngle;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startXRef.current;
    setRotationAngle(startAngleRef.current + deltaX * 0.4);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    let normalized = ((-rotationAngle % 360) + 360) % 360;
    const nearestIndex = Math.round(normalized / angleStep) % numItems;
    selectProject(nearestIndex);
  };

  const activeProject = projects[selectedIndex];

  return (
    <div className="relative w-full py-8 flex flex-col items-center justify-center select-none overflow-hidden">
      {/* Top Controls Header */}
      <div className="flex items-center justify-between w-full max-w-4xl px-4 mb-6">
        <div className="flex items-center gap-2 font-mono text-xs text-[#7f8cf8]">
          <Orbit className="w-4 h-4 text-[#b9c2ff] animate-spin" style={{ animationDuration: '12s' }} />
          <span className="text-[#b9c2ff] font-semibold">RADIAL RING CAROUSEL</span>
          <span className="hidden sm:inline text-[#707cb8]">// TAP CARD TO EXPAND</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2 rounded-lg border border-[#7f8cf8]/40 bg-[#0d0f20] text-[#b9c2ff] hover:border-[#b9c2ff] hover:bg-[#7f8cf8]/20 transition-all cursor-pointer shadow-md"
            title="Rotate Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-lg border border-[#7f8cf8]/40 bg-[#0d0f20] text-[#b9c2ff] hover:border-[#b9c2ff] hover:bg-[#7f8cf8]/20 transition-all cursor-pointer shadow-md"
            title="Rotate Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Radial Ring Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center w-full max-w-5xl">
        {/* Left/Top: The Exact Circular Ring Dial (from Reference Image) */}
        <div 
          className="lg:col-span-6 flex items-center justify-center relative min-h-[460px]"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Orbital Circular Track Graphic */}
          <div className="absolute w-[380px] h-[380px] rounded-full border border-dashed border-[#7f8cf8]/30 pointer-events-none" />
          <div className="absolute w-[280px] h-[280px] rounded-full border border-dotted border-[#b9c2ff]/20 pointer-events-none" />
          
          {/* Center Hub Indicator */}
          <div className="absolute w-20 h-20 rounded-full border-2 border-[#7f8cf8]/50 bg-[#0d0f20]/90 backdrop-blur-md flex flex-col items-center justify-center pointer-events-none shadow-[0_0_30px_rgba(127,140,248,0.3)]">
            <span className="font-mono text-[10px] font-bold text-[#b9c2ff]">
              0{selectedIndex + 1}/0{numItems}
            </span>
            <span className="font-mono text-[8px] text-[#7f8cf8]">PROJECT</span>
          </div>

          {/* Rotating Ring Container */}
          <div
            className="relative w-[380px] h-[380px] flex items-center justify-center transition-transform duration-500 ease-out cursor-grab active:cursor-grabbing"
            style={{
              transform: `rotate(${rotationAngle}deg)`,
            }}
          >
            {projects.map((project, idx) => {
              const cardAngle = idx * angleStep;
              const isCurrent = idx === selectedIndex;
              const rad = (cardAngle * Math.PI) / 180;
              const x = Math.sin(rad) * ringRadius;
              const y = -Math.cos(rad) * ringRadius;

              return (
                <div
                  key={project.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectProject(idx);
                  }}
                  className={`absolute w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer shadow-xl ${
                    isCurrent
                      ? 'border-2 border-[#b9c2ff] ring-4 ring-[#7f8cf8]/50 scale-125 z-30 shadow-[0_0_25px_rgba(185,194,255,0.7)]'
                      : 'border border-[#7f8cf8]/40 hover:border-[#b9c2ff] opacity-75 hover:opacity-100 hover:scale-110 z-10'
                  }`}
                  style={{
                    transform: `translate(${x}px, ${y}px) rotate(${cardAngle + 90}deg)`,
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover filter contrast-110 brightness-95"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/neural-nebula.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060710]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-[#060710]/90 font-mono text-[8px] font-bold text-[#b9c2ff]">
                    0{idx + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right/Bottom: Active Project Detail Card (Preview Mode from Reference Image) */}
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, x: 20, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="p-6 sm:p-8 rounded-3xl border-2 border-[#7f8cf8] bg-[#0d0f20]/95 backdrop-blur-xl shadow-[0_0_45px_rgba(127,140,248,0.3)] space-y-6"
            >
              {/* Image Preview Header */}
              <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden border border-[#7f8cf8]/40 bg-[#060710]">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover filter contrast-110 brightness-95"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/neural-nebula.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f20] via-transparent to-transparent opacity-85" />
                
                <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#060710]/90 border border-[#7f8cf8]/60 font-mono text-xs font-bold text-[#b9c2ff]">
                  PROJECT // {activeProject.number}
                </div>

                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#060710]/90 border border-[#7f8cf8]/60 font-mono text-xs text-[#b9c2ff] hover:border-[#b9c2ff] hover:bg-[#7f8cf8]/30 transition-all shadow-md"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>SOURCE</span>
                </a>
              </div>

              {/* Title & Category */}
              <div className="space-y-1">
                <span className="font-mono text-xs text-[#7f8cf8] uppercase tracking-wider font-semibold">
                  {activeProject.category}
                </span>
                <h3 className="text-2xl font-bold text-white leading-tight">
                  {activeProject.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm text-[#707cb8] leading-relaxed">
                {activeProject.description}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-[#7f8cf8]/20">
                {activeProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg border border-[#7f8cf8]/40 bg-[#12152d] font-mono text-xs text-[#b9c2ff] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
