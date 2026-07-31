import React, { useState } from 'react';
import { 
  X, 
  Code2, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink, 
  Layers, 
  ShieldCheck, 
  Server, 
  Database,
  Terminal
} from 'lucide-react';
import { RoadmapNode, FullStackFeature } from '../types/project';

interface RoadmapCodeModalProps {
  node?: RoadmapNode | null;
  feature?: FullStackFeature | null;
  onClose: () => void;
}

export const RoadmapCodeModal: React.FC<RoadmapCodeModalProps> = ({
  node,
  feature,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'database'>('frontend');

  if (!node && !feature) return null;

  const title = node?.title || feature?.title;
  const description = node?.description || feature?.description;
  const codeSnippetTitle = node?.codeSnippetTitle || `${feature?.title} Reference Implementation`;
  
  const getSnippetToDisplay = () => {
    if (node?.codeSnippet) return node.codeSnippet;
    if (feature) {
      if (activeTab === 'frontend' && feature.frontendSpec.sampleCodeSnippet) {
        return feature.frontendSpec.sampleCodeSnippet;
      }
      if (activeTab === 'backend' && feature.backendSpec.sampleCodeSnippet) {
        return feature.backendSpec.sampleCodeSnippet;
      }
      if (activeTab === 'database' && feature.databaseSpec.sampleSchema) {
        return feature.databaseSpec.sampleSchema;
      }
      return '// No snippet available for this layer.';
    }
    return '';
  };

  const handleCopy = () => {
    const code = getSnippetToDisplay();
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950/80 border-b border-slate-800 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase text-emerald-400">
                  {node ? `Roadmap.sh (${node.category})` : `Full-Stack Spec (${feature?.layer})`}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white max-w-lg truncate">
                {title}
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
          <p className="text-sm text-slate-300 leading-relaxed">
            {description}
          </p>

          {/* If inspecting a Feature, allow switching between Frontend, Backend, Database tabs */}
          {feature && (
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <button
                type="button"
                onClick={() => setActiveTab('frontend')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'frontend'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Front-End UI Spec</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('backend')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'backend'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Server className="w-3.5 h-3.5" />
                <span>Back-End API Spec</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('database')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'database'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>Database Schema</span>
              </button>
            </div>
          )}

          {/* Code block header & copy */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                {codeSnippetTitle}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded text-xs transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-x-auto text-xs font-mono text-emerald-300 leading-relaxed">
              <code>{getSnippetToDisplay() || '// No code snippet available for this view.'}</code>
            </pre>
          </div>

          {/* Additional details for feature specs */}
          {feature && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-3.5">
                <div className="text-xs font-bold uppercase text-emerald-400 mb-1">
                  Security & NDA Checklist
                </div>
                <div className="space-y-1 mt-2">
                  {feature.securityChecklist.map((sc) => (
                    <div key={sc.id} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{sc.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-3.5">
                <div className="text-xs font-bold uppercase text-teal-400 mb-1">
                  API Auth & Validation Rules
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  <strong>Auth Requirement:</strong> {feature.backendSpec.authRequirement}
                </p>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  <strong>Validation:</strong> {feature.backendSpec.validationSchema}
                </p>
              </div>
            </div>
          )}

          {node?.roadmapShLink && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-emerald-300">
                  Interactive Roadmap.sh Full-Stack Reference
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Check full developer curriculum and official full-stack best practices.
                </p>
              </div>
              <a
                href={node.roadmapShLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition shrink-0"
              >
                <span>Open Roadmap.sh</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
