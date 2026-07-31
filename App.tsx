/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [resumeModalOpen, setResumeModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Check user preference or default to bright modern light mode
    const savedMode = localStorage.getItem('mahesh_dark_mode');
    if (savedMode === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const nextMode = !prev;
      localStorage.setItem('mahesh_dark_mode_v2', String(nextMode));
      if (nextMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return nextMode;
    });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 font-sans relative overflow-x-hidden bg-grid-pattern ${
        darkMode
          ? 'dark bg-slate-950 text-slate-100'
          : 'bg-gradient-to-br from-slate-50 via-indigo-50/40 to-violet-50/30 text-slate-900'
      }`}
    >
      {/* Attractive ambient background lighting accents */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="fixed bottom-10 right-10 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Sticky Responsive Navigation */}
      <Navbar
        onOpenResumeModal={() => setResumeModalOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          onOpenResumeModal={() => setResumeModalOpen(true)}
          darkMode={darkMode}
        />
        <About darkMode={darkMode} />
        <SkillsSection darkMode={darkMode} />
        <ExperienceSection darkMode={darkMode} />
        <ProjectsSection darkMode={darkMode} />
        <ContactSection darkMode={darkMode} />
      </main>

      {/* Footer */}
      <Footer darkMode={darkMode} />

      {/* Digital Printable/Downloadable Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        darkMode={darkMode}
      />
    </div>
  );
}
