const fs = require('fs');

// 1. components/education.tsx
const educationCode = `'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

const educationData = [
  {
    institution: 'Delhi Technological University (formerly DCE)',
    degree: 'B.Tech in Computer Science and Engineering',
    score: '8.7 CGPA (Semester 1)',
    period: '2025 - Present (2nd Year)',
    details: 'Focusing on Machine Learning, Deep Learning, Data Structures, and Computer Vision.',
    highlight: '8.7 CGPA',
    color: '#00f0ff',
  },
  {
    institution: 'Joint Entrance Examination (JEE)',
    degree: 'JEE Mains & JEE Advanced 2025',
    score: '99.46 Percentile',
    period: '2025',
    details: 'Secured 99.46%ile in JEE Mains and All India Rank 12,000 in JEE Advanced out of 1.4+ million candidates.',
    highlight: '99.46%ile · Top 0.5%',
    color: '#fbbf24',
  },
  {
    institution: 'Sardar Patel Vidyalaya, New Delhi',
    degree: 'CBSE Class XII (Senior Secondary)',
    score: '97.0%',
    period: '2025',
    details: 'Physics, Chemistry, Mathematics, Computer Science. Academic excellence with top honors.',
    highlight: '97.0%',
    color: '#ff2a85',
  },
  {
    institution: 'Sardar Patel Vidyalaya, New Delhi',
    degree: 'CBSE Class X (Secondary)',
    score: '96.8%',
    period: '2023',
    details: 'Excellence in Science and Mathematics foundation with outstanding scholastic performance.',
    highlight: '96.8%',
    color: '#4ade80',
  },
];

export function Education() {
  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        <div className="mb-14">
          <p className="text-xs font-mono uppercase tracking-widest text-[#00f0ff] mb-3">
            02 // Academic Track
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Education<span className="text-[#ff2a85]">.</span> Foundation<span className="text-[#00f0ff]">.</span> Growth<span className="text-[#fbbf24]">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-6 rounded-2xl bg-[#140a28]/85 border border-[#a855f7]/30 hover:border-[#00f0ff]/60 shadow-[0_0_25px_rgba(168,85,247,0.15)] backdrop-blur-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#1e0f3d] border border-[#a855f7]/40 text-[#c084fc]">
                    0{index + 1}
                  </span>
                  <span className="text-xs font-mono text-[#fbbf24] font-semibold">
                    {item.period}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{item.institution}</h3>
                <p className="text-sm font-medium text-[#00f0ff] mb-3">{item.degree}</p>
                <p className="text-xs text-[#a79bbd] leading-relaxed mb-4">{item.details}</p>
              </div>

              <div className="pt-4 border-t border-[#a855f7]/20 flex items-center justify-between">
                <span className="text-xs font-mono text-white/50">Score / Grade</span>
                <span className="text-sm font-mono font-bold text-[#ff2a85] bg-[#ff2a85]/10 px-2.5 py-1 rounded-md border border-[#ff2a85]/30">
                  {item.highlight}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
`;

// 2. components/skills.tsx
const skillsCode = `'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Cpu, Database, Wrench } from 'lucide-react';

const skillCategories = [
  {
    category: 'Languages',
    icon: <Code className="w-5 h-5 text-[#00f0ff]" />,
    skills: ['C', 'C++', 'Python', 'JavaScript', 'SQL'],
  },
  {
    category: 'ML / AI & Frameworks',
    icon: <Cpu className="w-5 h-5 text-[#ff2a85]" />,
    skills: [
      'Machine Learning',
      'Deep Learning',
      'Computer Vision',
      'NLP',
      'RAG Pipelines',
      'Generative AI',
      'Logic Tensor Networks',
      'PyTorch',
      'TensorFlow',
      'Scikit-learn',
      'OpenCV',
      'LangChain',
      'LangGraph',
      'FastAPI',
      'React',
    ],
  },
  {
    category: 'Developer Tools & Platforms',
    icon: <Wrench className="w-5 h-5 text-[#fbbf24]" />,
    skills: ['Git', 'GitHub', 'VS Code', 'Docker', 'Streamlit', 'ChromaDB', 'PostgreSQL', 'PostGIS'],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        <div className="mb-14">
          <p className="text-xs font-mono uppercase tracking-widest text-[#00f0ff] mb-3">
            03 // Tech Stack
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Technical Arsenal<span className="text-[#ff2a85]">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-[#140a28]/85 border border-[#a855f7]/30 hover:border-[#00f0ff]/50 shadow-[0_0_25px_rgba(168,85,247,0.15)] backdrop-blur-md transition-all flex flex-col"
            >
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-[#a855f7]/20">
                <div className="p-2.5 rounded-xl bg-[#1e0f3d] border border-[#a855f7]/40 shadow-inner">
                  {cat.icon}
                </div>
                <h3 className="text-base font-bold text-white">{cat.category}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono text-white/90 bg-[#1e0f3d]/70 border border-[#a855f7]/30 hover:border-[#00f0ff] hover:text-[#00f0ff] transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
`;

