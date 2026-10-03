'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, Calendar } from 'lucide-react';

export default function Education() {
  const milestones = [
    {
      institution: 'Delhi Technological University (formerly DCE)',
      degree: 'Bachelor of Technology in Computer Science & Engineering',
      duration: '2025 - 2029',
      grade: '8.7 CGPA',
      highlights: 'Core: Data Structures, Algorithms, Operating Systems, DBMS, Machine Learning, Deep Learning.',
      icon: GraduationCap,
    },
    {
      institution: 'Sardar Patel Vidyalaya, New Delhi',
      degree: 'Class 12th and 10th (CBSE Board)',
      duration: 'March 2025',
      grade: '97% & 96.8% respectively',
      icon: Award,
    },
    {
      institution: 'DeepLearning.AI / Stanford University',
      degree: 'Machine Learning & Deep Learning Specialization',
      duration: '2025',
      grade: 'Verified Honors',
      highlights: 'Mastered Neural Networks, CNNs, Sequence Models, Attention Mechanisms, and Optimization.',
      icon: BookOpen,
    },
  ];

  return (
    <section id="education" className="relative py-24 px-6 bg-[#060710]/60">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#7f8cf8] uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b9c2ff]" />
            <span>02 // ACADEMIC FOUNDATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Education & <span className="text-[#b9c2ff]">Milestones</span>
          </h2>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {milestones.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.institution}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="p-6 rounded-2xl border border-[#7f8cf8]/30 bg-[#0d0f20]/80 backdrop-blur-md flex flex-col justify-between space-y-4 hover:border-[#b9c2ff] hover:shadow-[0_0_25px_rgba(127,140,248,0.2)] transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-lg border border-[#7f8cf8]/40 bg-[#12152d] text-[#b9c2ff] group-hover:border-[#b9c2ff] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full border border-[#7f8cf8]/40 bg-[#7f8cf8]/15 font-mono text-[11px] font-bold text-[#b9c2ff]">
                      {item.grade}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-mono text-base font-bold text-white group-hover:text-[#b9c2ff] transition-colors">
                      {item.institution}
                    </h3>
                    <p className="text-xs font-medium text-[#7f8cf8] mt-1">{item.degree}</p>
                  </div>

                  <p className="text-xs text-[#707cb8] leading-relaxed">{item.highlights}</p>
                </div>

                <div className="pt-3 border-t border-[#7f8cf8]/20 flex items-center gap-1.5 text-[#707cb8] font-mono text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-[#7f8cf8]" />
                  <span>{item.duration}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
