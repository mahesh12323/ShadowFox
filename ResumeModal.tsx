import React from 'react';
import {
  X,
  Printer,
  Download,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Award,
  GraduationCap,
  Briefcase,
  Code2,
  CheckCircle2,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  darkMode,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className={`relative w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden max-h-[92vh] flex flex-col ${
          darkMode
            ? 'bg-slate-900 border-slate-700 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Top Controls Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center">
              MP
            </div>
            <div>
              <h3 className="font-bold text-base">Mahesh Poludasu • Resume PDF</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                B.Tech AI &amp; ML &apos;27 | NBKR Institute of Science &amp; Technology
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formatted Resume Body (Printable area) */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 flex-1 print:p-0">
          {/* Header */}
          <div className="text-center pb-6 border-b border-slate-200 dark:border-slate-800">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {PORTFOLIO_DATA.personal.name}
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1 uppercase tracking-widest">
              B.Tech Computer Science and Engineering (AI &amp; ML) • CGPA 8.31
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 dark:text-slate-300 mt-4">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-indigo-500" />
                {PORTFOLIO_DATA.personal.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-500" />
                {PORTFOLIO_DATA.personal.email}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                Mallam, Nellore, India 524403
              </span>
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 underline"
              >
                <Linkedin className="w-3.5 h-3.5" />
                linkedin.com/in/mahesh-poludasu
              </a>
            </div>
          </div>

          {/* SUMMARY */}
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">
              Summary
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {PORTFOLIO_DATA.personal.subtitle}
            </p>
          </div>

          {/* EDUCATION */}
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3">
              Education
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm font-bold">
              <span>{PORTFOLIO_DATA.education[0].degree}</span>
              <span className="text-indigo-600 dark:text-indigo-400">
                {PORTFOLIO_DATA.education[0].period} • {PORTFOLIO_DATA.education[0].cgpa}
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">
              {PORTFOLIO_DATA.education[0].institution}, {PORTFOLIO_DATA.education[0].location}
            </p>
          </div>

          {/* EXPERIENCE */}
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3">
              Experience
            </h2>
            {PORTFOLIO_DATA.experience.map((exp, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm font-bold">
                  <span>
                    {exp.role} – <span className="text-indigo-600 dark:text-indigo-400">{exp.company}</span>
                  </span>
                  <span className="text-xs text-slate-500">{exp.period}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* PROJECTS */}
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3">
              Projects
            </h2>
            <div className="space-y-4">
              {PORTFOLIO_DATA.projects.map((proj, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-sm font-bold">
                    <span>{proj.title}</span>
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      {proj.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300">
                    {proj.fullDescription}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SKILLS & CERTIFICATIONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">
                Technical Skills
              </h2>
              <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
                <p>
                  <strong>Languages &amp; AI:</strong> Python, Machine Learning, Generative AI, NLP
                </p>
                <p>
                  <strong>Development:</strong> Full Stack Web Development (React, TypeScript, Tailwind CSS, Node.js)
                </p>
                <p>
                  <strong>Core Fundamentals:</strong> Data Warehouse, Cybersecurity, CloudOps
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">
                Certifications
              </h2>
              <div className="flex flex-wrap gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                {PORTFOLIO_DATA.certifications.map((cert, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-semibold"
                  >
                    {cert.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Official Academic &amp; Industry Profile of Mahesh Poludasu
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
