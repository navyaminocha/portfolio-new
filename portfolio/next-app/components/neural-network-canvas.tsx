'use client';

import React, { useEffect, useRef } from 'react';

export function NeuralNetworkCanvas({ className = '' }: { className?: string }) {
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
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      active: false,
    };

    // 3D Nodes generation (Tensor Hypercube & Layered Network Topology)
    interface Node3D {
      x: number;
      y: number;
      z: number;
      baseSize: number;
      layer: number;
      connections: number[];
      pulsePhase: number;
      cluster: boolean;
    }

    const nodes: Node3D[] = [];
    const layers = 5;
    const nodesPerLayer = 16;
    const depthSpacing = 70;
    const sizeSpread = 160;

    // Create a 3D isometric lattice of nodes
    for (let l = 0; l < layers; l++) {
      const z = (l - (layers - 1) / 2) * depthSpacing;
      for (let i = 0; i < nodesPerLayer; i++) {
        const row = Math.floor(i / 4);
        const col = i % 4;
        const x = (col - 1.5) * (sizeSpread / 3) + (Math.random() - 0.5) * 15;
        const y = (row - 1.5) * (sizeSpread / 3) + (Math.random() - 0.5) * 15;

        nodes.push({
          x,
          y,
          z,
          baseSize: Math.random() > 0.7 ? 3.5 : 2.2,
          layer: l,
          connections: [],
          pulsePhase: Math.random() * Math.PI * 2,
          cluster: Math.random() > 0.65,
        });
      }
    }

    // Connect adjacent nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        // Connect if close in 3D space or in adjacent layer
        if (dist < 85 && (Math.abs(nodes[i].layer - nodes[j].layer) <= 1)) {
          nodes[i].connections.push(j);
        }
      }
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const rawX = e.clientX - rect.left;
      const rawY = e.clientY - rect.top;
      // Normalized between -1 and 1
      mouse.targetX = (rawX / width - 0.5) * 2;
      mouse.targetY = (rawY / height - 0.5) * 2;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let rotX = 0.35;
    let rotY = -0.55;
    let time = 0;

    const render = () => {
      time += 0.02;

      // Mouse influence on 3D rotation
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.06;
        mouse.y += (mouse.targetY - mouse.y) * 0.06;
      } else {
        mouse.x += (Math.sin(time * 0.4) * 0.3 - mouse.x) * 0.03;
        mouse.y += (Math.cos(time * 0.3) * 0.2 - mouse.y) * 0.03;
      }

      const targetRotX = 0.35 + mouse.y * 0.65;
      const targetRotY = -0.55 + mouse.x * 0.85 + time * 0.08;

      rotX += (targetRotX - rotX) * 0.08;
      rotY += (targetRotY - rotY) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Center of 3D projection (positioned towards top right / center)
      const centerX = width > 768 ? width * 0.68 : width * 0.5;
      const centerY = height * 0.48;
      const fov = 380;

      // Transform & Project 3D nodes
      const projected = nodes.map((node) => {
        // Rotate Y
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = node.x * cosY + node.z * sinY;
        const z1 = -node.x * sinY + node.z * cosY;

        // Rotate X
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = node.y * cosX - z1 * sinX;
        const z2 = node.y * sinX + z1 * cosX;

        // Perspective
        const scale = fov / (fov + z2 + 180);
        const px = centerX + x1 * scale;
        const py = centerY + y2 * scale;

        return {
          px,
          py,
          scale,
          z2,
          node,
        };
      });

      // Draw Synaptic Connections (Lines with travelling pulses)
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const p1 = projected[i];
        for (const j of nodes[i].connections) {
          const p2 = projected[j];

          const lineAlpha = Math.max(0.06, 0.25 * ((p1.scale + p2.scale) / 2));
          ctx.strokeStyle = `rgba(180, 205, 230, ${lineAlpha})`;

          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.stroke();

          // Action potential pulse traveling along synapse
          const pulseT = (time * 1.5 + nodes[i].pulsePhase) % 1;
          const pulseX = p1.px + (p2.px - p1.px) * pulseT;
          const pulseY = p1.py + (p2.py - p1.py) * pulseT;

          ctx.fillStyle = `rgba(138, 203, 193, ${Math.min(0.8, lineAlpha * 3.5)})`;
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 1.2 * p1.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw Nodes (Halftone dot matrix clusters)
      // Sort by depth so closer dots draw on top
      projected.sort((a, b) => a.z2 - b.z2);

      for (const p of projected) {
        const { px, py, scale, node } = p;
        const radius = node.baseSize * scale;

        // Node Glow
        const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.3 + 0.7;
        const glowRadius = radius * (node.cluster ? 3.2 : 2.0);

        const grad = ctx.createRadialGradient(px, py, 0, px, py, Math.max(1, glowRadius));
        grad.addColorStop(0, `rgba(255, 255, 255, ${0.9 * pulse})`);
        grad.addColorStop(0.4, `rgba(138, 203, 193, ${0.6 * pulse})`);
        grad.addColorStop(1, 'rgba(138, 203, 193, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, Math.max(1, glowRadius), 0, Math.PI * 2);
        ctx.fill();

        // Core Dot
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.8, radius), 0, Math.PI * 2);
        ctx.fill();

        // Halftone sub-cluster satellite dots
        if (node.cluster) {
          ctx.fillStyle = 'rgba(238, 242, 243, 0.45)';
          for (let c = 0; c < 4; c++) {
            const angle = c * (Math.PI / 2);
            const cx = px + Math.cos(angle) * (radius * 2.2);
            const cy = py + Math.sin(angle) * (radius * 2.2);
            ctx.beginPath();
            ctx.arc(cx, cy, 1 * scale, 0, Math.PI * 2);
            ctx.fill();
          }
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-auto ${className}`}
    />
  );
}