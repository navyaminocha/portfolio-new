'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Cpu, 
  Database, 
  Terminal, 
  Layers, 
  Brain, 
  Sparkles, 
  Box, 
  GitBranch, 
  Server, 
  Globe, 
  Flame, 
  Binary, 
  Workflow,
  Eye,
  Radio,
  FileCode
} from 'lucide-react';

interface TechItem {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  row: number; // For diamond placement
  col: number;
}

const technologies: TechItem[] = [
  // Row 1 (Top tip of diamond)
  {
    id: 'python',
    name: 'Python',
    category: 'Core Language',
    description: 'Primary language for Deep Learning, PyTorch, RAG architectures & CV.',
    icon: <Code2 className="w-5 h-5 text-[#b9c2ff]" />,
    row: 0,
    col: 2,
  },

  // Row 2 (3 items)
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'Deep Learning',
    description: 'Custom neural architectures, CNNs, DPRNN speech separation & loss functions.',
    icon: <Flame className="w-5 h-5 text-[#7f8cf8]" />,
    row: 1,
    col: 1,
  },
  {
    id: 'deeplearning',
    name: 'Neural Nets / DL',
    category: 'Machine Learning',
    description: 'CNNs, Transformers, Logic Tensor Networks, Semantic Segmentation.',
    icon: <Brain className="w-5 h-5 text-[#b9c2ff]" />,
    row: 1,
    col: 2,
  },
  {
    id: 'opencv',
    name: 'OpenCV & CV',
    category: 'Computer Vision',
    description: 'Real-time image processing, MediaPipe tracking & optical algorithms.',
    icon: <Eye className="w-5 h-5 text-[#7f8cf8]" />,
    row: 1,
    col: 3,
  },

  // Row 3 (5 items - widest row)
  {
    id: 'cpp',
    name: 'C / C++',
    category: 'Core Language',
    description: 'High-performance computing, data structures & low-latency algorithms.',
    icon: <Binary className="w-5 h-5 text-[#707cb8]" />,
    row: 2,
    col: 0,
  },
  {
    id: 'langchain',
    name: 'LangChain & RAG',
    category: 'Generative AI',
    description: 'Multi-agent pipelines, temporal RAG, ChromaDB & vector retrieval.',
    icon: <Workflow className="w-5 h-5 text-[#b9c2ff]" />,
    row: 2,
    col: 1,
  },
  {
    id: 'dtu-core',
    name: 'AI / ML Core',
    category: 'Center Hub',
    description: 'Delhi Technological University - AI/ML Specialization & System Design.',
    icon: <Sparkles className="w-6 h-6 text-[#b9c2ff]" />,
    row: 2,
    col: 2,
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'Backend & APIs',
    description: 'Asynchronous microservices, ML model serving & PostGIS backend.',
    icon: <Server className="w-5 h-5 text-[#7f8cf8]" />,
    row: 2,
    col: 3,
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'DevOps & Tooling',
    description: 'Containerized deployment pipelines & reproducible ML environments.',
    icon: <Box className="w-5 h-5 text-[#707cb8]" />,
    row: 2,
    col: 4,
  },

  // Row 4 (3 items)
  {
    id: 'tensorflow',
    name: 'TensorFlow',
    category: 'Machine Learning',
    description: 'Model optimization, quantization & edge deployment pipelines.',
    icon: <Cpu className="w-5 h-5 text-[#7f8cf8]" />,
    row: 3,
    col: 1,
  },
  {
    id: 'postgres',
    name: 'PostgreSQL / PostGIS',
    category: 'Database & Spatial',
    description: 'Geospatial indexing, DBSCAN clustering & spatial SQL queries.',
    icon: <Database className="w-5 h-5 text-[#b9c2ff]" />,
    row: 3,
    col: 2,
  },
  {
    id: 'react',
    name: 'React / Next.js',
    category: 'Web & UI',
    description: 'Interactive dashboards, real-time client state & data visualization.',
    icon: <Globe className="w-5 h-5 text-[#7f8cf8]" />,
    row: 3,
    col: 3,
  },

  // Row 5 (Bottom tip of diamond)
  {
    id: 'git',
    name: 'Git / Linux',
    category: 'Infrastructure',
    description: 'Version control, bash scripting & Linux server administration.',
    icon: <GitBranch className="w-5 h-5 text-[#b9c2ff]" />,
    row: 4,
    col: 2,
  },
];

