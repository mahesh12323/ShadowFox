import React from 'react';
import { 
  ShieldCheck, 
  Video, 
  Lock, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  ExternalLink, 
  FileText, 
  AlertCircle,
  PlusCircle,
  ChevronRight
} from 'lucide-react';
import { ClientProject, MeetSession } from '../types/project';

interface ConfidentialMeetBannerProps {
  project: ClientProject;
  onOpenMeetModal: () => void;
  onSelectSession: (session: MeetSession) => void;
}

export const ConfidentialMeetBanner: React.FC<ConfidentialMeetBannerProps> = ({
  project,
  onOpenMeetModal,
  onSelectSession,
}) => {
  const nextSession = project.meetSessions[0] || null;
  const completedActionItems = project.meetSessions.flatMap((s) => s.actionItems).filter((a) => a.completed).length;
  const totalActionItems = project.meetSessions.flatMap((s) => s.actionItems).length;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950/60 border border-slate-700/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-1/3 -bottom-20 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left Column: NDA & Client Confidentiality Notice */}
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Lock className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
              {project.confidentialityLevel} MANDATE
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              Signed: {project.ndaSignedDate}
            </span>
            <a
              href="https://roadmap.sh/full-stack"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/20 transition"
            >
              Roadmap.sh Full-Stack
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Client Confidentiality & Dedicated Google Meet Protocol
          </h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            To uphold the utmost confidentiality of <span className="text-white font-semibold">{project.clientName}</span>, in-depth discussions regarding all full-stack architecture, database schemas, and client features are conducted strictly through dedicated Google Meet sessions.
          </p>

          {/* Key Stats Bar */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Video className="w-4 h-4 text-emerald-400" />
              <span>Dedicated Sessions:</span>
              <strong className="text-white">{project.meetSessions.length} Recorded</strong>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>NDA Action Items:</span>
              <strong className="text-white">
                {completedActionItems} / {totalActionItems} Completed
              </strong>
            </div>
          </div>
        </div>

        {/* Right Column: Next Meet Session & Schedule Button */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
          {nextSession ? (
            <div className="bg-slate-900/90 border border-slate-700 rounded-xl p-4 sm:min-w-[280px] shadow-lg">
              <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold mb-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  NEXT SCHEDULED MEET
                </span>
                <span className="text-slate-400 text-[11px] font-normal">{nextSession.date}</span>
              </div>
              <h4 className="text-sm font-semibold text-white line-clamp-1">{nextSession.title}</h4>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {nextSession.time}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  {nextSession.attendees.length} Attendees
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <a
                  href={nextSession.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold py-2 px-3 rounded-lg transition shadow"
                >
                  <Video className="w-3.5 h-3.5" />
                  Join Google Meet
                </a>
                <button
                  type="button"
                  onClick={() => onSelectSession(nextSession)}
                  className="inline-flex items-center justify-center px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition border border-slate-700"
                  title="View Confidential Agenda & Notes"
                >
                  <FileText className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/90 border border-slate-700 rounded-xl p-4 text-center">
              <p className="text-xs text-slate-400">No scheduled Google Meet sessions</p>
            </div>
          )}

          <button
            type="button"
            onClick={onOpenMeetModal}
            className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/40 py-2.5 px-4 rounded-xl text-xs font-semibold transition shadow-md hover:shadow-emerald-500/10"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>Schedule Dedicated Google Meet Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};
