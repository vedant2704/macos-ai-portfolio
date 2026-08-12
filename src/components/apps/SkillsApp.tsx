'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolio';
import { Layout, Server, Cpu, Database, Shield, CheckCircle2 } from 'lucide-react';

export const SkillsApp: React.FC = () => {
  const categories = PORTFOLIO_DATA.skillCategories;

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="w-5 h-5 text-cyan-400" />;
      case 'Server':
        return <Server className="w-5 h-5 text-purple-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-rose-400" />;
      default:
        return <Database className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
        <h2 className="text-xl font-extrabold text-white">System Skills Matrix</h2>
        <p className="text-xs text-slate-300 mt-1">
          A comprehensive breakdown of {PORTFOLIO_DATA.owner.name}&apos;s technical capabilities, domain expertise, and years of production experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4 hover:border-white/20 transition-colors"
          >
            <div className="flex items-center space-x-3 pb-3 border-b border-white/10">
              <div className="p-2.5 rounded-xl bg-white/10">
                {getCategoryIcon(cat.icon)}
              </div>
              <h3 className="font-bold text-white text-base">{cat.name}</h3>
            </div>

            <div className="space-y-3">
              {cat.skills.map((skill, sIdx) => (
                <div key={sIdx} className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-200 flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{skill.name}</span>
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px]">
                        {skill.level}
                      </span>
                      <span className="text-slate-400 text-[11px] font-mono">
                        {skill.years} yrs
                      </span>
                    </div>
                  </div>
                  {/* Visual Indicator Pill */}
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                      style={{
                        width: `${Math.min(100, (skill.years / 7) * 100)}%`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