export default function Skills() {
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(technologies[6]); // Default center

  return (
    <section id="skills" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#7f8cf8] uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b9c2ff]" />
            <span>03 // TECHNICAL ARSENAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Integrated <span className="text-[#b9c2ff]">Stack Matrix</span>
          </h2>
          <p className="text-sm text-[#707cb8]">
            Hover or tap any node in the matrix to inspect architecture role & capabilities.
          </p>
        </div>

        {/* Diamond Matrix Container (from Reference Format) */}
        <div className="relative flex flex-col items-center justify-center py-6">
          {/* Subtle Ambient HUD Glow behind matrix */}
          <div className="absolute w-96 h-96 rounded-full bg-[#7f8cf8]/10 blur-[100px] pointer-events-none" />

          {/* Matrix Grid Structure */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            {/* Row 0 (1 item) */}
            <div className="flex items-center justify-center gap-3">
              {technologies.filter(t => t.row === 0).map(t => (
                <TechNode key={t.id} tech={t} active={hoveredTech?.id === t.id} onHover={() => setHoveredTech(t)} />
              ))}
            </div>

            {/* Row 1 (3 items) */}
            <div className="flex items-center justify-center gap-3">
              {technologies.filter(t => t.row === 1).map(t => (
                <TechNode key={t.id} tech={t} active={hoveredTech?.id === t.id} onHover={() => setHoveredTech(t)} />
              ))}
            </div>

            {/* Row 2 (5 items - center row) */}
            <div className="flex items-center justify-center gap-3">
              {technologies.filter(t => t.row === 2).map(t => (
                <TechNode key={t.id} tech={t} active={hoveredTech?.id === t.id} onHover={() => setHoveredTech(t)} />
              ))}
            </div>

            {/* Row 3 (3 items) */}
            <div className="flex items-center justify-center gap-3">
              {technologies.filter(t => t.row === 3).map(t => (
                <TechNode key={t.id} tech={t} active={hoveredTech?.id === t.id} onHover={() => setHoveredTech(t)} />
              ))}
            </div>

            {/* Row 4 (1 item) */}
            <div className="flex items-center justify-center gap-3">
              {technologies.filter(t => t.row === 4).map(t => (
                <TechNode key={t.id} tech={t} active={hoveredTech?.id === t.id} onHover={() => setHoveredTech(t)} />
              ))}
            </div>
          </div>

          {/* Detailed Info Card for Hovered Technology */}
          <div className="w-full max-w-md mt-10 min-h-[90px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {hoveredTech && (
                <motion.div
                  key={hoveredTech.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="w-full p-4 rounded-2xl border border-[#7f8cf8]/50 bg-[#0d0f20]/90 backdrop-blur-md shadow-[0_0_30px_rgba(127,140,248,0.25)] flex items-center gap-4"
                >
                  <div className="p-3 rounded-xl border border-[#7f8cf8]/40 bg-[#12152d] text-[#b9c2ff] shadow-inner">
                    {hoveredTech.icon}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-mono text-sm font-bold text-white">
                        {hoveredTech.name}
                      </h4>
                      <span className="font-mono text-[10px] text-[#7f8cf8] uppercase tracking-wider font-semibold">
                        {hoveredTech.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#707cb8] leading-relaxed">
                      {hoveredTech.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function TechNode({
  tech,
  active,
  onHover,
}: {
  tech: TechItem;
  active: boolean;
  onHover: () => void;
}) {
  return (
    <motion.button
      onMouseEnter={onHover}
      onClick={onHover}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
        active
          ? 'bg-[#12152d] border-2 border-[#b9c2ff] shadow-[0_0_25px_rgba(185,194,255,0.5)] ring-2 ring-[#7f8cf8]/40'
          : 'bg-[#0d0f20]/90 border border-[#7f8cf8]/30 hover:border-[#7f8cf8] hover:bg-[#12152d]/80 shadow-md'
      }`}
      title={tech.name}
    >
      <div className="transition-transform duration-200">
        {tech.icon}
      </div>
      <span className="font-mono text-[9px] text-[#707cb8] mt-1 line-clamp-1 max-w-[48px] text-center">
        {tech.name}
      </span>
      {active && (
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#b9c2ff] animate-ping" />
      )}
    </motion.button>
  );
}
