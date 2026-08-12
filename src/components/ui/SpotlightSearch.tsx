'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FolderGit2, User, Cpu, History, FileText, Sparkles, Terminal, Mail, ArrowRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolio';
import { sound } from '@/lib/sound';

interface SpotlightSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (appId: string) => void;
}

export const SpotlightSearch: React.FC<SpotlightSearchProps> = ({
  isOpen,
  onClose,
  onOpenApp
}) => {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        sound.playClick();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const allItems = [
    { id: 'about', title: `About ${PORTFOLIO_DATA.owner.name}`, type: 'App', icon: <User className="w-4 h-4 text-purple-400" /> },
    { id: 'projects', title: 'Projects (Finder Browser)', type: 'App', icon: <FolderGit2 className="w-4 h-4 text-cyan-400" /> },
    { id: 'skills', title: 'Technical Skills Matrix', type: 'App', icon: <Cpu className="w-4 h-4 text-emerald-400" /> },
    { id: 'experience', title: 'Experience Timeline', type: 'App', icon: <History className="w-4 h-4 text-amber-400" /> },
    { id: 'resume', title: 'Resume Preview Document', type: 'App', icon: <FileText className="w-4 h-4 text-rose-400" /> },
    { id: 'ai-assistant', title: 'AI Concierge Assistant', type: 'App', icon: <Sparkles className="w-4 h-4 text-cyan-300" /> },
    { id: 'terminal', title: 'Terminal Emulator', type: 'App', icon: <Terminal className="w-4 h-4 text-slate-300" /> },
    { id: 'contact', title: 'Mail Contact Form', type: 'App', icon: <Mail className="w-4 h-4 text-sky-400" /> },
    ...PORTFOLIO_DATA.projects.map((p) => ({
      id: 'projects',
      title: p.title,
      type: 'Project',
      icon: <FolderGit2 className="w-4 h-4 text-blue-400" />
    }))
  ];

  const results = allItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-start justify-center pt-24 px-4 select-none">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: -10 }}
          className="w-full max-w-xl bg-slate-900/90 border border-white/20 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl text-white font-sans"
        >
          {/* Search Input Bar */}
          <div className="p-4 border-b border-white/10 flex items-center space-x-3">
            <Search className="w-5 h-5 text-cyan-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Spotlight Search portfolio, projects, skills, or apps..."
              className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
              autoFocus
            />
            <button
              onClick={onClose}
              className="text-[10px] text-slate-400 bg-white/10 px-2 py-1 rounded font-mono"
            >
              ESC
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-72 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {results.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No matching results found in Spotlight index.
              </div>
            ) : (
              results.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playPop();
                    onOpenApp(item.id);
                    onClose();
                  }}
                  className="w-full p-2.5 rounded-xl hover:bg-white/10 flex items-center justify-between transition-colors group text-left"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-white/10 group-hover:scale-105 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-slate-400">{item.type}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-300 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
