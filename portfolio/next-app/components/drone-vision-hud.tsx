'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Scan, Crosshair, Radio, Shield, Eye } from 'lucide-react';

export function DroneVisionHUD({ className = '' }: { className?: string }) {
  const [telemetry, setTelemetry] = useState({
    fps: 59.8,
    trackedObjects: 6,
    altitude: '42.8m',
    mode: 'AUTONOMOUS_NAV',
    confidence: '98.4%',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        ...prev,
        fps: +(58.5 + Math.random() * 2.5).toFixed(1),
        altitude: (42 + Math.sin(Date.now() / 1000) * 1.5).toFixed(1) + 'm',
      }));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const targets = [
    { id: '38.24', top: '35%', left: '48%', w: '90px', h: '95px', label: 'PRIMARY_TARGET [38.24]' },
    { id: '36.76', top: '15%', left: '32%', w: '60px', h: '65px', label: 'OBSTACLE_01 [36.76]' },
    { id: '37.07', top: '55%', left: '15%', w: '65px', h: '75px', label: 'TERRAIN_VEG [37.07]' },
    { id: '36.47', top: '30%', left: '22%', w: '50px', h: '55px', label: 'WAYPOINT [36.47]' },
    { id: '36.81', top: '65%', left: '62%', w: '70px', h: '70px', label: 'SURVEILLANCE [36.81]' },
  ];

  return (
    <div className={`relative rounded-3xl bg-[#090f14]/85 border border-[#8acbc1]/30 p-6 backdrop-blur-2xl shadow-[0_0_40px_rgba(138,203,193,0.15)] overflow-hidden ${className}`}>
      {/* Cyan/Teal Grid Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(138,203,193,0.04)_51%)] bg-[length:100%_4px] pointer-events-none" />

      {/* Top HUD Telemetry Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 text-[11px] font-mono text-[#8acbc1]">
        <div className="flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="font-bold text-white uppercase tracking-wider">DRONE_VISION // SYS_ONLINE</span>
        </div>
        <div className="flex items-center gap-4 text-white/60">
          <span>ALT: <strong className="text-[#dbb057]">{telemetry.altitude}</strong></span>
          <span>FPS: <strong className="text-emerald-400">{telemetry.fps}</strong></span>
          <span className="hidden sm:inline">CONF: <strong className="text-[#8acbc1]">{telemetry.confidence}</strong></span>
        </div>
      </div>

      {/* Simulated Thermal/Drone Surveillance Viewport */}
      <div className="relative h-56 sm:h-64 my-4 rounded-2xl bg-gradient-to-b from-[#0b151b] to-[#080d12] border border-[#8acbc1]/20 overflow-hidden flex items-center justify-center">
        {/* Ambient Thermal Camera Tint Overlay (matching Image 2) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#132c38]/40 via-[#0d1e27]/20 to-transparent" />

        {/* Center Crosshair */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          <Crosshair className="w-16 h-16 text-[#8acbc1] animate-[spin_30s_linear_infinite]" />
        </div>

        {/* Bounding Box Detections (matching Image 2) */}
        {targets.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0.7, scale: 0.98 }}
            animate={{ opacity: [0.7, 1, 0.7], scale: [0.98, 1.02, 0.98] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              top: t.top,
              left: t.left,
              width: t.w,
              height: t.h,
            }}
            className="absolute border border-[#8acbc1] bg-[#8acbc1]/10 rounded-sm shadow-[0_0_12px_rgba(138,203,193,0.35)] flex flex-col justify-between p-1 pointer-events-none"
          >
            <span className="text-[8px] font-mono text-[#8acbc1] font-bold bg-[#070b0e]/90 px-1 py-0.5 rounded self-start truncate">
              {t.id}
            </span>
            <div className="flex justify-between items-center text-[7px] font-mono text-emerald-300">
              <Scan className="w-2 h-2" />
              <span>LOCK</span>
            </div>
          </motion.div>
        ))}

        {/* Bottom Left Sensor Tag */}
        <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/60 backdrop-blur-md text-[9px] font-mono text-white/70 border border-white/10">
          MODE: <span className="text-[#8acbc1]">SEMANTIC_SEGMENTATION_v4</span>
        </div>
      </div>

      {/* Bottom Features Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-[10px] font-mono text-white/70">
        <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-[#8acbc1]" />
          <span>Real-time CNN CV</span>
        </div>
        <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-[#dbb057]" />
          <span>mIoU: 0.6094 Off-Road</span>
        </div>
        <div className="col-span-2 sm:col-span-1 p-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
          <Scan className="w-3.5 h-3.5 text-emerald-400" />
          <span>Multi-Target Track</span>
        </div>
      </div>
    </div>
  );
}