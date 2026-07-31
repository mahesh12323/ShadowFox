import React from 'react';
import {
  GraduationCap,
  Award,
  Users,
  Terminal,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface AboutProps {
  darkMode: boolean;
}

export const About: React.FC<AboutProps> = ({ darkMode }) => {
  const highlights = [
    {
      icon: Cpu,
      title: 'AI & ML Specialization',
      description:
        'Focused coursework and practical implementations in Machine Learning, Natural Language Processing, and Generative AI systems.',
    },
    {
      icon: ShieldCheck,
      title: 'Full Stack & Cybersecurity',
      description:
        'Experienced in building responsive frontend architectures paired with secure backend data processing and CloudOps pipelines.',
    },
    {
      icon: Users,
      title: 'IEEE CIS Active Leadership',
      description:
        'Demonstrated teamwork, technical seminar leadership, and collaborative problem-solving through IEEE Computational Intelligence Society events.',
    },
  ];

  return (
    <section
      id="about"
      className={`py-16 md:py-24 border-t transition-colors ${
        darkMode
          ? 'bg-slate-900/50 border-slate-800'
          : 'bg-white/50 backdrop-blur-sm border-indigo-100/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="relative text-center max-w-3xl mx-auto mb-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-indigo-500/15 via-indigo-500/5 to-transparent dark:from-indigo-950/60 dark:via-indigo-950/20 dark:to-transparent border-t border-indigo-500/20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 mb-3 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Profile & Summary</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            About{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
              Mahesh Poludasu
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Motivated tech student with skills in Machine Learning, Cybersecurity, Generative AI, and Full Stack Development. Strong leadership, teamwork, and problem-solving abilities demonstrated through IEEE CIS activities, technical events, and innovative projects.
          </p>
        </div>

        {/* 3 Key Pillar Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  darkMode
                    ? 'bg-slate-800/80 border-slate-700/80 hover:border-indigo-500/50 shadow-lg'
                    : 'bg-white border-slate-200/80 hover:border-indigo-300 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Education & Academic Excellence Card */}
        <div
          className={`rounded-3xl border p-6 sm:p-10 transition-all ${
            darkMode
              ? 'bg-gradient-to-br from-slate-800/90 via-slate-900 to-indigo-950/40 border-slate-700'
              : 'bg-gradient-to-br from-white via-indigo-50/30 to-white border-slate-200/80 shadow-sm'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                <GraduationCap className="w-5 h-5" />
                <span>PRIMARY EDUCATION CREDENTIAL</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {PORTFOLIO_DATA.education[0].degree}
              </h3>
              <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
                {PORTFOLIO_DATA.education[0].institution} •{' '}
                <span className="text-slate-500 dark:text-slate-400 font-normal">
                  {PORTFOLIO_DATA.education[0].location}
                </span>
              </p>

              <div className="space-y-2 pt-2">
                {PORTFOLIO_DATA.education[0].highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side academic metric badge */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0">
              <div
                className={`p-6 rounded-2xl border text-center ${
                  darkMode
                    ? 'bg-slate-800/80 border-slate-700'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {PORTFOLIO_DATA.education[0].cgpa}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
                  Academic Performance
                </div>
              </div>

              <div
                className={`p-4 rounded-2xl border text-center ${
                  darkMode
                    ? 'bg-slate-800/80 border-slate-700'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {PORTFOLIO_DATA.education[0].period}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                  Graduation Timeline
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
