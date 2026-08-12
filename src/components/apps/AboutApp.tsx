'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PORTFOLIO_DATA } from '@/data/portfolio';
import { User, GraduationCap, Target, Heart, FileText, Mail, Sparkles } from 'lucide-react';
import { sound } from '@/lib/sound';

interface AboutAppProps {
  onOpenApp: (appId: string) => void;
  onToggleAI: () => void;
}

export const AboutApp: React.FC<AboutAppProps> = ({ onOpenApp, onToggleAI }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'education' | 'focus' | 'interests'>('overview');
  const data = PORTFOLIO_DATA;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-xl shrink-0">
          <Image
            src={data.owner.avatarUrl}
            alt={data.owner.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-semibold">
            <span>{data.owner.handle}</span>
            <span>•</span>
            <span>{data.owner.location}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{data.owner.name}</h2>
          <p className="text-sm font-medium text-cyan-400">{data.owner.title}</p>
          <p className="text-xs text-slate-300 leading-relaxed max-w-xl">{data.owner.bio}</p>

          <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-2">
            <button
              onClick={() => {
                sound.playClick();
                onOpenApp('resume');
              }}
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold flex items-center space-x-1.5 border border-amber-500/30 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Resume</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenApp('contact');
              }}
              className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold flex items-center space-x-1.5 border border-rose-500/30 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Me</span>
            </button>

            <button
              onClick={() => {
                sound.playPop();
                onToggleAI();
              }}
              className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center space-x-1.5 border border-cyan-500/30 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask Concierge</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-white/10 space-x-4 text-xs font-medium text-slate-400">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-2 flex items-center space-x-1.5 border-b-2 transition-colors ${
            activeTab === 'overview'
              ? 'border-cyan-400 text-cyan-300 font-bold'
              : 'border-transparent hover:text-slate-200'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Overview</span>
        </button>
        <button
          onClick={() => setActiveTab('education')}
          className={`pb-2 flex items-center space-x-1.5 border-b-2 transition-colors ${
            activeTab === 'education'
              ? 'border-cyan-400 text-cyan-300 font-bold'
              : 'border-transparent hover:text-slate-200'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Education</span>
        </button>
        <button
          onClick={() => setActiveTab('focus')}
          className={`pb-2 flex items-center space-x-1.5 border-b-2 transition-colors ${
            activeTab === 'focus'
              ? 'border-cyan-400 text-cyan-300 font-bold'
              : 'border-transparent hover:text-slate-200'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Current Focus</span>
        </button>
        <button
          onClick={() => setActiveTab('interests')}
          className={`pb-2 flex items-center space-x-1.5 border-b-2 transition-colors ${
            activeTab === 'interests'
              ? 'border-cyan-400 text-cyan-300 font-bold'
              : 'border-transparent hover:text-slate-200'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Interests</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
        {activeTab === 'overview' && (
          <div className="space-y-4 text-slate-200 text-sm leading-relaxed">
            <p>{data.owner.longBio}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {data.stats.map((stat, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="text-xl font-extrabold text-cyan-400">{stat.value}</div>
                  <div className="text-[11px] text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-4">
            {data.education.map((edu, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-white text-base">{edu.degree}</h3>
                    <p className="text-xs text-cyan-400 font-medium">{edu.institution}</p>
                  </div>
                  <span className="text-xs text-slate-400 px-2 py-0.5 rounded bg-white/10">{edu.period}</span>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pt-1">
                  {edu.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'focus' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-400 font-medium">Areas {data.owner.name} is actively exploring and building in 2026:</p>
            <ul className="space-y-2">
              {data.currentFocus.map((f, idx) => (
                <li key={idx} className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-200 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'interests' && (
          <div className="flex flex-wrap gap-2">
            {data.interests.map((interest, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-200 text-xs font-medium"
              >
                ⚡ {interest}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
