'use client';

import { motion } from 'framer-motion';
import { Briefcase, Trophy, Users, ShieldCheck } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      role: 'AI / GenAI Intern',
      organization: 'HCLTech',
      period: 'June 2026 - July 2026',
      description: 'Evaluated and optimized RAG pipelines using Precision@K, Recall@K, MRR, NDCG, faithfulness, and context relevance, working across vector search, retrieval, reranking, and LLM-based response generation.',
      tags: ['RAG Optimization', 'Vector Search', 'Faithfulness', 'LLMs', 'Retrieval Metrics'],
      icon: Briefcase,
    },
    {
      role: 'Winner - Render Track (Nagrik AI)',
      organization: 'SIH Decode @ IIIT Delhi',
      period: 'September 2026',
      description: 'Developed Nagrik AI, a citizen assistant providing natural language guidance for government portals and administrative procedures. Finalist in Build with Gemma, CodeCrunch DTU, Curebay MultiCity, and EightFold BITS Pilani.',
      tags: ['SIH Winner', 'Nagrik AI', 'Gemma LLM', 'Hackathon'],
      icon: Trophy,
    },
    {
      role: 'Co-Head & Core Technical Member',
      organization: 'AIMS DTU (Artificial Intelligence & Machine Learning Society)',
      period: '2025 - Present',
      description: 'Leading technical workshops, mentoring junior cohorts in deep learning architectures, and orchestrating university-wide AI hackathons and hands-on ML bootcamps.',
      tags: ['Technical Leadership', 'Workshops', 'Mentorship'],
      icon: Users,
    },
    {
      role: 'Vice Captain',
      organization: 'DTU Football Team',
      period: '2025 - Present',
      description: 'Led university squad to Gold Medals at IIT BHU Sports Fest (2025) and Arena DTU Sports Festival (2025), demonstrating disciplined teamwork and high-pressure strategy.',
      tags: ['Gold Medalist', 'IIT BHU', 'Arena DTU', 'Leadership'],
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="experience" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#7f8cf8] uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b9c2ff]" />
            <span>05 // TRACK RECORD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Experience & <span className="text-[#b9c2ff]">Leadership</span>
          </h2>
        </div>

        {/* Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={exp.role + exp.organization}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl border border-[#7f8cf8]/30 bg-[#0d0f20]/80 backdrop-blur-md flex flex-col justify-between space-y-4 hover:border-[#b9c2ff] hover:shadow-[0_0_25px_rgba(127,140,248,0.25)] transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-lg border border-[#7f8cf8]/40 bg-[#12152d] text-[#b9c2ff] group-hover:border-[#b9c2ff] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[11px] text-[#707cb8]">{exp.period}</span>
                  </div>

                  <div>
                    <h3 className="font-mono text-base font-bold text-white group-hover:text-[#b9c2ff] transition-colors">
                      {exp.role}
                    </h3>
                    <p className="font-mono text-xs font-semibold text-[#7f8cf8] mt-1">{exp.organization}</p>
                  </div>

                  <p className="text-xs text-[#707cb8] leading-relaxed">{exp.description}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#7f8cf8]/20">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded border border-[#7f8cf8]/30 bg-[#12152d] font-mono text-[10px] text-[#b9c2ff]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
