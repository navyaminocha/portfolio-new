'use client';

import { motion } from 'framer-motion';
import { Phone, MapPin, Terminal } from 'lucide-react';
import { GithubIcon } from '@/components/projects';

function LinkedinIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function LeetcodeIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 4.818 3.655 5.928 5.928 0 0 0 3.328-.73 5.875 5.875 0 0 0 2.062-2.148l4.088-6.195a1.37 1.37 0 0 0-.28-1.897 1.376 1.376 0 0 0-1.921.28l-3.79 5.742a3.14 3.14 0 0 1-1.103 1.147 3.167 3.167 0 0 1-1.777.39 3.18 3.18 0 0 1-2.576-1.956 3.138 3.138 0 0 1-.033-1.264 3.104 3.104 0 0 1 .65-1.127l3.704-3.965 5.09-5.46A1.373 1.373 0 0 0 13.483 0z" />
    </svg>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 px-6 bg-[#060710]/80">
      <div className="max-w-5xl mx-auto space-y-12 text-center">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#7f8cf8] uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b9c2ff]" />
            <span>06 // INITIATE COMMS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white">
            Let's Build Something <span className="text-[#b9c2ff] hud-glow">Intelligent.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#707cb8] max-w-xl mx-auto">
            Open for AI/ML engineering roles, research collaborations, and production-grade intelligent systems development.
          </p>
        </div>

        {/* Central Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 sm:p-10 rounded-3xl border-2 border-[#7f8cf8]/50 bg-[#0d0f20]/90 backdrop-blur-xl shadow-[0_0_50px_rgba(127,140,248,0.25)] space-y-8"
        >
          {/* Main Direct Email */}
          <div className="space-y-2">
            <p className="font-mono text-xs text-[#7f8cf8] uppercase tracking-widest">DIRECT COMMUNICATION LINK</p>
            <a
              href="mailto:minochanavya08@gmail.com"
              className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-[#b9c2ff] hover:text-white hover:underline transition-colors block"
            >
              minochanavya08@gmail.com
            </a>
          </div>

          {/* Quick Info Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 border-t border-[#7f8cf8]/20 font-mono text-xs text-[#707cb8]">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#7f8cf8]" />
              <span>+91 9911021777</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#7f8cf8]" />
              <span>New Delhi, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#7f8cf8]" />
              <span>DTU Computer Science</span>
            </div>
          </div>

          {/* Social Links Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="https://github.com/NavyaMinocha"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#7f8cf8]/50 bg-[#12152d] font-mono text-xs font-semibold text-[#b9c2ff] hover:border-[#b9c2ff] hover:bg-[#7f8cf8]/20 hover:shadow-[0_0_20px_rgba(185,194,255,0.4)] transition-all"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GITHUB</span>
            </a>
            <a
              href="https://www.linkedin.com/in/navya-minocha-4458b0288/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#7f8cf8]/50 bg-[#12152d] font-mono text-xs font-semibold text-[#b9c2ff] hover:border-[#b9c2ff] hover:bg-[#7f8cf8]/20 hover:shadow-[0_0_20px_rgba(185,194,255,0.4)] transition-all"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LINKEDIN</span>
            </a>
            <a
              href="https://leetcode.com/u/navyaminocha/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#7f8cf8]/50 bg-[#12152d] font-mono text-xs font-semibold text-[#b9c2ff] hover:border-[#b9c2ff] hover:bg-[#7f8cf8]/20 hover:shadow-[0_0_20px_rgba(185,194,255,0.4)] transition-all"
            >
              <LeetcodeIcon className="w-4 h-4" />
              <span>LEETCODE</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
