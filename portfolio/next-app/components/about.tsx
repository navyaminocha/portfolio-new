'use client';

import { motion } from 'framer-motion';
import { Award, Code2, GraduationCap, Trophy } from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'B.Tech CGPA (DTU CSE)', value: '8.7', detail: 'Delhi Technological University' },
    { label: 'JEE Mains Rank', value: '99.46%ile', detail: '12k rank in JEE Advanced' },
    { label: 'Ex-AI Intern', value: 'HCLTech', detail: 'RAG & RAGAs' },
    { label: 'Leadership', value: 'Co-Head', detail: 'AIMS DTU (AI & ML Society)' },
  ];

  return (
    <section id="about" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#7f8cf8] uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b9c2ff]" />
            <span>01 // BACKGROUND & IDENTITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Creativity. <span className="text-[#b9c2ff]">Innovation.</span> Impact.
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Profile Photo with Phosphor Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#7f8cf8]/50 bg-[#0d0f20] shadow-[0_0_35px_rgba(127,140,248,0.25)]">
              <img
                src="/profile.jpg"
                alt="Navya Minocha"
                className="w-full h-full object-cover filter contrast-105 brightness-95 group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/profile.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060710] via-transparent to-transparent opacity-80" />
              
              {/* Bottom Badge inside portrait */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#0d0f20]/90 backdrop-blur-md border border-[#7f8cf8]/40 flex items-center justify-between">
                <div>
                  <p className="font-mono text-xs font-bold text-[#b9c2ff]">NAVYA MINOCHA</p>
                  <p className="font-mono text-[10px] text-[#707cb8]">DTU B.Tech CSE // 2026</p>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#b9c2ff] animate-pulse" />
              </div>
            </div>
          </motion.div>

          {/* Bio & Stat Grid */}
          <div className="lg:col-span-7 space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-base sm:text-lg text-[#b0bbec] leading-relaxed"
            >
              I am a second-year Computer Science undergraduate at <span className="text-[#b9c2ff] font-semibold">Delhi Technological University (DTU)</span>, passionate about building robust, real-world intelligent systems. My technical focus bridges <span className="text-[#7f8cf8] font-medium">Deep Learning</span>, <span className="text-[#b9c2ff] font-medium">Computer Vision</span>, and <span className="text-[#7f8cf8] font-medium">Generative AI/RAG architectures</span>.
            </motion.p>



            {/* 4 Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 pt-2">
              {stats.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 rounded-xl border border-[#7f8cf8]/30 bg-[#0d0f20]/70 backdrop-blur-md space-y-1 hover:border-[#b9c2ff] transition-all"
                >
                  <p className="text-2xl sm:text-3xl font-mono font-bold text-[#b9c2ff]">
                    {item.value}
                  </p>
                  <p className="font-mono text-xs font-semibold text-[#e2e7ff]">{item.label}</p>
                  <p className="font-mono text-[10px] text-[#707cb8]">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
