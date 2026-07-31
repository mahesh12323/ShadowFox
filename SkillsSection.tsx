import React, { useState } from 'react';
import {
  Brain,
  Code2,
  Cloud,
  CheckCircle2,
  Sparkles,
  Layers,
  Terminal,
  Shield,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface SkillsSectionProps {
  darkMode: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState<'all' | string>('all');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain':
        return Brain;
      case 'Code2':
        return Code2;
      case 'Cloud':
        return Cloud;
      default:
        return Layers;
    }
  };

  const tabs = [
    { id: 'all', label: 'All Categories' },
    { id: 'Languages & AI / ML', label: 'Languages & AI / ML' },
    { id: 'Full Stack Development', label: 'Full Stack Development' },
    { id: 'CloudOps & Systems', label: 'CloudOps & Systems' },
  ];

  const filteredCategories =
    activeTab === 'all'
      ? PORTFOLIO_DATA.skillCategories
      : PORTFOLIO_DATA.skillCategories.filter((cat) => cat.title === activeTab);

  return (
    <section
      id="skills"
      className={`py-16 md:py-24 border-t transition-colors ${
        darkMode
          ? 'bg-slate-900/50 border-slate-800'
          : 'bg-white/50 backdrop-blur-sm border-indigo-100/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="relative text-center max-w-3xl mx-auto mb-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-indigo-500/15 via-indigo-500/5 to-transparent dark:from-indigo-950/60 dark:via-indigo-950/20 dark:to-transparent border-t border-indigo-500/20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Skills &amp;{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
              Proficiencies
            </span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            A comprehensive breakdown of my expertise across Languages, Machine
            Learning, Generative AI, Full Stack Development, and CloudOps.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20'
                    : darkMode
                    ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredCategories.map((category, idx) => {
            const IconComponent = getIcon(category.iconName);

            return (
              <div
                key={idx}
                className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  darkMode
                    ? 'bg-slate-800/70 border-slate-700/80 hover:border-indigo-500/50 shadow-lg'
                    : 'bg-white border-slate-200/80 hover:border-indigo-300 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  {/* Card Title & Icon */}
                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {category.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {category.skills.length} Core Competencies
                      </p>
                    </div>
                  </div>

                  {/* Skill Items with Proficiency Bars */}
                  <div className="space-y-4">
                    {category.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {skill.name}
                          </span>
                          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                            {skill.level}%
                          </span>
                        </div>

                        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-500 transition-all duration-700"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tag Pills Footer */}
                <div className="mt-8 pt-5 border-t border-slate-200 dark:border-slate-700/80">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                    Focus Areas &amp; Specializations
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                          darkMode
                            ? 'bg-slate-900 text-slate-300 border border-slate-700'
                            : 'bg-white text-slate-700 border border-slate-200 shadow-2xs'
                        }`}
                      >
                        {skill.tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Summary Banner */}
        <div
          className={`mt-12 p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
            darkMode
              ? 'bg-indigo-950/30 border-indigo-900/60 text-indigo-200'
              : 'bg-indigo-50/80 border-indigo-200/80 text-indigo-900'
          }`}
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            <CheckCircle2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0 hidden sm:block" />
            <div>
              <h4 className="font-bold text-sm sm:text-base">
                Ready for AI/ML &amp; Full Stack Development Roles
              </h4>
              <p className="text-xs sm:text-sm text-indigo-700/80 dark:text-indigo-300/80 mt-0.5">
                Experienced in combining Python data-driven models with modern React &amp; Tailwind web applications.
              </p>
            </div>
          </div>
          <a
            href="#projects"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shrink-0 shadow transition-colors"
          >
            See Skills in Action
          </a>
        </div>
      </div>
    </section>
  );
};
