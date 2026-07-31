import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Server, 
  Database, 
  ShieldCheck, 
  Plus, 
  ArrowRight,
  Code2
} from 'lucide-react';
import { generateFullStackSpec, GeneratedSpec } from '../utils/aiArchitect';
import { FullStackFeature } from '../types/project';

interface AIArchitectModalProps {
  clientName: string;
  onClose: () => void;
  onAddGeneratedFeature: (feature: FullStackFeature) => void;
}

export const AIArchitectModal: React.FC<AIArchitectModalProps> = ({
  clientName,
  onClose,
  onAddGeneratedFeature,
}) => {
  const [prompt, setPrompt] = useState(
    'Real-time WebSocket notifications & secure Stripe billing checkout with ACID ledger table'
  );
  const [generatedSpec, setGeneratedSpec] = useState<GeneratedSpec | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const result = generateFullStackSpec(prompt, clientName);
      setGeneratedSpec(result);
      setIsGenerating(false);
    }, 450);
  };

  const handleAddToProject = () => {
    if (!generatedSpec) return;

    const newFeature: FullStackFeature = {
      id: `feat-ai-${Date.now()}`,
      title: generatedSpec.title,
      description: generatedSpec.description,
      layer: generatedSpec.layer,
      status: 'backlog',
      priority: generatedSpec.priority,
      frontendSpec: generatedSpec.frontendSpec,
      backendSpec: generatedSpec.backendSpec,
      databaseSpec: generatedSpec.databaseSpec,
      securityChecklist: generatedSpec.securityChecklist,
      assignedTo: 'Mahesh P. (Lead Full-Stack Eng)',
      dueDate: '2026-08-15',
    };

    onAddGeneratedFeature(newFeature);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950/90 via-slate-900 to-emerald-950/90 border-b border-slate-800 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase text-emerald-400">
                  Full-Stack AI Architecture Engine
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  INSTANT ARCHITECT
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Generate Full-Stack Spec for {clientName}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Describe the client feature or architecture challenge
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  required
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Secure JWT auth with RBAC and refresh cookie rotation..."
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold px-5 py-2.5 rounded-xl text-xs shadow-lg shadow-emerald-600/20 transition disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isGenerating ? 'Architecting...' : 'Generate Spec'}</span>
                </button>
              </div>
            </div>

            {/* Quick Prompts Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-slate-400 mr-1 font-semibold">Examples:</span>
              {[
                'OAuth2 & short-lived JWT RBAC',
                'Real-Time WebSockets live chart feed',
                'Stripe idempotent checkout & ACID ledger',
                'HIPAA patient diagnostic PDF encryption',
              ].map((example, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setPrompt(example);
                    setTimeout(() => handleGenerate(), 50);
                  }}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                >
                  {example}
                </button>
              ))}
            </div>
          </form>

          {/* Generated Spec Output */}
          {generatedSpec && (
            <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-5 space-y-5 animate-in fade-in duration-300">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    GENERATED SPEC
                  </span>
                  <h4 className="text-base font-bold text-white mt-1">{generatedSpec.title}</h4>
                </div>
                <span className="text-xs font-semibold text-emerald-400">
                  Priority: {generatedSpec.priority.toUpperCase()}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{generatedSpec.description}</p>

              {/* 3-Column Spec Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-teal-400 mb-2">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Front-End Components</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {generatedSpec.frontendSpec.components.map((c, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-2">
                    <Server className="w-3.5 h-3.5" />
                    <span>Back-End Endpoints</span>
                  </div>
                  <div className="space-y-1">
                    {generatedSpec.backendSpec.apiEndpoints.slice(0, 3).map((ep, idx) => (
                      <div key={idx} className="text-[10px] font-mono text-slate-300 truncate">
                        {ep}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-400 mb-2">
                    <Database className="w-3.5 h-3.5" />
                    <span>Database Schema</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {generatedSpec.databaseSpec.tablesOrCollections.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Security Checklist Preview */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Security & NDA Verification Items</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {generatedSpec.securityChecklist.map((sec) => (
                    <div key={sec.id} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{sec.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add to Board CTA */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition"
                >
                  Dismiss
                </button>
                <button
                  type="button"
                  onClick={handleAddToProject}
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-2 rounded-xl text-xs shadow-lg transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Feature to Collaboration Board</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
