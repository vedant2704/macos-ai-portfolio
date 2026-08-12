'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Search,
  Wifi,
  Battery,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Command,
  Terminal,
  Cpu
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolio';
import { sound } from '@/lib/sound';

interface MenuBarProps {
  activeAppTitle?: string;
  onOpenSpotlight: () => void;
  onToggleAI: () => void;
  onOpenApp: (appId: string) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const MenuBar: React.FC<MenuBarProps> = ({
  activeAppTitle = 'Finder',
  onOpenSpotlight,
  onToggleAI,
  onOpenApp,
  theme,
  onToggleTheme
}) => {
  const [timeString, setTimeString] = useState<string>('');
  const [dateString, setDateString] = useState<string>('');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
      setDateString(
        now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSoundToggle = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  return (
    <header className="h-8 w-full bg-slate-950/70 dark:bg-slate-950/80 backdrop-blur-md border-b border-white/10 px-3 flex items-center justify-between text-xs font-medium text-slate-200 select-none z-50 fixed top-0 left-0 right-0 shadow-sm">
      {/* Left Menu Items */}
      <div className="flex items-center space-x-4">
        {/* Custom macOS Logo */}
        <button
          onClick={() => {
            sound.playPop();
            onOpenApp('about');
          }}
          className="flex items-center space-x-1.5 hover:text-white transition-colors group"
          title={`About ${PORTFOLIO_DATA.owner.name}`}
        >
          <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Cpu className="w-2.5 h-2.5 text-white" />
          </div>
          <span className="font-bold tracking-tight">{PORTFOLIO_DATA.owner.name}</span>
        </button>

        {/* Active Application Name */}
        <div className="hidden sm:flex items-center space-x-3 text-slate-400">
          <span className="text-white font-semibold">{activeAppTitle}</span>
          <button
            onClick={() => onOpenApp('projects')}
            className="hover:text-slate-200 transition-colors"
          >
            File
          </button>
          <button
            onClick={() => onOpenApp('skills')}
            className="hover:text-slate-200 transition-colors"
          >
            View
          </button>
          <button
            onClick={() => onOpenApp('terminal')}
            className="hover:text-slate-200 transition-colors flex items-center space-x-1"
          >
            <Terminal className="w-3 h-3" />
            <span>Terminal</span>
          </button>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3 text-slate-300">
        {/* Spotlight Search Trigger */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenSpotlight();
          }}
          className="flex items-center space-x-1 hover:text-white px-1.5 py-0.5 rounded hover:bg-white/10 transition-colors"
          title="Spotlight Search (Cmd+K)"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden md:inline text-[10px] text-slate-400 bg-white/10 px-1 py-0.2 rounded font-mono">
            <Command className="w-2.5 h-2.5 inline mr-0.5" />K
          </span>
        </button>

        {/* AI Assistant Quick Toggle */}
        <button
          onClick={() => {
            sound.playPop();
            onToggleAI();
          }}
          className="flex items-center space-x-1 hover:text-cyan-300 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-semibold transition-all hover:bg-cyan-500/20"
          title="AI Assistant Concierge"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
          <span className="hidden sm:inline text-[11px]">AI Concierge</span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={handleSoundToggle}
          className="hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-rose-400" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
          )}
        </button>

        {/* Dark/Light Theme Switcher */}
        <button
          onClick={() => {
            sound.playClick();
            onToggleTheme();
          }}
          className="hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? (
            <Sun className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <Moon className="w-3.5 h-3.5 text-indigo-400" />
          )}
        </button>

        {/* System Indicators */}
        <div className="hidden md:flex items-center space-x-2 border-l border-white/10 pl-3">
          <Wifi className="w-3.5 h-3.5 text-slate-400" />
          <Battery className="w-3.5 h-3.5 text-emerald-400" />
        </div>

        {/* Live Clock */}
        <div className="text-right pl-1">
          <span className="mr-1.5 text-slate-400 hidden sm:inline">{dateString}</span>
          <span className="font-semibold text-white">{timeString}</span>
        </div>
      </div>
    </header>
  );
};
