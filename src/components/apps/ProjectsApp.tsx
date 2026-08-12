'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PORTFOLIO_DATA, Project } from '@/data/portfolio';
import {
  Folder,
  LayoutGrid,
  List,
  Search,
  ExternalLink,
  FolderGit2,
  Award,
  Sparkles,
  X
} from 'lucide-react';
import { sound } from '@/lib/sound';

interface ProjectsAppProps {
  initialCategory?: string;
}

export const ProjectsApp: React.FC<ProjectsAppProps> = ({ initialCategory = 'all' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects = PORTFOLIO_DATA.projects;

  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="h-full flex flex-col md:flex-row gap-4">
      {/* Finder Sidebar */}
      <div className="w-full md:w-48 bg-white/5 p-3 rounded-xl border border-white/10 shrink-0 space-y-4">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">
            Favorites
          </div>
          <div className="space-y-1 text-xs font-medium">
            <button
              onClick={() => {
                sound.playClick();
                setSelectedCategory('all');
              }}
              className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              <Folder className="w-4 h-4 text-cyan-400" />
              <span>All Projects</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setSelectedCategory('ai');
              }}
              className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg transition-colors ${
                selectedCategory === 'ai'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>AI & ML</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setSelectedCategory('web');
              }}
              className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg transition-colors ${
                selectedCategory === 'web'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              <Folder className="w-4 h-4 text-blue-400" />
              <span>Web Apps</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setSelectedCategory('mobile');
              }}
              className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg transition-colors ${
                selectedCategory === 'mobile'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              <Folder className="w-4 h-4 text-emerald-400" />
              <span>Mobile & Bio</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setSelectedCategory('experiments');
              }}
              className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg transition-colors ${
                selectedCategory === 'experiments'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              <Folder className="w-4 h-4 text-amber-400" />
              <span>Experiments</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col space-y-4 min-w-0">
        {/* Finder Toolbar */}
        <div className="flex items-center justify-between gap-3 p-2 rounded-xl bg-white/5 border border-white/10">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects by tech, title, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/80 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* View Toggles */}
          <div className="flex items-center space-x-1 bg-slate-900/80 border border-white/10 rounded-lg p-1">
            <button
              onClick={() => {
                sound.playClick();
                setViewMode('grid');
              }}
              className={`p-1 rounded ${
                viewMode === 'grid' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setViewMode('list');
              }}
              className={`p-1 rounded ${
                viewMode === 'list' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Projects View */}
        <div className="flex-1 overflow-y-auto">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              No projects found matching your search query.
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => {
                    sound.playPop();
                    setSelectedProject(project);
                  }}
                  className="group relative rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="relative w-full h-36 rounded-lg overflow-hidden border border-white/10">
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {project.metrics && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[10px] font-semibold backdrop-blur-md">
                          {project.metrics}
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                        {project.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 mt-3 flex flex-wrap gap-1">
                    {project.tags.slice(0, 4).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-slate-300 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => {
                    sound.playPop();
                    setSelectedProject(project);
                  }}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 flex items-center justify-between cursor-pointer transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10 shrink-0">
                      <Image src={project.thumbnail} alt={project.title} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{project.title}</h4>
                      <p className="text-xs text-slate-300 line-clamp-1">{project.shortDescription}</p>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 font-mono hidden sm:block">
                    {project.year}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Project Detail Modal Overlay */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-slate-900 border border-white/20 rounded-2xl p-6 space-y-5 text-white shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full h-48 sm:h-60 rounded-xl overflow-hidden border border-white/10">
              <Image src={selectedProject.thumbnail} alt={selectedProject.title} fill className="object-cover" />
            </div>

            <div>
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                {selectedProject.role} • {selectedProject.year}
              </div>
              <h2 className="text-2xl font-extrabold text-white mt-1">{selectedProject.title}</h2>
              <p className="text-sm text-slate-300 leading-relaxed mt-2">{selectedProject.fullDescription}</p>
            </div>

            {/* Achievements */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 flex items-center space-x-1">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Key Achievements</span>
              </div>
              <ul className="list-disc list-inside text-xs text-slate-200 space-y-1">
                {selectedProject.achievements.map((ach, idx) => (
                  <li key={idx}>{ach}</li>
                ))}
              </ul>
            </div>

            {/* Tech Tags */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400">Tech Stack</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tags.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap gap-3">
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center space-x-1.5 border border-white/15 transition-colors"
                >
                  <FolderGit2 className="w-4 h-4" />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
