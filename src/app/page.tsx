'use client';

import React, { useState, useEffect } from 'react';
import { MenuBar } from '@/components/desktop/MenuBar';
import { DesktopBackground } from '@/components/desktop/DesktopBackground';
import { Dock, DOCK_APPS } from '@/components/desktop/Dock';
import { WindowFrame } from '@/components/desktop/WindowFrame';
import { AboutApp } from '@/components/apps/AboutApp';
import { ProjectsApp } from '@/components/apps/ProjectsApp';
import { SkillsApp } from '@/components/apps/SkillsApp';
import { ExperienceApp } from '@/components/apps/ExperienceApp';
import { ResumeApp } from '@/components/apps/ResumeApp';
import { ContactApp } from '@/components/apps/ContactApp';
import { TerminalApp } from '@/components/apps/TerminalApp';
import { AIAssistantApp } from '@/components/apps/AIAssistantApp';
import { SpotlightSearch } from '@/components/ui/SpotlightSearch';
import { MobileLayout } from '@/components/mobile/MobileLayout';
import { UIAction } from '@/lib/ai-engine';
import { sound } from '@/lib/sound';
import { User, FolderGit2, Cpu, History, FileText, Sparkles, Terminal, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolio';

export default function Home() {
  const [openWindows, setOpenWindows] = useState<string[]>(['about']);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [maximizedWindows, setMaximizedWindows] = useState<string[]>([]);
  const [windowStack, setWindowStack] = useState<string[]>(['about']);
  const [activeAppTitle, setActiveAppTitle] = useState<string>('About Me');
  const [isSpotlightOpen, setIsSpotlightOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [projectCategoryFilter, setProjectCategoryFilter] = useState<string>('all');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openApp = (appId: string) => {
    if (appId === 'github' || appId === 'linkedin') return;

    if (!openWindows.includes(appId)) {
      setOpenWindows((prev) => [...prev, appId]);
    }

    // Restore if minimized
    setMinimizedWindows((prev) => prev.filter((id) => id !== appId));

    // Bring to front
    bringToFront(appId);

    const appObj = DOCK_APPS.find((a) => a.id === appId);
    if (appObj) setActiveAppTitle(appObj.name);
  };

  const closeWindow = (appId: string) => {
    setOpenWindows((prev) => prev.filter((id) => id !== appId));
    setMinimizedWindows((prev) => prev.filter((id) => id !== appId));
    setMaximizedWindows((prev) => prev.filter((id) => id !== appId));
    setWindowStack((prev) => prev.filter((id) => id !== appId));

    const remaining = windowStack.filter((id) => id !== appId);
    if (remaining.length > 0) {
      const topId = remaining[remaining.length - 1];
      const topApp = DOCK_APPS.find((a) => a.id === topId);
      if (topApp) setActiveAppTitle(topApp.name);
    } else {
      setActiveAppTitle('Finder');
    }
  };

  const minimizeWindow = (appId: string) => {
    if (!minimizedWindows.includes(appId)) {
      setMinimizedWindows((prev) => [...prev, appId]);
    }
  };

  const toggleMaximizeWindow = (appId: string) => {
    if (maximizedWindows.includes(appId)) {
      setMaximizedWindows((prev) => prev.filter((id) => id !== appId));
    } else {
      setMaximizedWindows((prev) => [...prev, appId]);
    }
  };

  const bringToFront = (appId: string) => {
    setWindowStack((prev) => {
      const filtered = prev.filter((id) => id !== appId);
      return [...filtered, appId];
    });

    const appObj = DOCK_APPS.find((a) => a.id === appId);
    if (appObj) setActiveAppTitle(appObj.name);
  };

  const toggleAI = () => {
    openApp('ai-assistant');
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleExecuteAIAction = (action: UIAction) => {
    sound.playPop();
    if (action.type === 'OPEN_WINDOW') {
      openApp(action.target);
    } else if (action.type === 'FILTER_PROJECTS') {
      setProjectCategoryFilter(action.target);
      openApp('projects');
    } else if (action.type === 'TOGGLE_THEME') {
      toggleTheme();
    } else if (action.type === 'OPEN_LINK') {
      window.open(action.target, '_blank', 'noopener,noreferrer');
    }
  };

  if (isMobile) {
    return (
      <MobileLayout
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenSpotlight={() => setIsSpotlightOpen(true)}
      />
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''} bg-slate-950 font-sans antialiased select-none overflow-hidden`}>
      {/* Top Menu Bar */}
      <MenuBar
        activeAppTitle={activeAppTitle}
        onOpenSpotlight={() => setIsSpotlightOpen(true)}
        onToggleAI={toggleAI}
        onOpenApp={openApp}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Dynamic Desktop Wallpaper & Hero */}
      <DesktopBackground onOpenApp={openApp} onToggleAI={toggleAI} />

      {/* Application Windows Stack */}
      <div className="relative z-20">
        {/* About Window */}
        <WindowFrame
          id="about"
          title={`About ${PORTFOLIO_DATA.owner.name}`}
          icon={<User className="w-4 h-4 text-purple-400" />}
          isOpen={openWindows.includes('about')}
          isMinimized={minimizedWindows.includes('about')}
          isMaximized={maximizedWindows.includes('about')}
          zIndex={10 + windowStack.indexOf('about')}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={toggleMaximizeWindow}
          onFocus={bringToFront}
        >
          <AboutApp onOpenApp={openApp} onToggleAI={toggleAI} />
        </WindowFrame>

        {/* Projects Finder Window */}
        <WindowFrame
          id="projects"
          title="Projects — Finder"
          icon={<FolderGit2 className="w-4 h-4 text-cyan-400" />}
          isOpen={openWindows.includes('projects')}
          isMinimized={minimizedWindows.includes('projects')}
          isMaximized={maximizedWindows.includes('projects')}
          zIndex={10 + windowStack.indexOf('projects')}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={toggleMaximizeWindow}
          onFocus={bringToFront}
          defaultWidth="max-w-5xl w-[92vw] sm:w-[88vw] md:w-[880px]"
        >
          <ProjectsApp initialCategory={projectCategoryFilter} />
        </WindowFrame>

        {/* Skills Window */}
        <WindowFrame
          id="skills"
          title="Skills & Systems Taxonomy"
          icon={<Cpu className="w-4 h-4 text-emerald-400" />}
          isOpen={openWindows.includes('skills')}
          isMinimized={minimizedWindows.includes('skills')}
          isMaximized={maximizedWindows.includes('skills')}
          zIndex={10 + windowStack.indexOf('skills')}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={toggleMaximizeWindow}
          onFocus={bringToFront}
        >
          <SkillsApp />
        </WindowFrame>

        {/* Experience Timeline Window */}
        <WindowFrame
          id="experience"
          title="Career Timeline & Activity Log"
          icon={<History className="w-4 h-4 text-amber-400" />}
          isOpen={openWindows.includes('experience')}
          isMinimized={minimizedWindows.includes('experience')}
          isMaximized={maximizedWindows.includes('experience')}
          zIndex={10 + windowStack.indexOf('experience')}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={toggleMaximizeWindow}
          onFocus={bringToFront}
        >
          <ExperienceApp />
        </WindowFrame>

        {/* Resume Preview Window */}
        <WindowFrame
          id="resume"
          title={`${PORTFOLIO_DATA.owner.name.replace(/\s+/g, "_")}_Resume.pdf — Preview`}
          icon={<FileText className="w-4 h-4 text-rose-400" />}
          isOpen={openWindows.includes('resume')}
          isMinimized={minimizedWindows.includes('resume')}
          isMaximized={maximizedWindows.includes('resume')}
          zIndex={10 + windowStack.indexOf('resume')}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={toggleMaximizeWindow}
          onFocus={bringToFront}
          defaultWidth="max-w-4xl w-[92vw] sm:w-[85vw] md:w-[820px]"
        >
          <ResumeApp />
        </WindowFrame>

        {/* Mail Contact Window */}
        <WindowFrame
          id="contact"
          title={`Mail — Contact ${PORTFOLIO_DATA.owner.name}`}
          icon={<Mail className="w-4 h-4 text-sky-400" />}
          isOpen={openWindows.includes('contact')}
          isMinimized={minimizedWindows.includes('contact')}
          isMaximized={maximizedWindows.includes('contact')}
          zIndex={10 + windowStack.indexOf('contact')}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={toggleMaximizeWindow}
          onFocus={bringToFront}
        >
          <ContactApp />
        </WindowFrame>

        {/* Terminal Window */}
        <WindowFrame
          id="terminal"
          title="zsh — 80x24"
          icon={<Terminal className="w-4 h-4 text-slate-300" />}
          isOpen={openWindows.includes('terminal')}
          isMinimized={minimizedWindows.includes('terminal')}
          isMaximized={maximizedWindows.includes('terminal')}
          zIndex={10 + windowStack.indexOf('terminal')}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={toggleMaximizeWindow}
          onFocus={bringToFront}
          defaultWidth="max-w-3xl w-[90vw] md:w-[720px]"
          defaultHeight="h-[60vh] max-h-[500px]"
        >
          <TerminalApp onOpenApp={openApp} />
        </WindowFrame>

        {/* AI Assistant Floating Concierge Window */}
        <WindowFrame
          id="ai-assistant"
          title={`${PORTFOLIO_DATA.owner.name} Concierge AI`}
          icon={<Sparkles className="w-4 h-4 text-cyan-400" />}
          isOpen={openWindows.includes('ai-assistant')}
          isMinimized={minimizedWindows.includes('ai-assistant')}
          isMaximized={maximizedWindows.includes('ai-assistant')}
          zIndex={10 + windowStack.indexOf('ai-assistant')}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={toggleMaximizeWindow}
          onFocus={bringToFront}
          defaultWidth="max-w-md w-[92vw] sm:w-[480px]"
          defaultHeight="h-[70vh] max-h-[600px]"
        >
          <AIAssistantApp onExecuteAction={handleExecuteAIAction} />
        </WindowFrame>
      </div>

      {/* Dock */}
      <Dock
        activeAppIds={openWindows.filter((id) => !minimizedWindows.includes(id))}
        onOpenApp={openApp}
        onToggleAI={toggleAI}
      />

      {/* Spotlight Overlay */}
      <SpotlightSearch
        isOpen={isSpotlightOpen}
        onClose={() => setIsSpotlightOpen(false)}
        onOpenApp={openApp}
      />
    </div>
  );
}
