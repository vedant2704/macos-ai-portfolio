'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PORTFOLIO_DATA } from '@/data/portfolio';
import { AboutApp } from '@/components/apps/AboutApp';
import { ProjectsApp } from '@/components/apps/ProjectsApp';
import { SkillsApp } from '@/components/apps/SkillsApp';
import { ExperienceApp } from '@/components/apps/ExperienceApp';
import { ResumeApp } from '@/components/apps/ResumeApp';
import { ContactApp } from '@/components/apps/ContactApp';
import { TerminalApp } from '@/components/apps/TerminalApp';
import { AIAssistantApp } from '@/components/apps/AIAssistantApp';
import { User, FolderGit2, Cpu, History, FileText, Sparkles, Mail, Terminal, Sun, Moon, Search } from 'lucide-react';
import { sound } from '@/lib/sound';

interface MobileLayoutProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenSpotlight: () => void;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({
  theme,
  onToggleTheme,
  onOpenSpotlight
}) => {
  const [activeTab, setActiveTab] = useState<string>('about');
  const [projectCategoryFilter, setProjectCategoryFilter] = useState<string>('all');

  const handleExecuteAIAction = (action: { type: string; target: string }) => {
    if (action.type === 'OPEN_WINDOW') {
      setActiveTab(action.target);
    } else if (action.type === 'FILTER_PROJECTS') {
      setProjectCategoryFilter(action.target);
      setActiveTab('projects');
    }
  };

  const navItems = [
    { id: 'about', label: 'About', icon: <User className="w-5 h-5" /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-5 h-5" /> },
    { id: 'ai-assistant', label: `${PORTFOLIO_DATA.owner.name}'s AI`, icon: <Sparkles className="w-5 h-5 text-cyan-400" /> },
    { id: 'skills', label: 'Skills', icon: <Cpu className="w-5 h-5" /> },
    { id: 'experience', label: 'Experience', icon: <History className="w-5 h-5" /> },
    { id: 'resume', label: 'Resume', icon: <FileText className="w-5 h-5" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none pb-20">
      {/* Compact Header Bar */}
      <header className="h-14 px-4 bg-slate-900/90 border-b border-white/10 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-cyan-500/40">
            <Image src={PORTFOLIO_DATA.owner.avatarUrl} alt="Avatar" fill className="object-cover" />
          </div>
          <div>
            <h1 className="font-extrabold text-white text-sm leading-tight">{PORTFOLIO_DATA.owner.name}</h1>
            <p className="text-[10px] text-cyan-400 font-medium">macOS AI Portfolio</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              sound.playClick();
              onOpenSpotlight();
            }}
            className="p-2 rounded-xl bg-white/10 text-slate-300 hover:text-white"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onToggleTheme();
            }}
            className="p-2 rounded-xl bg-white/10 text-slate-300 hover:text-white"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>
        </div>
      </header>

      {/* Main Panel Content */}
      <main className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'about' && (
          <AboutApp onOpenApp={(appId) => setActiveTab(appId)} onToggleAI={() => setActiveTab('ai-assistant')} />
        )}
        {activeTab === 'projects' && <ProjectsApp initialCategory={projectCategoryFilter} />}
        {activeTab === 'ai-assistant' && <AIAssistantApp onExecuteAction={handleExecuteAIAction} />}
        {activeTab === 'skills' && <SkillsApp />}
        {activeTab === 'experience' && <ExperienceApp />}
        {activeTab === 'resume' && <ResumeApp />}
        {activeTab === 'contact' && <ContactApp />}
        {activeTab === 'terminal' && <TerminalApp onOpenApp={(appId) => setActiveTab(appId)} />}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-slate-900/95 border-t border-white/10 px-2 flex items-center justify-around z-40 backdrop-blur-xl">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                sound.playPop();
                setActiveTab(item.id);
              }}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                isActive ? 'text-cyan-400 scale-105 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.icon}
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
