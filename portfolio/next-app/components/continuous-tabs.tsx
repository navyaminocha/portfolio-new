'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface TabItem {
  id: string;
  label: string;
}

interface ContinuousTabsProps {
  tabs: TabItem[];
  activeTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

export function ContinuousTabs({
  tabs,
  activeTab: controlledActiveTab,
  onChange,
  className = '',
}: ContinuousTabsProps) {
  const [active, setActive] = useState<string>(controlledActiveTab || tabs[0]?.id || '');

  useEffect(() => {
    if (controlledActiveTab !== undefined) {
      setActive(controlledActiveTab);
    }
  }, [controlledActiveTab]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const tab of tabs) {
        const el = document.getElementById(tab.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActive(tab.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tabs]);

  const handleTabClick = (tabId: string) => {
    setActive(tabId);
    onChange?.(tabId);

    const el = document.getElementById(tabId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (tabId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Portfolio sections"
      className={`inline-flex items-center p-1.5 rounded-full bg-[#12161a]/90 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] ${className}`}
    >
      <div className="flex items-center gap-1 relative">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`relative px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-colors duration-200 z-10 select-none ${
                isActive
                  ? 'text-[#0a0f12] font-semibold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="continuous-tab-active"
                  className="absolute inset-0 bg-[#eef2f3] rounded-full shadow-[0_2px_12px_rgba(255,255,255,0.25)] -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}