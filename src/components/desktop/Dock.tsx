'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FolderGit2,
  User,
  Cpu,
  History,
  FileText,
  Sparkles,
  Terminal,
  Mail,
  Globe
} from 'lucide-react';
import { sound } from '@/lib/sound';
import { PORTFOLIO_DATA } from '@/data/portfolio';

export interface DockApp {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  isExternal?: boolean;
  url?: string;
}

interface DockProps {
  activeAppIds: string[];
  onOpenApp: (appId: string) => void;
  onToggleAI: () => void;
}

export const DOCK_APPS: DockApp[] = [
  {
    id: 'projects',
    name: 'Projects (Finder)',
    icon: <FolderGit2 className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'about',
    name: 'About Me',
    icon: <User className="w-6 h-6" />,
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'skills',
    name: 'Skills Matrix',
    icon: <Cpu className="w-6 h-6" />,
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'experience',
    name: 'Experience Timeline',
    icon: <History className="w-6 h-6" />,
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 'resume',
    name: 'Resume (Preview)',
    icon: <FileText className="w-6 h-6" />,
    color: 'from-rose-500 to-pink-500'
  },
  {
    id: 'ai-assistant',
    name: `${PORTFOLIO_DATA.owner.name}'s AI`,
    icon: <Sparkles className="w-6 h-6" />,
    color: 'from-cyan-400 via-indigo-500 to-purple-600'
  },
  {
    id: 'terminal',
    name: 'Terminal',
    icon: <Terminal className="w-6 h-6" />,
    color: 'from-slate-800 to-slate-950'
  },
  {
    id: 'contact',
    name: 'Mail Contact',
    icon: <Mail className="w-6 h-6" />,
    color: 'from-sky-500 to-blue-600'
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: <FolderGit2 className="w-6 h-6" />,
    color: 'from-zinc-700 to-zinc-900',
    isExternal: true,
    url: PORTFOLIO_DATA.owner.github
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: <Globe className="w-6 h-6" />,
    color: 'from-blue-600 to-blue-800',
    isExternal: true,
    url: PORTFOLIO_DATA.owner.linkedin
  }
];

export const Dock: React.FC<DockProps> = ({
  activeAppIds,
  onOpenApp,
  onToggleAI
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleClick = (app: DockApp) => {
    sound.playPop();
    if (app.isExternal && app.url) {
      window.open(app.url, '_blank', 'noopener,noreferrer');
      return;
    }
    if (app.id === 'ai-assistant') {
      onToggleAI();
      return;
    }
    onOpenApp(app.id);
  };

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 select-none max-w-[95vw]">
      <div className="flex items-center space-x-1 sm:space-x-2 px-3 py-2 rounded-2xl bg-slate-900/60 dark:bg-slate-950/70 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl shadow-black/60">
        {DOCK_APPS.map((app, idx) => {
          const isOpen = activeAppIds.includes(app.id);
          const isHovered = hoveredId === app.id;

          // Separator line before social links
          const showSeparator = idx === 8;

          return (
            <React.Fragment key={app.id}>
              {showSeparator && (
                <div className="w-[1px] h-8 bg-white/15 mx-1" />
              )}

              <div className="relative group">
                {/* Tooltip */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: -8 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-slate-900/90 text-white text-[11px] font-medium border border-white/10 backdrop-blur-md whitespace-nowrap shadow-lg pointer-events-none"
                  >
                    {app.name}
                  </motion.div>
                )}

                {/* Dock Icon */}
                <motion.button
                  whileHover={{ scale: 1.25, y: -6 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => {
                    sound.playClick();
                    setHoveredId(app.id);
                  }}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleClick(app)}
                  aria-label={app.name}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr ${app.color} text-white flex items-center justify-center shadow-lg transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400`}
                >
                  {app.icon}
                </motion.button>

                {/* Active Indicator Dot */}
                {isOpen && (
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mx-auto mt-1 shadow-sm shadow-cyan-400/50" />
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
