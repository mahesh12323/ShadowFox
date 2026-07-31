import React from 'react';
import { 
  ShieldCheck, 
  Video, 
  Map, 
  Layers, 
  Lock, 
  ChevronDown, 
  ExternalLink, 
  Briefcase, 
  CheckCircle2, 
  Sparkles,
  UserCheck
} from 'lucide-react';
import { ClientProject } from '../types/project';

interface NavigationHeaderProps {
  projects: ClientProject[];
  activeProject: ClientProject;
  onSelectProject: (project: ClientProject) => void;
  activeTab: 'overview' | 'roadmap' | 'features' | 'security' | 'meet-sessions';
  onSelectTab: (tab: 'overview' | 'roadmap' | 'features' | 'security' | 'meet-sessions') => void;
  onOpenMeetModal: () => void;
  onOpenArchitectModal: () => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  projects,
  activeProject,
  onSelectProject,
  activeTab,
  onSelectTab,
  onOpenMeetModal,
  onOpenArchitectModal,
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const tabs = [
    { id: 'overview', label: 'Project Overview', icon: Briefcase, badge: null },
    { id: 'roadmap', label: 'Roadmap.sh Full-Stack', icon: Map, badge: `${activeProject.roadmapNodes.length} Nodes` },
    { id: 'features', label: 'Full-Stack Features', icon: Layers, badge: `${activeProject.features.length} Specs` },
    { id: 'meet-sessions', label: 'Google Meet NDA Sessions', icon: Video, badge: `${activeProject.meetSessions.length} Meetings` },
    { id: 'security', label: 'Security & OWASP Audits', icon: Lock, badge: '100% Pass' },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl">
      {/* Top Confidentiality Advisory Bar */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-950/80 border-b border-emerald-500/20 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="w-3 h-3 mr-1 text-emerald-400" />
              STRICT CLIENT NDA ACTIVE
            </span>
            <span className="text-slate-300 hidden sm:inline font-medium">
              To uphold utmost confidentiality, in-depth discussions regarding client projects are conducted exclusively via dedicated Google Meet sessions.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Client: <span className="text-white font-semibold">{activeProject.clientName}</span>
            </span>
            <a
              href="https://roadmap.sh/full-stack"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition text-xs font-semibold underline-offset-2 hover:underline"
            >
              roadmap.sh/full-stack
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand & Project Switcher */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-bold">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="font-bold text-base sm:text-lg tracking-tight text-white">
                    FullStack<span className="text-emerald-400">Collaborator</span>
                  </h1>
                  <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-slate-800 text-slate-300 border border-slate-700 rounded">
                    Client Portal
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden md:block">
                  Front-End • Back-End • Secure Data Layer • Cloud Ingress
                </p>
              </div>
            </div>

            {/* Project Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 px-3 py-1.5 rounded-lg text-xs font-medium transition shadow-sm"
              >
                <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                <span className="max-w-[160px] truncate font-semibold text-white">{activeProject.clientName}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 py-1.5">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-700/60">
                    Switch Client Project
                  </div>
                  {projects.map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => {
                        onSelectProject(proj);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-700/60 transition ${
                        proj.id === activeProject.id ? 'bg-emerald-500/10 text-emerald-300 font-semibold' : 'text-slate-300'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-white">{proj.clientName}</div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[200px]">{proj.name}</div>
                      </div>
                      {proj.id === activeProject.id && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right CTA Actions */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenArchitectModal}
              className="hidden sm:inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>AI Spec Architect</span>
            </button>

            <button
              type="button"
              onClick={onOpenMeetModal}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-md shadow-emerald-600/20 transition transform active:scale-95"
            >
              <Video className="w-4 h-4" />
              <span>Dedicated Google Meet</span>
            </button>
          </div>
        </div>

        {/* Bottom Tab Navigation */}
        <nav className="flex space-x-1 overflow-x-auto py-2 border-t border-slate-800/80 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive
                        ? 'bg-emerald-500/30 text-emerald-200'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
