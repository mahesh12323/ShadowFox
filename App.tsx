import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Video, 
  Map, 
  Layers, 
  Lock, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Briefcase, 
  Server, 
  Database, 
  Cpu, 
  Calendar, 
  Clock, 
  Users, 
  AlertCircle,
  FileText,
  ArrowUpRight,
  GitBranch,
  Terminal,
  Activity
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { INITIAL_PROJECTS } from './data/initialProjectData';
import { 
  ClientProject, 
  MeetSession, 
  RoadmapNode, 
  FullStackFeature, 
  RoadmapStatus, 
  AuditStatus 
} from './types/project';

import { NavigationHeader } from './components/NavigationHeader';
import { ConfidentialMeetBanner } from './components/ConfidentialMeetBanner';
import { RoadmapFullStackTracker } from './components/RoadmapFullStackTracker';
import { FullStackFeatureBoard } from './components/FullStackFeatureBoard';
import { SecurityAuditPanel } from './components/SecurityAuditPanel';
import { MeetSessionModal } from './components/MeetSessionModal';
import { RoadmapCodeModal } from './components/RoadmapCodeModal';
import { AIArchitectModal } from './components/AIArchitectModal';

export default function App() {
  const [projects, setProjects] = useState<ClientProject[]>(INITIAL_PROJECTS);
  const [activeProjectId, setActiveProjectId] = useState<string>(INITIAL_PROJECTS[0].id);
  const [activeTab, setActiveTab] = useState<'overview' | 'roadmap' | 'features' | 'security' | 'meet-sessions'>('overview');

  // Modal control states
  const [meetModalOpen, setMeetModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<MeetSession | null>(null);
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<FullStackFeature | null>(null);
  const [architectModalOpen, setArchitectModalOpen] = useState(false);

  // Security audit simulation state
  const [isScanning, setIsScanning] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  // Switch active project
  const handleSelectProject = (project: ClientProject) => {
    setActiveProjectId(project.id);
    showToast(`Switched client workspace to ${project.clientName} (${project.confidentialityLevel})`);
  };

  // Toggle Roadmap Checklist Item
  const handleToggleRoadmapChecklist = (nodeId: string, checklistId: string) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== activeProject.id) return proj;
        return {
          ...proj,
          roadmapNodes: proj.roadmapNodes.map((node) => {
            if (node.id !== nodeId) return node;
            return {
              ...node,
              clientChecklist: node.clientChecklist.map((item) => {
                if (item.id !== checklistId) return item;
                const nextChecked = !item.checked;
                return { ...item, checked: nextChecked };
              }),
            };
          }),
        };
      })
    );
  };

  // Update Roadmap Node Status
  const handleUpdateRoadmapStatus = (nodeId: string, status: RoadmapStatus) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== activeProject.id) return proj;
        return {
          ...proj,
          roadmapNodes: proj.roadmapNodes.map((node) => {
            if (node.id !== nodeId) return node;
            return { ...node, status };
          }),
        };
      })
    );
    if (status === 'production-ready' || status === 'mastered') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
      showToast(`Roadmap milestone marked as ${status.toUpperCase()}!`);
    }
  };

  // Toggle Feature Security Checklist Item
  const handleToggleFeatureSecurityCheck = (featureId: string, checklistId: string) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== activeProject.id) return proj;
        return {
          ...proj,
          features: proj.features.map((feat) => {
            if (feat.id !== featureId) return feat;
            return {
              ...feat,
              securityChecklist: feat.securityChecklist.map((sc) => {
                if (sc.id !== checklistId) return sc;
                return { ...sc, completed: !sc.completed };
              }),
            };
          }),
        };
      })
    );
  };

  // Add Generated AI Feature
  const handleAddGeneratedFeature = (newFeature: FullStackFeature) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== activeProject.id) return proj;
        return {
          ...proj,
          features: [newFeature, ...proj.features],
        };
      })
    );
    showToast(`Added "${newFeature.title}" to ${activeProject.clientName} engineering board.`);
  };

  // Update Security Audit Item Status
  const handleUpdateAuditStatus = (id: string, status: AuditStatus) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== activeProject.id) return proj;
        return {
          ...proj,
          securityAudits: proj.securityAudits.map((item) => {
            if (item.id !== id) return item;
            return {
              ...item,
              status,
              lastAuditedDate: new Date().toISOString().split('T')[0],
              lastAuditedBy: 'Dr. Evelyn Vance (Lead Architect)',
            };
          }),
        };
      })
    );
  };

  // Run Automated Audit Scan
  const handleRunAuditScan = () => {
    setIsScanning(true);
    showToast('Executing OWASP Top 10 & NDA compliance automated scan...');
    setTimeout(() => {
      setIsScanning(false);
      setProjects((prev) =>
        prev.map((proj) => {
          if (proj.id !== activeProject.id) return proj;
          return {
            ...proj,
            securityAudits: proj.securityAudits.map((item) => {
              if (item.status === 'warning') {
                return {
                  ...item,
                  status: 'pass' as AuditStatus,
                  mitigationNotes: `${item.mitigationNotes} [Verified Passed by automated suite on ${
                    new Date().toISOString().split('T')[0]
                  }]`,
                  lastAuditedDate: new Date().toISOString().split('T')[0],
                };
              }
              return item;
            }),
          };
        })
      );
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.5 },
      });
      showToast('Security audit scan completed: 100% PASS across OWASP & NDA checks.');
    }, 1500);
  };

  // Create or Schedule a New Dedicated Google Meet Session
  const handleCreateMeetSession = (newSessionData: Omit<MeetSession, 'id'>) => {
    const newSession: MeetSession = {
      ...newSessionData,
      id: `meet-${Date.now()}`,
    };
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== activeProject.id) return proj;
        return {
          ...proj,
          meetSessions: [newSession, ...proj.meetSessions],
        };
      })
    );
    setMeetModalOpen(false);
    setSelectedSession(null);
    showToast(`Scheduled dedicated Google Meet session: "${newSession.title}"`);
  };

  // Toggle Meet Action Item
  const handleToggleMeetActionItem = (sessionId: string, actionId: string) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== activeProject.id) return proj;
        return {
          ...proj,
          meetSessions: proj.meetSessions.map((s) => {
            if (s.id !== sessionId) return s;
            return {
              ...s,
              actionItems: s.actionItems.map((act) => {
                if (act.id !== actionId) return act;
                return { ...act, completed: !act.completed };
              }),
            };
          }),
        };
      })
    );
  };

  // Calculate high level stats
  const totalRoadmapNodes = activeProject.roadmapNodes.length;
  const readyRoadmapNodes = activeProject.roadmapNodes.filter(
    (n) => n.status === 'production-ready' || n.status === 'mastered'
  ).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Toast Notification Bar */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500/50 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <NavigationHeader
        projects={projects}
        activeProject={activeProject}
        onSelectProject={handleSelectProject}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenMeetModal={() => {
          setSelectedSession(null);
          setMeetModalOpen(true);
        }}
        onOpenArchitectModal={() => setArchitectModalOpen(true)}
      />

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* TAB 1: PROJECT OVERVIEW & NDA BANNER */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <ConfidentialMeetBanner
              project={activeProject}
              onOpenMeetModal={() => {
                setSelectedSession(null);
                setMeetModalOpen(true);
              }}
              onSelectSession={(s) => {
                setSelectedSession(s);
                setMeetModalOpen(true);
              }}
            />

            {/* Quick Architecture Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                onClick={() => setActiveTab('roadmap')}
                className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 shadow-lg cursor-pointer transition group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                    <Map className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-emerald-400">
                    {readyRoadmapNodes}/{totalRoadmapNodes} Ready
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mt-3 group-hover:text-emerald-400 transition">
                  Roadmap.sh Full-Stack
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Verified curriculum across React 19, REST/WS APIs, Drizzle ORM, and Cloud Run DevOps.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('features')}
                className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 shadow-lg cursor-pointer transition group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Layers className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-emerald-400">
                    {activeProject.features.length} Active Specs
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mt-3 group-hover:text-emerald-400 transition">
                  Full-Stack Features
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Inspect Front-End components, Back-End REST/WS APIs, and SQL database schemas.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('meet-sessions')}
                className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 shadow-lg cursor-pointer transition group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Video className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-blue-400">
                    {activeProject.meetSessions.length} Recorded
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mt-3 group-hover:text-blue-400 transition">
                  Dedicated Google Meet
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  NDA confidentiality sessions, encrypted meeting agendas, and engineering action items.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('security')}
                className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 shadow-lg cursor-pointer transition group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-emerald-400">100% Pass Rate</span>
                </div>
                <h4 className="text-base font-bold text-white mt-3 group-hover:text-amber-400 transition">
                  Security & OWASP
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  OWASP Top 10 defense, zero-trust RBAC, and encrypted PII data protection.
                </p>
              </div>
            </div>

            {/* Tech Stack Breakdown Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
                <div>
                  <div className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                    Full-Stack Client Stack
                  </div>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {activeProject.clientName} Production Architecture
                  </h3>
                </div>
                <a
                  href={activeProject.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-emerald-400 bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-xl border border-slate-700 transition"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>Confidential Repository</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-teal-400 mb-2">
                    <Layers className="w-4 h-4" />
                    <span>Frontend & Client</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.techStack.frontend.map((item, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-xs bg-slate-900 text-slate-200 border border-slate-700 font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-2">
                    <Server className="w-4 h-4" />
                    <span>Backend & REST/WS</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.techStack.backend.map((item, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-xs bg-slate-900 text-slate-200 border border-slate-700 font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-400 mb-2">
                    <Database className="w-4 h-4" />
                    <span>Database & Caching</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.techStack.database.map((item, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-xs bg-slate-900 text-slate-200 border border-slate-700 font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-400 mb-2">
                    <Cpu className="w-4 h-4" />
                    <span>DevOps & Cloud Run</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.techStack.devops.map((item, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-xs bg-slate-900 text-slate-200 border border-slate-700 font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Preview of Roadmap Tracker & Meet Sessions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Top Roadmap Nodes */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                      Roadmap.sh Highlights
                    </div>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      Core Architecture Checkpoints
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('roadmap')}
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition"
                  >
                    View All {totalRoadmapNodes} Nodes →
                  </button>
                </div>

                <div className="space-y-3">
                  {activeProject.roadmapNodes.slice(0, 3).map((node) => (
                    <div
                      key={node.id}
                      onClick={() => {
                        setSelectedNode(node);
                        setSelectedFeature(null);
                        setCodeModalOpen(true);
                      }}
                      className="bg-slate-800/70 hover:bg-slate-800 border border-slate-700/80 rounded-xl p-4 cursor-pointer transition flex items-center justify-between gap-3"
                    >
                      <div>
                        <span className="text-[10px] uppercase font-bold text-teal-400">
                          {node.category} • {node.level}
                        </span>
                        <h4 className="text-sm font-bold text-white mt-0.5">{node.title}</h4>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {node.whyImportantForClient}
                        </p>
                      </div>
                      <span className="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {node.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Dedicated Google Meet Sessions */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                      Client Confidentiality Protocol
                    </div>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      Dedicated Google Meet Sessions
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedSession(null);
                      setMeetModalOpen(true);
                    }}
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition"
                  >
                    + Schedule Session
                  </button>
                </div>

                <div className="space-y-3">
                  {activeProject.meetSessions.slice(0, 3).map((s) => (
                    <div
                      key={s.id}
                      onClick={() => {
                        setSelectedSession(s);
                        setMeetModalOpen(true);
                      }}
                      className="bg-slate-800/70 hover:bg-slate-800 border border-slate-700/80 rounded-xl p-4 cursor-pointer transition flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{s.date}</span>
                          <span className="text-slate-500">•</span>
                          <span>{s.time}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-1 line-clamp-1">
                          {s.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {s.agenda[0]}
                        </p>
                      </div>
                      <a
                        href={s.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="shrink-0 inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Join</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ROADMAP.SH FULL-STACK TRACKER */}
        {activeTab === 'roadmap' && (
          <RoadmapFullStackTracker
            nodes={activeProject.roadmapNodes}
            onToggleChecklist={handleToggleRoadmapChecklist}
            onUpdateStatus={handleUpdateRoadmapStatus}
            onOpenCodeSnippet={(node) => {
              setSelectedNode(node);
              setSelectedFeature(null);
              setCodeModalOpen(true);
            }}
          />
        )}

        {/* TAB 3: FULL-STACK FEATURES BOARD */}
        {activeTab === 'features' && (
          <FullStackFeatureBoard
            features={activeProject.features}
            onSelectFeature={(feat) => {
              setSelectedFeature(feat);
              setSelectedNode(null);
              setCodeModalOpen(true);
            }}
            onOpenArchitectModal={() => setArchitectModalOpen(true)}
            onToggleSecurityCheck={handleToggleFeatureSecurityCheck}
          />
        )}

        {/* TAB 4: GOOGLE MEET SESSION MANAGER */}
        {activeTab === 'meet-sessions' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                    Client NDA Protocol
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  Dedicated Google Meet Confidentiality Sessions
                </h3>
                <p className="text-sm text-slate-400 mt-1 max-w-3xl">
                  To uphold the utmost confidentiality of the company, in-depth discussions regarding all client projects are conducted strictly through these scheduled Google Meet sessions with verified NDA attendees.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedSession(null);
                  setMeetModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-2.5 px-5 rounded-xl text-xs shadow-lg shadow-emerald-600/20 transition"
              >
                <Video className="w-4 h-4" />
                <span>Schedule Dedicated Session</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeProject.meetSessions.map((s) => (
                <div
                  key={s.id}
                  onClick={() => {
                    setSelectedSession(s);
                    setMeetModalOpen(true);
                  }}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 shadow-lg cursor-pointer transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        NDA VERIFIED
                      </span>
                      <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        {s.date} @ {s.time}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white hover:text-emerald-400 transition">
                      {s.title}
                    </h4>

                    {/* Confidential notes snippet */}
                    <div className="mt-3 bg-slate-800/70 border border-slate-700/60 rounded-xl p-3">
                      <div className="flex items-center gap-1 text-[10px] font-bold uppercase text-emerald-400 mb-1">
                        <Lock className="w-3 h-3" />
                        <span>Confidential Session Notes</span>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-2">{s.confidentialNotes}</p>
                    </div>

                    {/* Attendees count */}
                    <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        {s.attendees.length} Attendees
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {s.actionItems.filter((a) => a.completed).length}/{s.actionItems.length} Action Items
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-400">
                      Click to inspect agenda & NDA action items →
                    </span>
                    <a
                      href={s.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Join Meet</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SECURITY & OWASP AUDIT PANEL */}
        {activeTab === 'security' && (
          <SecurityAuditPanel
            auditItems={activeProject.securityAudits}
            clientName={activeProject.clientName}
            onUpdateStatus={handleUpdateAuditStatus}
            onRunAuditScan={handleRunAuditScan}
            isScanning={isScanning}
          />
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              <strong>Client Project Confidentiality Mandate:</strong> In-depth discussions regarding all client projects are conducted exclusively through dedicated Google Meet sessions.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://roadmap.sh/full-stack"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition underline underline-offset-2"
            >
              Roadmap.sh Full-Stack Curriculum
            </a>
            <span>•</span>
            <span>React 19 + Express 4.21 + PostgreSQL</span>
          </div>
        </div>
      </footer>

      {/* MODAL DIALOGS */}
      {meetModalOpen && (
        <MeetSessionModal
          project={activeProject}
          session={selectedSession}
          onClose={() => {
            setMeetModalOpen(false);
            setSelectedSession(null);
          }}
          onCreateSession={handleCreateMeetSession}
          onToggleActionItem={handleToggleMeetActionItem}
        />
      )}

      {codeModalOpen && (
        <RoadmapCodeModal
          node={selectedNode}
          feature={selectedFeature}
          onClose={() => {
            setCodeModalOpen(false);
            setSelectedNode(null);
            setSelectedFeature(null);
          }}
        />
      )}

      {architectModalOpen && (
        <AIArchitectModal
          clientName={activeProject.clientName}
          onClose={() => setArchitectModalOpen(false)}
          onAddGeneratedFeature={handleAddGeneratedFeature}
        />
      )}
    </div>
  );
}
