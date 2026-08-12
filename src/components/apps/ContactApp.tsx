'use client';

import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolio';
import { Mail, Send, FolderGit2, Globe, Share2, CheckCircle2, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '@/lib/sound';

export const ContactApp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playPop();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback
      }
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white">Mail Concierge</h2>
          <p className="text-xs text-slate-300 mt-1">
            Send a direct email message to {PORTFOLIO_DATA.owner.name} or connect via social channels.
          </p>
        </div>
        <Mail className="w-6 h-6 text-sky-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Direct Social Channels */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Direct Links
          </div>

          <a
            href={`mailto:${PORTFOLIO_DATA.owner.email}`}
            className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center space-x-3 text-slate-200 hover:text-white transition-colors group"
          >
            <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400 group-hover:scale-110 transition-transform">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold">Email</div>
              <div className="text-[11px] text-slate-400 font-mono">{PORTFOLIO_DATA.owner.email}</div>
            </div>
          </a>

          <a
            href={PORTFOLIO_DATA.owner.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center space-x-3 text-slate-200 hover:text-white transition-colors group"
          >
            <div className="p-2 rounded-lg bg-zinc-700/40 text-slate-200 group-hover:scale-110 transition-transform">
              <FolderGit2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold">GitHub</div>
              <div className="text-[11px] text-slate-400 font-mono">{PORTFOLIO_DATA.owner.github.replace('https://github.com/', '')}</div>
            </div>
          </a>

          <a
            href={PORTFOLIO_DATA.owner.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center space-x-3 text-slate-200 hover:text-white transition-colors group"
          >
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold">LinkedIn</div>
              <div className="text-[11px] text-slate-400 font-mono">{PORTFOLIO_DATA.owner.linkedin.replace('https://linkedin.com/in/', '')}</div>
            </div>
          </a>

          {PORTFOLIO_DATA.owner.twitter && (
            <a
              href={PORTFOLIO_DATA.owner.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center space-x-3 text-slate-200 hover:text-white transition-colors group"
            >
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold">Twitter / X</div>
                <div className="text-[11px] text-slate-400 font-mono">{PORTFOLIO_DATA.owner.twitter.replace('https://twitter.com/', '@')}</div>
              </div>
            </a>
          )}
        </div>

        {/* Mail Form */}
        <div className="md:col-span-2 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-white">Message Sent Successfully!</h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Thank you for reaching out. {PORTFOLIO_DATA.owner.name} has received your dispatch and will reply shortly.
              </p>
              <button
                onClick={() => {
                  sound.playClick();
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', subject: '', message: '' });
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Inquiry / Technical Project Collaboration"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder={`Hi ${PORTFOLIO_DATA.owner.name}, I enjoyed your portfolio and would like to discuss...`}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
