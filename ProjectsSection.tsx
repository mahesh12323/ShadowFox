import React, { useState } from 'react';
import {
  Code2,
  ExternalLink,
  Github,
  Play,
  Sparkles,
  Terminal,
  Bot,
  BarChart3,
  Gamepad2,
  X,
  Send,
  RefreshCw,
  CheckCircle2,
  Cpu,
  Layers,
} from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';

interface ProjectsSectionProps {
  darkMode: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ darkMode }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getProjectIcon = (demoType: string) => {
    switch (demoType) {
      case 'chatbot':
        return Bot;
      case 'dashboard':
        return BarChart3;
      case 'game':
        return Gamepad2;
      default:
        return Code2;
    }
  };

  return (
    <section
      id="projects"
      className={`py-16 md:py-24 transition-colors ${
        darkMode ? 'bg-slate-900/40 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="relative text-center max-w-3xl mx-auto mb-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-indigo-500/15 via-indigo-500/5 to-transparent dark:from-indigo-950/60 dark:via-indigo-950/20 dark:to-transparent border-t border-indigo-500/20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 mb-3 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Technical Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Portfolio{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Click &quot;Interactive Preview&quot; on any project card to test a live functional simulation of the NLP Chatbot, AI Dashboard, or Python Puzzle Game.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PORTFOLIO_DATA.projects.map((project) => {
            const IconComponent = getProjectIcon(project.demoType);

            return (
              <div
                key={project.id}
                className={`rounded-2xl border flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1.5 ${
                  darkMode
                    ? 'bg-slate-800/80 border-slate-700/80 hover:border-indigo-500/60 shadow-xl'
                    : 'bg-white border-slate-200/80 hover:border-indigo-300 shadow-sm hover:shadow-lg'
                }`}
              >
                <div>
                  {/* Card Banner */}
                  <div className="relative h-44 bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 p-6 flex flex-col justify-between overflow-hidden group">
                    {/* Decorative grid pattern */}
                    <div className="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

                    <div className="flex items-center justify-between relative z-10">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">
                        {project.category}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        {project.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white leading-tight">
                          {project.title}
                        </h3>
                        <span className="text-xs text-indigo-300 font-medium">
                          Interactive Demo Ready
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {project.shortDescription}
                    </p>

                    {/* Highlights bullet points */}
                    <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                      {project.highlights.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tech stack tags and Card Actions */}
                <div className="p-6 pt-0 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                          darkMode
                            ? 'bg-slate-900 text-slate-300 border border-slate-700'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold text-xs shadow-md transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Interactive Preview</span>
                    </button>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2.5 rounded-xl border transition-colors ${
                          darkMode
                            ? 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                            : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                        title="View Code on GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Project Preview Modal */}
      {selectedProject && (
        <ProjectPreviewModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          darkMode={darkMode}
        />
      )}
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/*                 INTERACTIVE PROJECT PREVIEW MODAL & SIMULATOR             */
/* -------------------------------------------------------------------------- */

interface ProjectPreviewModalProps {
  project: Project;
  onClose: () => void;
  darkMode: boolean;
}

const ProjectPreviewModal: React.FC<ProjectPreviewModalProps> = ({
  project,
  onClose,
  darkMode,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className={`relative w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden max-h-[90vh] flex flex-col ${
          darkMode
            ? 'bg-slate-900 border-slate-700 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                {project.category} • Live Simulation
              </span>
              <h3 className="text-lg sm:text-xl font-bold">{project.title}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Interactive Simulation Container */}
          <div className="rounded-2xl border border-indigo-200 dark:border-indigo-900/80 bg-indigo-50/40 dark:bg-slate-950 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-indigo-200/60 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Interactive Live Sandbox
                </span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Test project mechanics below
              </span>
            </div>

            {/* Conditional demo based on project type */}
            {project.demoType === 'chatbot' && <ChatbotSimulator darkMode={darkMode} />}
            {project.demoType === 'dashboard' && <DashboardSimulator darkMode={darkMode} />}
            {project.demoType === 'game' && <PuzzleGameSimulator darkMode={darkMode} />}
          </div>

          {/* Project Detailed Description */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Project Overview &amp; Architecture
            </h4>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Tech Stack list */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Technologies &amp; Libraries
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/40">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Mahesh Poludasu • Portfolio Showcase
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                         SIMULATOR 1: NLP CHATBOT                           */
/* -------------------------------------------------------------------------- */

const ChatbotSimulator: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [messages, setMessages] = useState<
    { sender: 'bot' | 'user'; text: string; time: string }[]
  >([
    {
      sender: 'bot',
      text: "Hello! I am Mahesh's NLP Chatbot Assistant. Ask me about Mahesh's skills, his Cognifyz Machine Learning internship, or his B.Tech AI & ML education at NBKRIST!",
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');

  const sampleQuestions = [
    'What are Mahesh’s core skills?',
    'Tell me about his Cognifyz internship',
    'What is Mahesh’s CGPA?',
  ];

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg = { sender: 'user' as const, text: query, time: 'Just now' };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    setTimeout(() => {
      let response =
        "Mahesh is an AI & ML undergraduate at NBKRIST with skills in Python, NLP, Full Stack Development, and Cybersecurity. Feel free to ask anything about his resume!";
      const lower = query.toLowerCase();

      if (lower.includes('skill') || lower.includes('python') || lower.includes('ai')) {
        response =
          'Mahesh specializes in Python, Machine Learning, Generative AI, Natural Language Processing, Full Stack Web Development (React & Tailwind), and CloudOps.';
      } else if (lower.includes('intern') || lower.includes('cognifyz') || lower.includes('experience')) {
        response =
          'At Cognifyz IT Solutions (Oct 2026), Mahesh completed a Machine Learning internship focused on applying data-driven solutions to real-world problems and enhancing project-based analytical teamwork.';
      } else if (lower.includes('cgpa') || lower.includes('education') || lower.includes('nbkrist')) {
        response =
          'Mahesh is pursuing B.Tech in Computer Science and Engineering (AI & ML) at NBKR Institute of Science and Technology, expecting graduation in May 2027 with a CGPA of 8.31.';
      } else if (lower.includes('contact') || lower.includes('phone') || lower.includes('email')) {
        response =
          'You can contact Mahesh at maheshpoludasu203@gmail.com or via WhatsApp/Phone at +91 9440674770.';
      }

      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: response, time: 'Just now' },
      ]);
    }, 450);
  };

  return (
    <div className="space-y-4">
      {/* Messages area */}
      <div
        className={`h-60 overflow-y-auto p-4 rounded-xl border space-y-3 ${
          darkMode
            ? 'bg-slate-900/90 border-slate-800'
            : 'bg-white border-slate-200 shadow-inner'
        }`}
      >
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${
              m.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm ${
                m.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : darkMode
                  ? 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                  : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'
              }`}
            >
              {m.text}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>
          </div>
        ))}
      </div>

      {/* Quick Prompts */}
      <div className="flex flex-wrap gap-1.5">
        {sampleQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-indigo-100/80 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-200 transition-colors"
          >
            &quot;{q}&quot;
          </button>
        ))}
      </div>

      {/* Input box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about Mahesh's AI/ML skills..."
          className={`flex-1 px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            darkMode
              ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
              : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
          }`}
        />
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold flex items-center gap-1.5"
        >
          <Send className="w-4 h-4" />
          <span>Send</span>
        </button>
      </form>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                    SIMULATOR 2: DYNAMIC AI DASHBOARD                       */
/* -------------------------------------------------------------------------- */

const DashboardSimulator: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [activeMetric, setActiveMetric] = useState('ml');
  const [telemetryCount, setTelemetryCount] = useState(14280);

  return (
    <div className="space-y-4">
      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => setActiveMetric('ml')}
          className={`p-3 rounded-xl border text-left transition-all ${
            activeMetric === 'ml'
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/60'
              : darkMode
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200'
          }`}
        >
          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            Model Accuracy
          </div>
          <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            98.4%
          </div>
          <div className="text-[10px] text-emerald-500 font-semibold mt-0.5">
            +2.1% optimization
          </div>
        </button>

        <button
          onClick={() => setActiveMetric('data')}
          className={`p-3 rounded-xl border text-left transition-all ${
            activeMetric === 'data'
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/60'
              : darkMode
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200'
          }`}
        >
          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            Processed Tokens
          </div>
          <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            {telemetryCount.toLocaleString()}
          </div>
          <div className="text-[10px] text-emerald-500 font-semibold mt-0.5">
            Real-time feed
          </div>
        </button>

        <button
          onClick={() => setActiveMetric('latency')}
          className={`p-3 rounded-xl border text-left transition-all ${
            activeMetric === 'latency'
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/60'
              : darkMode
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200'
          }`}
        >
          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            Avg Latency
          </div>
          <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            24ms
          </div>
          <div className="text-[10px] text-emerald-500 font-semibold mt-0.5">
            Ultra-low response
          </div>
        </button>
      </div>

      {/* Simulated Visual Graph / Telemetry Chart */}
      <div
        className={`p-4 rounded-xl border ${
          darkMode
            ? 'bg-slate-900/90 border-slate-800'
            : 'bg-white border-slate-200 shadow-inner'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase text-slate-500">
            {activeMetric === 'ml'
              ? 'NLP Intent Accuracy Progression'
              : activeMetric === 'data'
              ? 'Real-Time Query Volume'
              : 'API Response Latency Curve'}
          </span>
          <button
            onClick={() => setTelemetryCount((c) => c + Math.floor(Math.random() * 300 + 50))}
            className="flex items-center gap-1 text-xs text-indigo-600 font-semibold"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Simulate Stream</span>
          </button>
        </div>

        {/* CSS Bar Chart Simulation */}
        <div className="flex items-end justify-between gap-2 h-32 pt-4 px-2">
          {[45, 60, 52, 75, 68, 88, 82, 94, 98].map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-indigo-600 to-violet-500 transition-all duration-500 hover:opacity-80"
                style={{ height: `${height}%` }}
              />
              <span className="text-[9px] text-slate-400">T{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                  SIMULATOR 3: PYTHON PUZZLE GAME SANDBOX                  */
/* -------------------------------------------------------------------------- */

const PuzzleGameSimulator: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  // Simple 3x3 sliding number puzzle demo
  const [board, setBoard] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 0, 8]); // 0 is empty
  const [moves, setMoves] = useState(0);

  const shuffle = () => {
    const arr = [1, 2, 3, 4, 0, 5, 7, 8, 6];
    setBoard(arr);
    setMoves(0);
  };

  const handleClick = (index: number) => {
    const emptyIndex = board.indexOf(0);
    const validMoves = [
      emptyIndex - 3, // above
      emptyIndex + 3, // below
      emptyIndex % 3 !== 0 ? emptyIndex - 1 : -1, // left
      emptyIndex % 3 !== 2 ? emptyIndex + 1 : -1, // right
    ];

    if (validMoves.includes(index)) {
      const nextBoard = [...board];
      nextBoard[emptyIndex] = nextBoard[index];
      nextBoard[index] = 0;
      setBoard(nextBoard);
      setMoves((m) => m + 1);
    }
  };

  const isWon = board.join(',') === '1,2,3,4,5,6,7,8,0';

  return (
    <div className="space-y-4 text-center">
      <div className="flex items-center justify-between px-2">
        <span className="text-xs font-bold text-slate-500">
          Moves: <strong className="text-indigo-600">{moves}</strong>
        </span>
        {isWon && (
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            🎉 Puzzle Solved!
          </span>
        )}
        <button
          onClick={shuffle}
          className="flex items-center gap-1 text-xs text-indigo-600 font-semibold hover:underline"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Shuffle Puzzle</span>
        </button>
      </div>

      {/* 3x3 Grid */}
      <div className="grid grid-cols-3 gap-2.5 max-w-xs mx-auto p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        {board.map((num, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            disabled={num === 0}
            className={`h-16 rounded-xl font-bold text-lg flex items-center justify-center transition-all ${
              num === 0
                ? 'bg-transparent border border-dashed border-slate-300 dark:border-slate-700 cursor-default'
                : darkMode
                ? 'bg-slate-800 text-white hover:bg-indigo-600 shadow border border-slate-700'
                : 'bg-white text-slate-800 hover:bg-indigo-50 shadow border border-slate-200'
            }`}
          >
            {num !== 0 ? num : ''}
          </button>
        ))}
      </div>
      <p className="text-xs text-slate-500">
        Click an adjacent tile next to the empty space to slide it.
      </p>
    </div>
  );
};
