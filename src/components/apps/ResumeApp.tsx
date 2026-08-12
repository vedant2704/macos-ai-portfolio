'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolio';
import { Download, Printer, ExternalLink, Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Code } from 'lucide-react';
import { sound } from '@/lib/sound';

export const ResumeApp: React.FC = () => {
  const data = PORTFOLIO_DATA;

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const handleDownload = () => {
    sound.playClick();
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `${data.owner.name.replace(/\s+/g, '-').toLowerCase()}-resume.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-4">
      {/* Preview Toolbar */}
      <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
          <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">Preview v2026.1</span>
          <span>{data.owner.name.replace(/\s+/g, '_')}_Resume.pdf</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center space-x-1.5 border border-white/15 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Rendered Document Page */}
      <div className="p-8 md:p-12 rounded-2xl bg-slate-900 text-slate-100 border border-white/15 shadow-2xl space-y-8 font-sans">
        {/* Header */}
        <div className="border-b border-white/15 pb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">{data.owner.name}</h1>
            <p className="text-base font-semibold text-cyan-400 mt-1">{data.owner.title}</p>
            <p className="text-xs text-slate-300 max-w-xl mt-2 leading-relaxed">{data.owner.tagline}</p>
          </div>

          <div className="text-xs space-y-1.5 text-slate-300 shrink-0 font-mono">
            <div className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>{data.owner.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>{data.owner.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{data.owner.github}</span>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center space-x-2 border-b border-white/10 pb-1">
            <Briefcase className="w-4 h-4" />
            <span>Professional Experience</span>
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="space-y-1.5">
              <div className="flex justify-between items-start text-xs">
                <div>
                  <span className="font-bold text-white text-sm">{exp.role}</span>
                  <span className="text-cyan-400 font-semibold ml-2">@ {exp.company}</span>
                </div>
                <span className="text-slate-400 font-mono">{exp.period}</span>
              </div>
              <p className="text-xs text-slate-300">{exp.description}</p>
              <ul className="list-disc list-inside text-xs text-slate-300 space-y-0.5 pl-1">
                {exp.keyAchievements.map((ach, i) => (
                  <li key={i}>{ach}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center space-x-2 border-b border-white/10 pb-1">
            <Code className="w-4 h-4" />
            <span>Technical Skills</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {data.skillCategories.map((cat, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="font-bold text-white block mb-1">{cat.name}</span>
                <span className="text-slate-300">
                  {cat.skills.map((s) => s.name).join(', ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center space-x-2 border-b border-white/10 pb-1">
            <GraduationCap className="w-4 h-4" />
            <span>Education</span>
          </h2>
          {data.education.map((edu, idx) => (
            <div key={idx} className="flex justify-between text-xs">
              <div>
                <span className="font-bold text-white">{edu.degree}</span>
                <span className="text-slate-400 ml-2">— {edu.institution}</span>
              </div>
              <span className="text-slate-400 font-mono">{edu.period}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
