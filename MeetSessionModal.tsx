import React, { useState } from 'react';
import { 
  X, 
  Video, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  Users, 
  Lock, 
  CheckCircle2, 
  Plus, 
  ExternalLink, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { MeetSession, ClientProject, FeatureLayer } from '../types/project';

interface MeetSessionModalProps {
  project: ClientProject;
  session: MeetSession | null;
  onClose: () => void;
  onCreateSession: (newSession: Omit<MeetSession, 'id'>) => void;
  onToggleActionItem: (sessionId: string, actionId: string) => void;
}

export const MeetSessionModal: React.FC<MeetSessionModalProps> = ({
  project,
  session,
  onClose,
  onCreateSession,
  onToggleActionItem,
}) => {
  const [isCreating, setIsCreating] = useState(!session);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('2026-08-10');
  const [time, setTime] = useState('14:00 (PST)');
  const [meetLink, setMeetLink] = useState('https://meet.google.com/new-secure-nda');
  const [attendeesStr, setAttendeesStr] = useState(
    'maheshpoludasu203@gmail.com, sarah.jenning@client.io, evelyn.vance@studio.ai'
  );
  const [agendaStr, setAgendaStr] = useState(
    '1. Review full-stack security audit\n2. Discuss WebSocket data streaming\n3. Confirm Roadmap.sh milestones'
  );
  const [notes, setNotes] = useState(
    'CONFIDENTIAL CLIENT SESSION: All attendees must verify active NDA before joining the Google Meet call.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onCreateSession({
      title,
      clientName: project.clientName,
      date,
      time,
      durationMinutes: 60,
      meetLink,
      attendees: attendeesStr.split(',').map((s) => s.trim()).filter(Boolean),
      agenda: agendaStr.split('\n').filter(Boolean),
      confidentialNotes: notes,
      actionItems: [
        {
          id: `act-${Date.now()}-1`,
          text: 'Verify SQL injection test suite report',
          assignee: 'Lead Full-Stack Eng',
          completed: false,
          layer: 'security',
        },
        {
          id: `act-${Date.now()}-2`,
          text: 'Review React 19 optimistic UI hooks',
          assignee: 'Lead Full-Stack Eng',
          completed: false,
          layer: 'frontend',
        },
      ],
      isConfidentialNDA: true,
      recordingConsentVerified: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-950/90 via-slate-900 to-emerald-950/90 border-b border-slate-800 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase text-emerald-400">
                  Google Meet Protocol
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  NDA VERIFIED
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">
                {isCreating ? 'Schedule Dedicated Google Meet Session' : session?.title}
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

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {isCreating ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  To uphold the utmost confidentiality of {project.clientName}, all session invitees are automatically screened for signed NDA compliance.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Session Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Sprint 5 Full-Stack Architecture Review & Database Schema Audit"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Time (Timezone)
                  </label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Dedicated Google Meet Link
                </label>
                <input
                  type="url"
                  value={meetLink}
                  onChange={(e) => setMeetLink(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-emerald-400 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Attendees (comma separated emails)
                </label>
                <input
                  type="text"
                  value={attendeesStr}
                  onChange={(e) => setAttendeesStr(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Session Agenda Items (one per line)
                </label>
                <textarea
                  rows={3}
                  value={agendaStr}
                  onChange={(e) => setAgendaStr(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Confidential NDA Session Notes / Advisory
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/20 transition"
                >
                  Confirm & Schedule Session
                </button>
              </div>
            </form>
          ) : session ? (
            <div className="space-y-6">
              {/* Session Meta */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>{session.date}</span>
                  <span className="text-slate-500">•</span>
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>{session.time} ({session.durationMinutes} min)</span>
                </div>
                <a
                  href={session.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow transition"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Join Google Meet</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>
              </div>

              {/* Confidential Notes Box */}
              <div className="bg-slate-800/60 border border-emerald-500/30 rounded-xl p-4">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-emerald-400 mb-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Confidential Session Summary & NDA Notes</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">{session.confidentialNotes}</p>
              </div>

              {/* Agenda */}
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                  Session Agenda
                </h4>
                <div className="space-y-1.5">
                  {session.agenda.map((item, i) => (
                    <div
                      key={i}
                      className="bg-slate-800/50 border border-slate-700/60 rounded-lg px-3.5 py-2 text-xs text-slate-200"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Items */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                    Full-Stack NDA Action Items
                  </h4>
                  <span className="text-xs text-emerald-400 font-semibold">
                    {session.actionItems.filter((a) => a.completed).length} / {session.actionItems.length} Done
                  </span>
                </div>
                <div className="space-y-2">
                  {session.actionItems.map((act) => (
                    <label
                      key={act.id}
                      className="flex items-start gap-2.5 bg-slate-800/70 border border-slate-700/80 rounded-xl p-3 cursor-pointer select-none transition hover:border-slate-600"
                    >
                      <input
                        type="checkbox"
                        checked={act.completed}
                        onChange={() => onToggleActionItem(session.id, act.id)}
                        className="mt-0.5 w-4 h-4 rounded bg-slate-900 border-slate-600 text-emerald-500 focus:ring-emerald-500/40"
                      />
                      <div className="flex-1">
                        <div
                          className={`text-xs font-medium ${
                            act.completed ? 'line-through text-slate-500' : 'text-white'
                          }`}
                        >
                          {act.text}
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
                          <span className="bg-slate-900 px-1.5 py-0.5 rounded uppercase font-bold text-slate-300">
                            {act.layer}
                          </span>
                          <span>Assignee: {act.assignee}</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsCreating(true)}
                  className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 px-4 py-2 rounded-xl text-xs font-semibold transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Schedule Another Session</span>
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
