'use client';

import React, { useEffect, useRef } from 'react';

export function TensorLattice({ className = '', size = 320 }: { className?: string; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = size);
    const height = (canvas.height = size);

    interface Point3D {
      x: number;
      y: number;
      z: number;
      baseSize: number;
      cluster: boolean;
    }

    const points: Point3D[] = [];
    const connections: [number, number][] = [];

    // Construct a 3D isometric tensor lattice (hypercube structure)
    const gridSize = 3;
    const spacing = 45;

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          const px = (x - (gridSize - 1) / 2) * spacing;
          const py = (y - (gridSize - 1) / 2) * spacing;
          const pz = (z - (gridSize - 1) / 2) * spacing;

          const isCorner = (x === 0 || x === gridSize - 1) && (y === 0 || y === gridSize - 1) && (z === 0 || z === gridSize - 1);
          points.push({
            x: px,
            y: py,
            z: pz,
            baseSize: isCorner ? 4 : Math.random() > 0.6 ? 3 : 2,
            cluster: isCorner,
          });
        }
      }
    }

    // Connect grid lines
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = Math.abs(points[i].x - points[j].x);
        const dy = Math.abs(points[i].y - points[j].y);
        const dz = Math.abs(points[i].z - points[j].z);
        const manhattan = dx + dy + dz;

        // Connect immediate neighbors along axis
        if (Math.abs(manhattan - spacing) < 2) {
          connections.push([i, j]);
        }
      }
    }

    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const rawX = e.clientX - rect.left;
      const rawY = e.clientY - rect.top;
      mouse.targetX = (rawX / width - 0.5) * 2;
      mouse.targetY = (rawY / height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let rotX = 0.5;
    let rotY = -0.6;
    let time = 0;

    const render = () => {
      time += 0.015;

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      rotX = 0.45 + mouse.y * 0.8 + Math.sin(time * 0.5) * 0.1;
      rotY += 0.008 + mouse.x * 0.02;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const fov = 300;

      const projected = points.map((p) => {
        // Rotate Y
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;

        // Rotate X
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const scale = fov / (fov + z2 + 100);
        const px = cx + x1 * scale;
        const py = cy + y2 * scale;

        return { px, py, scale, z2, p };
      });

      // Draw wireframe synapses
      ctx.lineWidth = 1;
      for (const [i, j] of connections) {
        const p1 = projected[i];
        const p2 = projected[j];

        const alpha = Math.max(0.08, 0.35 * ((p1.scale + p2.scale) / 2));
        ctx.strokeStyle = `rgba(138, 203, 193, ${alpha})`;

        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();

        // Signal pulse
        const pulseT = (time * 2 + i * 0.3) % 1;
        const pulseX = p1.px + (p2.px - p1.px) * pulseT;
        const pulseY = p1.py + (p2.py - p1.py) * pulseT;

        ctx.fillStyle = 'rgba(219, 176, 87, 0.7)';
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 1.2 * p1.scale, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Halftone Node Dots
      projected.sort((a, b) => a.z2 - b.z2);

      for (const { px, py, scale, p } of projected) {
        const r = p.baseSize * scale;

        // Core Dot
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(px, py, Math.max(1, r), 0, Math.PI * 2);
        ctx.fill();

        // Halftone satellite cluster (matching Image 1)
        if (p.cluster) {
          ctx.fillStyle = 'rgba(138, 203, 193, 0.6)';
          for (let c = 0; c < 4; c++) {
            const angle = c * (Math.PI / 2) + time;
            const sx = px + Math.cos(angle) * (r * 2.2);
            const sy = py + Math.sin(angle) * (r * 2.2);
            ctx.beginPath();
            ctx.arc(sx, sy, 1 * scale, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [size]);

  return <canvas ref={canvasRef} className={`pointer-events-auto ${className}`} />;
}