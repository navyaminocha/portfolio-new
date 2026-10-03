'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Orbit, Grid } from 'lucide-react';
import RadialCarousel from '@/components/radial-carousel';

export function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export interface ProjectData {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  githubUrl: string;
  image: string;
}

export const projectsList: ProjectData[] = [
  {
    id: 'gesture-control',
    number: '01',
    title: 'Gesture-Based Desktop Control System',
    category: 'Computer Vision & Deep Learning',
    image: '/images/projects/gesture-control.png',
    description: 'Built a real-time computer vision application using MediaPipe, OpenCV, and CNNs to recognize static and dynamic hand gestures, controlling common desktop operations completely hands-free.',
    tags: ['MediaPipe', 'OpenCV', 'CNN', 'Computer Vision'],
    githubUrl: 'https://github.com/NavyaMinocha/desktop_gesture',
  },
  {
    id: 'digital-twin',
    number: '02',
    title: 'Digital Twin of a Scientist',
    category: 'RAG & Conversational AI',
    image: '/images/projects/digital-twin.png',
    description: 'Created a chatbot on a RAG pipeline with ChromaDB and HuggingFace embeddings with long-term memory, temporal awareness, and voice interaction to simulate personalized conversations.',
    tags: ['RAG', 'ChromaDB', 'HuggingFace', 'LangChain'],
    githubUrl: 'https://github.com/NavyaMinocha/digital_twin',
  },
  {
    id: 'biomass-ltn',
    number: '03',
    title: 'Neurosymbolic Biomass Prediction',
    category: 'Logic Tensor Networks',
    image: '/images/projects/biomass-prediction.png',
    description: 'Developed a multimodal model combining image and metadata features using MobileNetV2 and EfficientNet-B0, with LTN-inspired soft logic constraints for biologically consistent predictions.',
    tags: ['MobileNetV2', 'EfficientNet', 'LTN', 'Multimodal'],
    githubUrl: 'https://github.com/NavyaMinocha/ltn',
  },
  {
    id: 'off-road-seg',
    number: '04',
    title: 'Semantic Segmentation for Off-Road Navigation',
    category: 'Autonomous Perception',
    image: '/images/projects/semantic-segmentation.png',
    description: 'Developed a semantic segmentation model for autonomous off-road navigation, achieving mean IoU of 0.6094 and mAP50 of 0.60 across challenging unstructured desert environments.',
    tags: ['Segmentation', 'Autonomous', 'Deep Learning', 'PyTorch'],
    githubUrl: 'https://github.com/NavyaMinocha',
  },
  {
    id: 'voicesplit-ai',
    number: '05',
    title: 'VoiceSplit AI: Speech Separation',
    category: 'Audio ML & DSP',
    image: '/images/projects/voicesplit.png',
    description: 'Built an end-to-end deep learning pipeline using fine-tuned DPRNN, VAD, SI-SDR based track pruning, and WOLA to separate and enhance up to five overlapping speakers.',
    tags: ['DPRNN', 'Speech Processing', 'Audio ML', 'VAD'],
    githubUrl: 'https://github.com/NavyaMinocha/VoiceSplit-AI',
  },
  {
    id: 'verigrid',
    number: '06',
    title: 'VeriGrid: Crowd-Verified Geospatial Platform',
    category: 'Full-Stack Geospatial ML',
    image: '/images/neural-nebula.png',
    description: 'Built a crowdsourced geospatial verification platform using FastAPI, PostgreSQL/PostGIS, and DBSCAN clustering to aggregate citizen reports and identify disaster/hazard clusters.',
    tags: ['FastAPI', 'PostgreSQL', 'PostGIS', 'DBSCAN'],
    githubUrl: 'https://github.com/NavyaMinocha',
  },
];

export default function Projects() {
  const [viewMode, setViewMode] = useState<'orbit' | 'grid'>('orbit');

  return (
    <section id="projects" className="relative py-24 px-6 bg-[#060710]/70">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header with Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#7f8cf8] uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b9c2ff]" />
              <span>04 // FEATURED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Selected <span className="text-[#b9c2ff]">Projects</span>
            </h2>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl border border-[#7f8cf8]/40 bg-[#0d0f20]/90 backdrop-blur-md">
            <button
              onClick={() => setViewMode('orbit')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'orbit'
                  ? 'bg-[#7f8cf8] text-[#060710] shadow-[0_0_15px_rgba(127,140,248,0.4)] font-bold'
                  : 'text-[#707cb8] hover:text-[#b9c2ff]'
              }`}
            >
              <Orbit className="w-4 h-4" />
              <span>3D ORBIT VIEW</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#7f8cf8] text-[#060710] shadow-[0_0_15px_rgba(127,140,248,0.4)] font-bold'
                  : 'text-[#707cb8] hover:text-[#b9c2ff]'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>GRID VIEW</span>
            </button>
          </div>
        </div>

        {/* 3D Orbit View */}
        {viewMode === 'orbit' && (
          <div className="relative w-full overflow-hidden">
            <RadialCarousel projects={projectsList} />
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsList.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-0 rounded-2xl border border-[#7f8cf8]/30 bg-[#0d0f20]/80 backdrop-blur-md flex flex-col justify-between overflow-hidden hover:border-[#b9c2ff] hover:shadow-[0_0_25px_rgba(127,140,248,0.25)] transition-all group"
              >
                {/* Project Image */}
                <div className="relative w-full h-48 bg-[#060710] overflow-hidden border-b border-[#7f8cf8]/20">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/neural-nebula.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f20] via-transparent to-transparent opacity-75" />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#060710]/90 border border-[#7f8cf8]/50 font-mono text-[10px] font-bold text-[#b9c2ff]">
                    // {project.number}
                  </div>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 p-1.5 rounded-lg border border-[#7f8cf8]/50 bg-[#060710]/90 text-[#b9c2ff] hover:border-[#b9c2ff] hover:bg-[#7f8cf8]/30 transition-all"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-mono text-base font-bold text-white group-hover:text-[#b9c2ff] transition-colors">
                        {project.title}
                      </h3>
                      <p className="font-mono text-[11px] text-[#7f8cf8] mt-0.5">{project.category}</p>
                    </div>

                    <p className="text-xs text-[#707cb8] leading-relaxed line-clamp-3">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#7f8cf8]/20">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded border border-[#7f8cf8]/30 bg-[#12152d] font-mono text-[10px] text-[#b9c2ff]"
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