// 3. components/projects.tsx
const projectsCode = `'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RadialCarousel, ProjectItem } from './radial-carousel';
import { Orbit, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

function GithubIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

const resumeProjects: ProjectItem[] = [
  {
    id: 1,
    title: 'Gesture-Based Desktop Control System',
    type: 'Desktop App · Computer Vision',
    url: '/images/projects/gesture-control.png',
    description:
      'Built a real-time computer vision application using MediaPipe, OpenCV and CNNs to recognize static and dynamic hand gestures and control common desktop operations hands-free.',
    tags: ['MediaPipe', 'OpenCV', 'CNNs', 'Computer Vision'],
  },
  {
    id: 2,
    title: 'Digital Twin of a Scientist',
    type: 'RAG Chatbot · Generative AI',
    url: '/images/projects/digital-twin.png',
    description:
      'Created a chatbot on a RAG pipeline with ChromaDB and HuggingFace embeddings with long-term memory, temporal awareness, voice interaction to simulate personalized conversations and the scientist’s knowledge.',
    tags: ['RAG Pipeline', 'ChromaDB', 'HuggingFace', 'Voice Interaction'],
  },
  {
    id: 3,
    title: 'Neurosymbolic Biomass Prediction',
    type: 'Logic Tensor Networks · Multimodal',
    url: '/images/projects/biomass-prediction.png',
    description:
      'Developed a multimodal model combining image and metadata features using MobileNetV2 and EfficientNet-B0, with LTN-inspired soft logic constraints for biologically consistent predictions.',
    tags: ['MobileNetV2', 'EfficientNet-B0', 'Logic Tensor Networks', 'PyTorch'],
  },
  {
    id: 4,
    title: 'Semantic Segmentation for Off-Road Navigation',
    type: 'Deep Learning · Autonomous Systems',
    url: '/images/projects/semantic-segmentation.png',
    description:
      'Developed a semantic segmentation model for autonomous off-road navigation, achieving a mean IoU of 0.6094 and mAP50 of 0.60 across challenging desert environments with varying terrain conditions.',
    tags: ['Semantic Segmentation', 'mIoU 0.6094', 'mAP50 0.60', 'Autonomous Driving'],
  },
  {
    id: 5,
    title: 'VoiceSplit AI',
    type: 'Multi-Speaker Speech Separation · Audio ML',
    url: '/images/projects/voicesplit.png',
    description:
      'Built an end-to-end deep learning pipeline using fine-tuned DPRNN, VAD, SI-SDR based track pruning, and WOLA to automatically separate and enhance up to five overlapping speakers in noisy real-world audio.',
    tags: ['DPRNN', 'SI-SDR', 'Speech Processing', 'VAD'],
  },
  {
    id: 6,
    title: 'VeriGrid: Crowd-Verified Geospatial Platform',
    type: 'Full Stack App · Spatial Analytics',
    url: '/images/projects/verigrid.png',
    description:
      'Built a crowdsourced geospatial verification platform using FastAPI, PostgreSQL/PostGIS, and DBSCAN to aggregate citizen reports, verify spatial claims, and identify hazard clusters in real time.',
    tags: ['FastAPI', 'PostgreSQL', 'PostGIS', 'DBSCAN Spatial Clustering'],
  },
];

export function Projects() {
  const [viewMode, setViewMode] = useState<'radial' | 'grid'>('radial');

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-[#00f0ff] mb-3">
              04 // Selected Work
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Engineered for Impact<span className="text-[#ff2a85]">.</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 p-1 rounded-full bg-[#160a2c]/85 border border-[#a855f7]/30 backdrop-blur-md shadow-lg">
            <button
              onClick={() => setViewMode('radial')}
              className={\`px-4 py-1.5 rounded-full text-xs font-mono flex items-center gap-2 transition-all cursor-pointer \${
                viewMode === 'radial'
                  ? 'bg-gradient-to-r from-[#00f0ff] to-[#38bdf8] text-[#0a0515] font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-white/60 hover:text-white'
              }\`}
            >
              <Orbit className="w-3.5 h-3.5" />
              <span>Orbit View</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={\`px-4 py-1.5 rounded-full text-xs font-mono flex items-center gap-2 transition-all cursor-pointer \${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-[#ff2a85] to-[#9333ea] text-white font-bold shadow-[0_0_15px_rgba(255,42,133,0.4)]'
                  : 'text-white/60 hover:text-white'
              }\`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
          </div>
        </div>

        {viewMode === 'radial' ? (
          <div className="w-full">
            <RadialCarousel items={resumeProjects} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumeProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="p-6 rounded-2xl bg-[#140a28]/85 border border-[#a855f7]/30 hover:border-[#00f0ff]/50 shadow-[0_0_25px_rgba(168,85,247,0.15)] backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-[#00f0ff] font-bold">
                      0{index + 1}
                    </span>
                    <span className="text-[11px] font-mono text-[#ff2a85] font-semibold">
                      {project.type.split('·')[0]}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-xs text-[#a79bbd] leading-relaxed mb-4">{project.description}</p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#a855f7]/20">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono text-[#c084fc] bg-[#1e0f3d]/60 border border-[#a855f7]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
`;

