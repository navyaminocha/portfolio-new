const fs = require('fs');

const code = `'use client';

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
      <div className="absolute top-0 left-0 right-0 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[#8acbc1] px-3 pointer-events-auto">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="font-bold text-white tracking-widest text-xs uppercase drop-shadow-[0_0_8px_rgba(138,203,193,0.8)]">
            DRONE_VISION // SYS_ONLINE
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-white/80">
            ALT: <strong className="text-[#dbb057]">{telemetry.altitude}</strong>
          </span>
          <span className="text-white/80">
            FPS: <strong className="text-emerald-400">{telemetry.fps}</strong>
          </span>
          <span className="text-white/80 hidden sm:inline">
            CONF: <strong className="text-[#8acbc1]">{telemetry.confidence}</strong>
          </span>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[360px] h-[360px] rounded-full bg-gradient-to-r from-[#8acbc1]/15 via-[#dbb057]/10 to-transparent blur-3xl animate-pulse" />
        <div className="absolute w-72 h-72 rounded-full border border-[#8acbc1]/20 border-dashed animate-[spin_40s_linear_infinite]" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-[#8acbc1]/10 animate-[spin_70s_linear_infinite_reverse]" />
      </div>

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
          className="absolute z-10 pointer-events-none flex flex-col justify-between p-2 rounded-lg border border-[#8acbc1]/70 bg-[#8acbc1]/10 backdrop-blur-xs shadow-[0_0_18px_rgba(138,203,193,0.35)]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-[#8acbc1] bg-[#070b0e]/90 px-1.5 py-0.5 rounded shadow">
              {t.id}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#dbb057] animate-ping" />
          </div>
          <div className="flex items-center justify-between text-[8px] font-mono text-emerald-400">
            <Scan className="w-3 h-3 text-[#8acbc1]" />
            <span className="tracking-wider font-semibold">LOCK</span>
          </div>
        </motion.div>
      ))}

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
        <div className="relative w-64 h-48 filter drop-shadow-[0_20px_35px_rgba(138,203,193,0.45)]">
          <svg viewBox="0 0 260 200" className="w-full h-full">
            <path
              d="M 50 45 L 130 100 L 210 45 M 50 155 L 130 100 L 210 155"
              stroke="#8acbc1"
              strokeWidth="5"
              strokeLinecap="round"
              strokeOpacity="0.9"
            />
            <path
              d="M 30 100 L 230 100"
              stroke="#4a6572"
              strokeWidth="3.5"
              strokeDasharray="6 3"
              strokeOpacity="0.6"
            />
            <rect
              x="100"
              y="75"
              width="60"
              height="50"
              rx="16"
              fill="#0a151d"
              stroke="#8acbc1"
              strokeWidth="2.5"
            />
            <circle cx="130" cy="95" r="12" fill="#132c38" stroke="#dbb057" strokeWidth="2" />
            <circle cx="130" cy="95" r="5" fill="#dbb057" className="animate-pulse" />
            <circle cx="130" cy="115" r="7" fill="#000" stroke="#8acbc1" strokeWidth="2" />
            <circle cx="130" cy="115" r="3" fill="#8acbc1" />

            <circle cx="50" cy="45" r="16" fill="#0b1319" stroke="#8acbc1" strokeWidth="2.5" />
            <ellipse
              cx="50"
              cy="45"
              rx="34"
              ry="8"
              fill="none"
              stroke="#8acbc1"
              strokeWidth="2"
              className="animate-[spin_0.2s_linear_infinite] origin-[50px_45px]"
            />
            <circle cx="50" cy="45" r="4" fill="#dbb057" />

            <circle cx="210" cy="45" r="16" fill="#0b1319" stroke="#8acbc1" strokeWidth="2.5" />
            <ellipse
              cx="210"
              cy="45"
              rx="34"
              ry="8"
              fill="none"
              stroke="#8acbc1"
              strokeWidth="2"
              className="animate-[spin_0.2s_linear_infinite] origin-[210px_45px]"
            />
            <circle cx="210" cy="45" r="4" fill="#dbb057" />

            <circle cx="50" cy="155" r="16" fill="#0b1319" stroke="#8acbc1" strokeWidth="2.5" />
            <ellipse
              cx="50"
              cy="155"
              rx="34"
              ry="8"
              fill="none"
              stroke="#8acbc1"
              strokeWidth="2"
              className="animate-[spin_0.2s_linear_infinite] origin-[50px_155px]"
            />
            <circle cx="50" cy="155" r="4" fill="#dbb057" />

            <circle cx="210" cy="155" r="16" fill="#0b1319" stroke="#8acbc1" strokeWidth="2.5" />
            <ellipse
              cx="210"
              cy="155"
              rx="34"
              ry="8"
              fill="none"
              stroke="#8acbc1"
              strokeWidth="2"
              className="animate-[spin_0.2s_linear_infinite] origin-[210px_155px]"
            />
            <circle cx="210" cy="155" r="4" fill="#dbb057" />

            <circle cx="40" cy="45" r="3" fill="#ef4444" className="animate-ping" />
            <circle cx="220" cy="45" r="3" fill="#10b981" className="animate-ping" />
          </svg>
        </div>

        <div className="mt-1 flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#080d12]/90 border border-[#8acbc1]/40 text-[10px] font-mono text-[#8acbc1] shadow-lg">
          <Crosshair className="w-3 h-3 text-[#dbb057] animate-spin" />
          <span>AUTONOMOUS_PATROL // 28.7499° N</span>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-center justify-center gap-2.5 text-[11px] font-mono pointer-events-auto">
        <div className="px-3.5 py-1.5 rounded-full bg-[#0a1218]/85 border border-[#8acbc1]/30 backdrop-blur-md flex items-center gap-2 text-white/90 shadow-lg">
          <Eye className="w-3.5 h-3.5 text-[#8acbc1]" />
          <span>Real-time CNN CV</span>
        </div>
        <div className="px-3.5 py-1.5 rounded-full bg-[#0a1218]/85 border border-[#dbb057]/40 backdrop-blur-md flex items-center gap-2 text-white/90 shadow-lg">
          <Shield className="w-3.5 h-3.5 text-[#dbb057]" />
          <span>mIoU: 0.6094 Off-Road</span>
        </div>
        <div className="px-3.5 py-1.5 rounded-full bg-[#0a1218]/85 border border-emerald-500/30 backdrop-blur-md flex items-center gap-2 text-white/90 shadow-lg">
          <Scan className="w-3.5 h-3.5 text-emerald-400" />
          <span>Multi-Target Track</span>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('components/autonomous-drone.tsx', code, 'utf8');
console.log('autonomous-drone.tsx written successfully, size:', fs.statSync('components/autonomous-drone.tsx').size);
