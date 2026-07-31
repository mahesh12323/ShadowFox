import React from 'react';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  Award,
  Trophy,
  Users,
  Sparkles,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ExperienceSectionProps {
  darkMode: boolean;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  darkMode,
}) => {
  const getActivityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award':
        return Award;
      case 'Trophy':
        return Trophy;
      default:
        return Users;
    }
  };

  return (
    <section
      id="experience"
      className={`py-16 md:py-24 border-t transition-colors ${
        darkMode
          ? 'bg-slate-900/50 border-slate-800'
          : 'bg-white/50 backdrop-blur-sm border-indigo-100/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="relative text-center max-w-3xl mx-auto mb-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-indigo-500/15 via-indigo-500/5 to-transparent dark:from-indigo-950/60 dark:via-indigo-950/20 dark:to-transparent border-t border-indigo-500/20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 mb-3 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Career &amp; Academic Timeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Experience &amp;{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
              Activities
            </span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Industry internship experience at Cognifyz IT Solutions, B.Tech AI &amp; ML education, and active leadership in IEEE CIS.
          </p>
        </div>

        {/* Two Columns: Experience + Education */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left Column: Experience */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Industry Experience
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Practical Machine Learning &amp; Industry Internships
                </p>
              </div>
            </div>

            {PORTFOLIO_DATA.experience.map((exp, idx) => (
              <div
                key={idx}
                className={`p-6 sm:p-7 rounded-2xl border transition-all ${
                  darkMode
                    ? 'bg-slate-800/80 border-slate-700/80 shadow-lg'
                    : 'bg-white border-slate-200/80 shadow-sm'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-1">
                      {exp.type}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      {exp.role}
                    </h4>
                    <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end text-xs text-slate-500 dark:text-slate-400 font-medium gap-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Bullet points */}
                <div className="space-y-2 mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-700/60">
                  {exp.description.map((point, pIdx) => (
                    <div
                      key={pIdx}
                      className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Skills Used Badges */}
                <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-slate-200/60 dark:border-slate-700/60">
                  {exp.skillsUsed.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                        darkMode
                          ? 'bg-slate-900 text-slate-300 border border-slate-700'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Education & IEEE CIS Activities */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Education &amp; Leadership
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  NBKRIST Engineering &amp; IEEE CIS Involvement
                </p>
              </div>
            </div>

            {/* Education Item */}
            {PORTFOLIO_DATA.education.map((edu, idx) => (
              <div
                key={idx}
                className={`p-6 sm:p-7 rounded-2xl border transition-all ${
                  darkMode
                    ? 'bg-slate-800/80 border-slate-700/80 shadow-lg'
                    : 'bg-white border-slate-200/80 shadow-sm'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 mb-1">
                      {edu.cgpa}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      {edu.degree}
                    </h4>
                    <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                      {edu.institution}
                    </p>
                  </div>
                  <div className="flex flex-col sm:items-end text-xs text-slate-500 dark:text-slate-400 font-medium gap-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {edu.location}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-700/60">
                  {edu.highlights.map((point, pIdx) => (
                    <div
                      key={pIdx}
                      className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Activities Card */}
            <div
              className={`p-6 sm:p-7 rounded-2xl border ${
                darkMode
                  ? 'bg-slate-800/60 border-slate-700/80'
                  : 'bg-slate-50/70 border-slate-200'
              }`}
            >
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                Extracurricular &amp; IEEE Activities
              </h4>

              <div className="space-y-4">
                {PORTFOLIO_DATA.activities.map((act, idx) => {
                  const IconComp = getActivityIcon(act.icon);
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm text-slate-900 dark:text-white">
                          {act.title}
                        </h5>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                          {act.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Certifications Row */}
        <div id="certifications" className="pt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Verified Certifications &amp; Credentials
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Core competencies from Python to CloudOps &amp; Cybersecurity
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTFOLIO_DATA.certifications.map((cert, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                  darkMode
                    ? 'bg-slate-800/70 border-slate-700 hover:border-indigo-500/50'
                    : 'bg-white border-slate-200 hover:border-indigo-300 shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                      {cert.title}
                    </h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {cert.issuer}
                    </p>
                  </div>
                </div>
                <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 shrink-0">
                  {cert.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
