import React, { useState } from 'react';
import { 
  Map, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Award, 
  Code2, 
  ExternalLink, 
  Filter, 
  ChevronRight, 
  ShieldCheck, 
  Layers, 
  Database, 
  Server, 
  Cpu, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RoadmapNode, RoadmapCategory, RoadmapStatus } from '../types/project';

interface RoadmapFullStackTrackerProps {
  nodes: RoadmapNode[];
  onToggleChecklist: (nodeId: string, checklistId: string) => void;
  onUpdateStatus: (nodeId: string, status: RoadmapStatus) => void;
  onOpenCodeSnippet: (node: RoadmapNode) => void;
}

export const RoadmapFullStackTracker: React.FC<RoadmapFullStackTrackerProps> = ({
  nodes,
  onToggleChecklist,
  onUpdateStatus,
  onOpenCodeSnippet,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<RoadmapCategory | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const categories: { id: RoadmapCategory | 'all'; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'all', label: 'All Full-Stack Areas', icon: Map },
    { id: 'frontend', label: 'Frontend & UI State', icon: Layers },
    { id: 'backend', label: 'Backend & REST / GraphQL API', icon: Server },
    { id: 'database', label: 'Database & Relational ORM', icon: Database },
    { id: 'devops', label: 'Cloud Run & Docker Ingress', icon: Cpu },
    { id: 'security', label: 'Client Security & NDA Audits', icon: ShieldCheck },
  ];

  const filteredNodes = nodes.filter((node) => {
    const matchesCategory = selectedCategory === 'all' || node.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || node.level === selectedLevel;
    return matchesCategory && matchesLevel;
  });

  const triggerConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#06b6d4', '#3b82f6'],
    });
  };

  const getStatusBadge = (status: RoadmapStatus) => {
    switch (status) {
      case 'production-ready':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Production Ready
          </span>
        );
      case 'mastered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/40">
            <Award className="w-3.5 h-3.5 text-blue-400" />
            Mastered
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            In Progress
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-400 border border-slate-700">
            <Circle className="w-3.5 h-3.5" />
            Not Started
          </span>
        );
    }
  };

  const getCategoryColor = (cat: RoadmapCategory) => {
    switch (cat) {
      case 'frontend':
        return 'border-teal-500/40 bg-teal-500/10 text-teal-300';
      case 'backend':
        return 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300';
      case 'database':
        return 'border-blue-500/40 bg-blue-500/10 text-blue-300';
      case 'devops':
        return 'border-purple-500/40 bg-purple-500/10 text-purple-300';
      case 'security':
        return 'border-amber-500/40 bg-amber-500/10 text-amber-300';
    }
  };

  const totalChecklist = nodes.flatMap((n) => n.clientChecklist).length;
  const completedChecklist = nodes.flatMap((n) => n.clientChecklist).filter((c) => c.checked).length;
  const progressPercent = Math.round((completedChecklist / (totalChecklist || 1)) * 100);

  return (
    <div className="space-y-6">
      {/* Header card with progress & official roadmap link */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                Roadmap.sh Integration
              </span>
              <a
                href="https://roadmap.sh/full-stack"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-emerald-300 transition"
              >
                View Official Curriculum
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <h3 className="text-xl font-bold text-white mt-1">
              Client Full-Stack Engineering Roadmap
            </h3>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Track mastery of front-end components, RESTful/GraphQL APIs, relational database schemas, containerized DevOps ingress, and client confidentiality audits.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-800/80 p-4 rounded-xl border border-slate-700 w-full md:w-auto">
            <div className="text-center sm:text-left">
              <div className="text-xs text-slate-400">Client Compliance Score</div>
              <div className="text-2xl font-bold text-emerald-400">{progressPercent}%</div>
              <div className="text-[11px] text-slate-500">
                {completedChecklist} of {totalChecklist} checklist items verified
              </div>
            </div>
            <div className="w-full sm:w-32 bg-slate-700 h-3 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Category & Filter Tabs */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    isActive
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Levels</option>
              <option value="essential">Essential Architecture</option>
              <option value="advanced">Advanced Optimization</option>
              <option value="client-production">Client Production Grade</option>
            </select>
          </div>
        </div>
      </div>

      {/* Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNodes.map((node) => {
          const completedCount = node.clientChecklist.filter((c) => c.checked).length;
          const totalCount = node.clientChecklist.length;

          return (
            <div
              key={node.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition group"
            >
              <div>
                {/* Node Header Badge & Status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getCategoryColor(
                      node.category
                    )}`}
                  >
                    {node.category} • {node.level}
                  </span>
                  {getStatusBadge(node.status)}
                </div>

                {/* Node Title & Description */}
                <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition">
                  {node.title}
                </h4>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {node.description}
                </p>

                {/* Why Important for Client */}
                <div className="mt-3 bg-slate-800/60 rounded-xl p-2.5 border border-slate-700/60">
                  <div className="text-[10px] uppercase font-semibold text-emerald-400">
                    Why Important for Client
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">{node.whyImportantForClient}</p>
                </div>

                {/* Key Skills Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {node.keySkills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Client Verification Checklist */}
                <div className="mt-4 border-t border-slate-800/80 pt-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
                    <span>Client Verification Checklist</span>
                    <span className="text-emerald-400">
                      {completedCount} / {totalCount}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {node.clientChecklist.map((item) => (
                      <label
                        key={item.id}
                        className="flex items-start gap-2.5 cursor-pointer group/item text-xs select-none"
                      >
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => {
                            onToggleChecklist(node.id, item.id);
                            if (!item.checked && completedCount + 1 === totalCount) {
                              triggerConfetti();
                            }
                          }}
                          className="mt-0.5 w-4 h-4 rounded bg-slate-800 border-slate-600 text-emerald-500 focus:ring-emerald-500/40"
                        />
                        <span
                          className={`flex-1 transition ${
                            item.checked
                              ? 'line-through text-slate-500 font-normal'
                              : 'text-slate-200 font-medium group-hover/item:text-white'
                          }`}
                        >
                          {item.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Actions: Inspect Code / Change Status */}
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onOpenCodeSnippet(node)}
                  disabled={!node.codeSnippet}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    node.codeSnippet
                      ? 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700'
                      : 'bg-slate-800/40 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Inspect Architecture</span>
                </button>

                <select
                  value={node.status}
                  onChange={(e) => onUpdateStatus(node.id, e.target.value as RoadmapStatus)}
                  className="bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium rounded-lg px-2 py-1 focus:outline-none focus:border-emerald-500"
                >
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="mastered">Mastered</option>
                  <option value="production-ready">Production Ready</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
