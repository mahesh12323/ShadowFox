import React, { useState } from 'react';
import { 
  Layers, 
  Server, 
  Database, 
  CheckCircle2, 
  Clock, 
  Code2, 
  ShieldCheck, 
  Sparkles, 
  Plus, 
  ChevronRight, 
  User, 
  Calendar,
  AlertCircle,
  Eye
} from 'lucide-react';
import { FullStackFeature, FeatureLayer } from '../types/project';

interface FullStackFeatureBoardProps {
  features: FullStackFeature[];
  onSelectFeature: (feature: FullStackFeature) => void;
  onOpenArchitectModal: () => void;
  onToggleSecurityCheck: (featureId: string, checklistId: string) => void;
}

export const FullStackFeatureBoard: React.FC<FullStackFeatureBoardProps> = ({
  features,
  onSelectFeature,
  onOpenArchitectModal,
  onToggleSecurityCheck,
}) => {
  const [selectedLayer, setSelectedLayer] = useState<FeatureLayer | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const layers: { id: FeatureLayer | 'all'; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'all', label: 'All Layers', icon: Layers },
    { id: 'fullstack', label: 'End-to-End Fullstack', icon: Layers },
    { id: 'frontend', label: 'Front-End UI & State', icon: Layers },
    { id: 'backend', label: 'Back-End & REST/WS API', icon: Server },
    { id: 'database', label: 'Database & ORM Schema', icon: Database },
  ];

  const filteredFeatures = features.filter((feat) => {
    const layerMatch = selectedLayer === 'all' || feat.layer === selectedLayer;
    const statusMatch = selectedStatus === 'all' || feat.status === selectedStatus;
    return layerMatch && statusMatch;
  });

  const getStatusBadge = (status: FullStackFeature['status']) => {
    switch (status) {
      case 'production':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Production
          </span>
        );
      case 'code-review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/40">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            Code Review
          </span>
        );
      case 'in-development':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            In Development
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-400 border border-slate-700">
            Backlog
          </span>
        );
    }
  };

  const getLayerColor = (layer: FeatureLayer) => {
    switch (layer) {
      case 'fullstack':
        return 'border-purple-500/40 bg-purple-500/10 text-purple-300';
      case 'frontend':
        return 'border-teal-500/40 bg-teal-500/10 text-teal-300';
      case 'backend':
        return 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300';
      case 'database':
        return 'border-blue-500/40 bg-blue-500/10 text-blue-300';
      default:
        return 'border-slate-700 bg-slate-800 text-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Board Header Actions */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
              Architecture & Implementation
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            Full-Stack Engineering & Feature Board
          </h3>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Collaborate on both front-end React 19 UI state and back-end Express/PostgreSQL services. Inspect APIs, database schemas, and security checklists per feature.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            type="button"
            onClick={onOpenArchitectModal}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-2.5 px-4 rounded-xl text-xs shadow-lg shadow-emerald-600/20 transition transform active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Full-Stack Spec Generator</span>
          </button>
        </div>
      </div>

      {/* Layer Tabs & Status Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {layers.map((layer) => {
            const Icon = layer.icon;
            const isActive = selectedLayer === layer.id;
            return (
              <button
                key={layer.id}
                onClick={() => setSelectedLayer(layer.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  isActive
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{layer.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Statuses</option>
            <option value="production">Production</option>
            <option value="code-review">Code Review</option>
            <option value="in-development">In Development</option>
            <option value="backlog">Backlog</option>
          </select>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredFeatures.map((feat) => {
          const completedSec = feat.securityChecklist.filter((s) => s.completed).length;
          const totalSec = feat.securityChecklist.length;

          return (
            <div
              key={feat.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 shadow-lg flex flex-col justify-between transition group"
            >
              <div>
                {/* Header Badge & Priority */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getLayerColor(
                        feat.layer
                      )}`}
                    >
                      {feat.layer}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        feat.priority === 'high'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : feat.priority === 'medium'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {feat.priority} Priority
                    </span>
                  </div>

                  {getStatusBadge(feat.status)}
                </div>

                {/* Title & Description */}
                <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition">
                  {feat.title}
                </h4>
                <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                  {feat.description}
                </p>

                {/* Architecture Highlights Grid */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/60">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-300 mb-1">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Front-End Components</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {feat.frontendSpec.components.map((comp, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-300 border border-slate-700"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/60">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300 mb-1">
                      <Server className="w-3.5 h-3.5" />
                      <span>Back-End Endpoints</span>
                    </div>
                    <div className="space-y-1 mt-1">
                      {feat.backendSpec.apiEndpoints.slice(0, 2).map((ep, idx) => (
                        <div
                          key={idx}
                          className="text-[10px] font-mono text-slate-300 truncate"
                          title={ep}
                        >
                          {ep}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Security Checklist Section */}
                <div className="mt-4 border-t border-slate-800 pt-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Security & NDA Checklist
                    </span>
                    <span className="text-emerald-400">
                      {completedSec} / {totalSec}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {feat.securityChecklist.map((sec) => (
                      <label
                        key={sec.id}
                        className="flex items-start gap-2 cursor-pointer group/sec text-xs select-none"
                      >
                        <input
                          type="checkbox"
                          checked={sec.completed}
                          onChange={() => onToggleSecurityCheck(feat.id, sec.id)}
                          className="mt-0.5 w-4 h-4 rounded bg-slate-800 border-slate-600 text-emerald-500 focus:ring-emerald-500/40"
                        />
                        <span
                          className={`flex-1 transition ${
                            sec.completed
                              ? 'line-through text-slate-500'
                              : 'text-slate-300 group-hover/sec:text-white'
                          }`}
                        >
                          {sec.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer metadata & inspect button */}
              <div className="mt-5 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    {feat.assignedTo}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    Due: {feat.dueDate}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectFeature(feat)}
                  className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Spec & Code</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
