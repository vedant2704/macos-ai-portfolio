'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolio';
import { Briefcase, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';

export const ExperienceApp: React.FC = () => {
  const experiences = PORTFOLIO_DATA.experience;

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white">System Activity & Career Timeline</h2>
          <p className="text-xs text-slate-300 mt-1">
            Chronological log of staff, senior, and full-stack software engineering roles.
          </p>
        </div>
        <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Currently Active</span>
        </div>
      </div>

      <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-white/15">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative group">
            {/* Timeline Node */}
            <div
              className={`absolute -left-6 top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                exp.isCurrent
                  ? 'bg-cyan-500 border-cyan-300 text-slate-950 shadow-md shadow-cyan-500/50'
                  : 'bg-slate-900 border-slate-600 text-slate-400'
              }`}
            >
              <Briefcase className="w-2.5 h-2.5" />
            </div>

            {/* Experience Card */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/40 backdrop-blur-md space-y-3 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-lg font-extrabold text-white">{exp.role}</h3>
                  <p className="text-sm font-bold text-cyan-400">{exp.company}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                  <span className="flex items-center space-x-1 px-2.5 py-1 rounded bg-white/10">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{exp.period}</span>
                  </span>
                  <span className="flex items-center space-x-1 px-2.5 py-1 rounded bg-white/10">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>{exp.location}</span>
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed">{exp.description}</p>

              {/* Key Achievements */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Key Impacts</span>
                </div>
                <ul className="space-y-1">
                  {exp.keyAchievements.map((ach, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="pt-2 flex flex-wrap gap-1.5">
                {exp.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-slate-300 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