// 4. components/experience.tsx
const experienceCode = `'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Trophy, Award, Users } from 'lucide-react';

const experiences = [
  {
    role: 'AI / GenAI Intern',
    organization: 'HCLTech',
    period: 'June 2026 - July 2026',
    description:
      'Evaluated and optimized RAG pipelines using Precision@K, Recall@K, MRR, NDCG, faithfulness, and context relevance. Worked across vector search, retrieval, reranking, and LLM-based response generation.',
    highlight: 'RAG & Vector Search Optimization',
    icon: <Briefcase className="w-5 h-5 text-[#00f0ff]" />,
  },
  {
    role: 'Winner - Render Track (Nagrik AI)',
    organization: 'SIH Decode @ IIIT Delhi',
    period: 'September 2026',
    description:
      'Built Nagrik AI, a citizen-facing AI assistant tackling civic grievance routing and spatial verification, winning the Render Track at SIH Decode.',
    highlight: '1st Place Hackathon Award',
    icon: <Trophy className="w-5 h-5 text-[#ff2a85]" />,
  },
  {
    role: 'Co-Head',
    organization: 'AIMS DTU (Artificial Intelligence & Machine Learning Society)',
    period: '2025 - Present',
    description:
      'Leading the official AI/ML Society of Delhi Technological University. Organizing workshops, hackathons, and research mentorship for 500+ student engineers.',
    highlight: 'Technical Leadership & Mentorship',
    icon: <Users className="w-5 h-5 text-[#fbbf24]" />,
  },
  {
    role: 'Vice-Captain',
    organization: 'DTU Football Team',
    period: '2025 - Present',
    description:
      'Gold Medalist at IIT BHU Sports Fest (2025) and Arena DTU (2025). Anchoring varsity defense and tournament tactical preparations.',
    highlight: '2x Gold Medalist',
    icon: <Award className="w-5 h-5 text-[#4ade80]" />,
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        <div className="mb-14">
          <p className="text-xs font-mono uppercase tracking-widest text-[#00f0ff] mb-3">
            05 // Trajectory & Leadership
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Experience & Milestones<span className="text-[#ff2a85]">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-6 rounded-2xl bg-[#140a28]/85 border border-[#a855f7]/30 hover:border-[#00f0ff]/50 shadow-[0_0_25px_rgba(168,85,247,0.15)] backdrop-blur-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-[#1e0f3d] border border-[#a855f7]/40 shadow-inner">
                    {exp.icon}
                  </div>
                  <span className="text-xs font-mono text-[#fbbf24] font-semibold">
                    {exp.period}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{exp.role}</h3>
                <p className="text-sm font-medium text-[#00f0ff] mb-3">{exp.organization}</p>
                <p className="text-xs text-[#a79bbd] leading-relaxed mb-4">{exp.description}</p>
              </div>

              <div className="pt-3 border-t border-[#a855f7]/20 flex items-center justify-between">
                <span className="text-xs font-mono text-white/50">Core Impact</span>
                <span className="text-xs font-mono font-bold text-[#c084fc] bg-[#1e0f3d] px-2.5 py-1 rounded-md border border-[#a855f7]/30">
                  {exp.highlight}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
`;

