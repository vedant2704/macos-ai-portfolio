'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, FolderGit2, FileText, Mail, Terminal } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolio';
import { sound } from '@/lib/sound';

interface DesktopBackgroundProps {
  onOpenApp: (appId: string) => void;
  onToggleAI: () => void;
}

export const DesktopBackground: React.FC<DesktopBackgroundProps> = ({
  onOpenApp,
  onToggleAI
}) => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-0">
      {/* Background Wallpaper Image */}
      <div className="absolute inset-0 w-full h-full bg-slate-950">
        <Image
          src="/assets/wallpaper.png"
          alt="macOS Sonoma Wallpaper"
          fill
          priority
          className="object-cover object-center opacity-85 scale-[1.02] filter transition-all duration-1000"
        />
      </div>

      {/* Ambient Lighting & Mesh Blob Overlays */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-[120px] animate-pulse" />
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full filter blur-[140px]" />
      <div className="absolute -bottom-40 left-1/3 w-[600px] h-[400px] bg-amber-500/10 rounded-full filter blur-[160px]" />

      {/* Desktop Grid Layout with Hero & Shortcut Badges */}
      <div className="relative z-10 w-full h-full pt-16 pb-24 px-6 md:px-12 flex flex-col justify-between pointer-events-auto">
        {/* Top Hero Greeting */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl bg-slate-950/40 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-4"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>{PORTFOLIO_DATA.owner.status}</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
              Hi, I&apos;m <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">{PORTFOLIO_DATA.owner.name}</span>.
            </h1>
            <p className="text-lg sm:text-xl font-medium text-slate-300">
              {PORTFOLIO_DATA.owner.title}
            </p>
          </div>

          <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
            {PORTFOLIO_DATA.owner.tagline} Explore my macOS-inspired desktop workspace or ask my AI Concierge for a guided tour.
          </p>

          {/* Hero Quick Action Buttons */}
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => {
                sound.playPop();
                onToggleAI();
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center space-x-2 shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.03] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask Vedant's AI</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenApp('projects');
              }}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold text-xs sm:text-sm flex items-center space-x-2 backdrop-blur-md transition-all hover:scale-[1.03]"
            >
              <FolderGit2 className="w-4 h-4 text-cyan-400" />
              <span>Explore Projects</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenApp('resume');
              }}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold text-xs sm:text-sm flex items-center space-x-2 backdrop-blur-md transition-all hover:scale-[1.03]"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Resume</span>
            </button>
          </div>
        </motion.div>

        {/* Desktop Quick Shortcuts (Folder Style Badges) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden md:flex justify-end space-x-4"
        >
          <button
            onClick={() => {
              sound.playClick();
              onOpenApp('contact');
            }}
            className="w-28 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center space-y-2 text-slate-300 hover:text-white transition-all group hover:scale-105"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold">Mail Contact</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenApp('terminal');
            }}
            className="w-28 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center space-y-2 text-slate-300 hover:text-white transition-all group hover:scale-105"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Terminal className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold">Terminal</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};
