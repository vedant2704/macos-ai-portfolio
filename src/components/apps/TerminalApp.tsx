'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolio';
import { queryAIEngine } from '@/lib/ai-engine';
import { sound } from '@/lib/sound';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  text: string;
}

interface TerminalAppProps {
  onOpenApp: (appId: string) => void;
}

export const TerminalApp: React.FC<TerminalAppProps> = ({ onOpenApp }) => {
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: '1',
      type: 'system',
      text: 'Last login: ' + new Date().toString().slice(0, 24) + ' on ttys000'
    },
    {
      id: '2',
      type: 'system',
      text: 'Type "help" to list available commands or "neofetch" for system metrics.'
    }
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const userSlug = PORTFOLIO_DATA.owner.name.toLowerCase().replace(/\s+/g, '');

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    sound.playClick();
    const newHistory: TerminalLine[] = [
      ...history,
      { id: Date.now().toString(), type: 'input', text: `${userSlug}@macbook-pro ~ % ${cmd}` }
    ];

    const lower = cmd.toLowerCase();

    if (lower === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (lower === 'help') {
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `Available Commands:
  help        - Show this help menu
  about       - Display biography and open About Me window
  projects    - List projects and open Finder Projects app
  skills      - Display technical skills matrix
  experience  - Show work experience timeline
  resume      - Preview ${PORTFOLIO_DATA.owner.name}'s resume
  contact     - Display contact info & launch mail form
  neofetch    - Show macOS portfolio system overview
  ai <query>  - Ask ${PORTFOLIO_DATA.owner.name}'s AI a question via CLI
  clear       - Clear terminal scrollback buffer`
      });
    } else if (lower === 'about') {
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `[${PORTFOLIO_DATA.owner.name.toUpperCase()}]
${PORTFOLIO_DATA.owner.title}
${PORTFOLIO_DATA.owner.location}

"${PORTFOLIO_DATA.owner.tagline}"
Opening About Me window...`
      });
      onOpenApp('about');
    } else if (lower === 'projects') {
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `Featured Projects:
${PORTFOLIO_DATA.projects.filter(p => p.featured).map((p, i) => `  ${i + 1}. ${p.title}`).join('\n')}
Opening Finder Projects app...`
      });
      onOpenApp('projects');
    } else if (lower === 'skills') {
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `${PORTFOLIO_DATA.skillCategories.map(c => `${c.name}: ${c.skills.map(s => s.name).join(', ')}`).join('\n')}
Opening Skills window...`
      });
      onOpenApp('skills');
    } else if (lower === 'experience') {
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `Career Timeline:
${PORTFOLIO_DATA.experience.map(e => `  • ${e.period} : ${e.role} @ ${e.company}`).join('\n')}
Opening Experience Timeline app...`
      });
      onOpenApp('experience');
    } else if (lower === 'contact') {
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `Email: ${PORTFOLIO_DATA.owner.email}
GitHub: ${PORTFOLIO_DATA.owner.github}
LinkedIn: ${PORTFOLIO_DATA.owner.linkedin}
Opening Mail app...`
      });
      onOpenApp('contact');
    } else if (lower === 'resume') {
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `Opening Resume Preview app...`
      });
      onOpenApp('resume');
    } else if (lower === 'neofetch') {
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `           \x1b[36m/\\       \x1b[0m${userSlug}@macbook-pro
          \x1b[36m/  \\      \x1b[0m----------------------
         \x1b[36m/ /\\ \\     \x1b[0mOS: macOS Sequoia 15.2 AI Edition
        \x1b[36m/ /  \\ \\    \x1b[0mHost: MacBook Pro
       \x1b[36m/ /    \\ \\   \x1b[0mFocus: AI Engineering, Full-Stack, Cybersecurity
      \x1b[36m/_/      \\_\\  \x1b[0mShell: zsh 5.9 (arm64-apple-darwin)
                    \x1b[0mStack: Next.js, React, TypeScript, FastAPI
                    \x1b[0mAI Engine: Custom Concierge & Tool Invoker`
      });
    } else if (lower.startsWith('ai ')) {
      const queryStr = cmd.slice(3).trim();
      const res = queryAIEngine(queryStr);
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `[AI CONCIERGE RESPONSE]:\n${res.responseText}`
      });
    } else if (lower.includes('sudo rm -rf')) {
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: 'error',
        text: `sudo: Permission denied. ${PORTFOLIO_DATA.owner.name}'s portfolio OS is read-only and resilient against nuclear commands! 🛡️`
      });
    } else {
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: 'error',
        text: `zsh: command not found: ${cmd}. Type "help" for a list of valid commands.`
      });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div className="h-full bg-slate-950 font-mono text-xs p-4 rounded-xl border border-white/10 flex flex-col justify-between space-y-4 text-emerald-400 select-text overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
        {history.map((line) => (
          <div key={line.id} className="whitespace-pre-wrap leading-relaxed">
            {line.type === 'input' && <span className="text-white font-bold">{line.text}</span>}
            {line.type === 'output' && <span className="text-slate-300">{line.text}</span>}
            {line.type === 'error' && <span className="text-rose-400">{line.text}</span>}
            {line.type === 'system' && <span className="text-cyan-400 font-semibold">{line.text}</span>}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleCommand} className="flex items-center space-x-2 pt-2 border-t border-white/10">
        <span className="text-white font-bold shrink-0">{userSlug}@macbook-pro ~ %</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="flex-1 bg-transparent text-emerald-300 focus:outline-none font-mono text-xs caret-cyan-400"
          autoFocus
          placeholder="type command (e.g. help)..."
        />
      </form>
    </div>
  );
};