// 5. components/contact.tsx
const contactCode = `'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ExternalLink, ArrowUpRight } from 'lucide-react';

function GithubIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function LinkedinIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

function LeetcodeIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 4.818 3.655 5.928 5.928 0 0 0 3.328-.73 5.875 5.875 0 0 0 2.062-2.148l4.088-6.195a1.37 1.37 0 0 0-.28-1.897 1.376 1.376 0 0 0-1.921.28l-3.79 5.742a3.14 3.14 0 0 1-1.103 1.147 3.167 3.167 0 0 1-1.777.39 3.18 3.18 0 0 1-2.576-1.956 3.138 3.138 0 0 1-.033-1.264 3.104 3.104 0 0 1 .65-1.127l3.704-3.965 5.09-5.46A1.373 1.373 0 0 0 13.483 0z"/>
    </svg>
  );
}

export function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#140a28]/85 border border-[#a855f7]/40 shadow-[0_0_50px_rgba(168,85,247,0.25)] backdrop-blur-xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-xs font-mono uppercase tracking-widest text-[#00f0ff] mb-3">
              06 // Connect
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Let&apos;s Build Something <span className="text-[#ff2a85]">Extraordinary</span>.
            </h2>
            <p className="text-sm text-[#a79bbd]">
              Open for Machine Learning, Computer Vision, and Generative AI research collaborations & engineering roles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <a
              href="mailto:minochanavya08@gmail.com"
              className="p-4 rounded-2xl bg-[#1e0f3d]/70 border border-[#a855f7]/30 hover:border-[#00f0ff] transition-all flex flex-col items-center text-center group"
            >
              <Mail className="w-6 h-6 text-[#00f0ff] mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-mono text-white/50 mb-1">Email</span>
              <span className="text-xs font-bold text-white group-hover:text-[#00f0ff] transition-colors truncate max-w-full">
                minochanavya08@gmail.com
              </span>
            </a>

            <a
              href="tel:+919911021777"
              className="p-4 rounded-2xl bg-[#1e0f3d]/70 border border-[#a855f7]/30 hover:border-[#fbbf24] transition-all flex flex-col items-center text-center group"
            >
              <Phone className="w-6 h-6 text-[#fbbf24] mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-mono text-white/50 mb-1">Phone</span>
              <span className="text-xs font-bold text-white group-hover:text-[#fbbf24] transition-colors">
                +91 9911021777
              </span>
            </a>

            <div className="p-4 rounded-2xl bg-[#1e0f3d]/70 border border-[#a855f7]/30 flex flex-col items-center text-center">
              <MapPin className="w-6 h-6 text-[#ff2a85] mb-2" />
              <span className="text-xs font-mono text-white/50 mb-1">Location</span>
              <span className="text-xs font-bold text-white">New Delhi, India</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-[#a855f7]/20">
            <a
              href="https://linkedin.com/in/navyaminocha"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#1e0f3d] border border-[#a855f7]/40 hover:border-[#00f0ff] text-xs font-mono text-white hover:text-[#00f0ff] flex items-center gap-2 transition-all hover:scale-105 shadow-md"
            >
              <LinkedinIcon size={16} />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/NavyaMinocha"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#1e0f3d] border border-[#a855f7]/40 hover:border-[#ff2a85] text-xs font-mono text-white hover:text-[#ff2a85] flex items-center gap-2 transition-all hover:scale-105 shadow-md"
            >
              <GithubIcon size={16} />
              <span>GitHub</span>
            </a>

            <a
              href="https://leetcode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#1e0f3d] border border-[#a855f7]/40 hover:border-[#fbbf24] text-xs font-mono text-white hover:text-[#fbbf24] flex items-center gap-2 transition-all hover:scale-105 shadow-md"
            >
              <LeetcodeIcon size={16} />
              <span>LeetCode</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
`;

// 6. components/footer.tsx
const footerCode = `'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="py-8 border-t border-[#a855f7]/20 bg-[#0a0515]/90 backdrop-blur-xl relative z-20">
      <div className="container mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#a79bbd]">
        <p>© 2026 Navya Minocha · B.Tech CSE @ Delhi Technological University</p>
        <p className="text-[#00f0ff]">AI / ML · Computer Vision · Generative AI</p>
      </div>
    </footer>
  );
}
`;

fs.writeFileSync('components/education.tsx', educationCode, 'utf8');
fs.writeFileSync('components/skills.tsx', skillsCode, 'utf8');
fs.writeFileSync('components/projects.tsx', projectsCode, 'utf8');
fs.writeFileSync('components/experience.tsx', experienceCode, 'utf8');
fs.writeFileSync('components/contact.tsx', contactCode, 'utf8');
fs.writeFileSync('components/footer.tsx', footerCode, 'utf8');

console.log('Successfully updated all remaining portfolio components to Synthwave Retro Cyber theme!');
