'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';

interface NavbarProps {
  onOpenTerminal?: () => void;
}

export default function Navbar({ onOpenTerminal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#060710]/85 backdrop-blur-md border-b border-[#7f8cf8]/20 py-3 shadow-lg shadow-[#060710]/80'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo / Brand with Periwinkle Badge */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-[#12152d] border border-[#7f8cf8]/40 flex items-center justify-center font-mono font-bold text-sm text-[#b9c2ff] group-hover:border-[#b9c2ff] group-hover:shadow-[0_0_15px_rgba(185,194,255,0.4)] transition-all">
            NM
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-sm font-bold tracking-tight text-[#b9c2ff] group-hover:text-white transition-colors">
              NAVYA MINOCHA
            </span>
            <span className="font-mono text-[10px] text-[#7f8cf8] tracking-widest">
              AI / ML ENGINEER
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0d0f20]/80 border border-[#7f8cf8]/20 rounded-full px-4 py-1.5 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-[#707cb8] hover:text-[#b9c2ff] hover:bg-[#7f8cf8]/15 transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Button & Terminal Launcher */}
        <div className="hidden md:flex items-center gap-3">
          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#7f8cf8]/40 bg-[#12152d] text-xs font-mono text-[#b9c2ff] hover:border-[#b9c2ff] hover:bg-[#7f8cf8]/20 transition-all cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-[#7f8cf8]" />
              <span>CRT HUD</span>
            </button>
          )}
          <a
            href="#contact"
            className="px-4 py-1.5 rounded-lg bg-[#7f8cf8] text-[#060710] font-mono text-xs font-bold hover:bg-[#b9c2ff] hover:shadow-[0_0_20px_rgba(185,194,255,0.5)] transition-all"
          >
            CONNECT
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg border border-[#7f8cf8]/30 bg-[#12152d] text-[#b9c2ff]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#0a0c1a] border-b border-[#7f8cf8]/30 px-6 py-4 flex flex-col gap-3"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-sm font-mono text-[#707cb8] hover:text-[#b9c2ff] border-b border-[#7f8cf8]/10"
            >
              {link.name}
            </a>
          ))}
          {onOpenTerminal && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="flex items-center justify-center gap-2 py-2 mt-2 rounded border border-[#7f8cf8] bg-[#12152d] text-xs font-mono text-[#b9c2ff]"
            >
              <Terminal className="w-4 h-4" />
              OPEN CRT HUD OS
            </button>
          )}
        </motion.div>
      )}
    </header>
  );
}
