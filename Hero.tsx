import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  FileText,
  Linkedin,
  Mail,
  Phone,
  Sparkles,
  MapPin,
  CheckCircle2,
  Award,
  Terminal,
  MessageSquare,
  Upload,
  RefreshCw,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeroProps {
  onOpenResumeModal: () => void;
  darkMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal, darkMode }) => {
  // Allow user to upload their WhatsApp photo or switch between default portrait & custom photo
  const [profileImage, setProfileImage] = useState<string>(() => {
    return localStorage.getItem('mahesh_profile_image') || '';
  });
  const [imageHovered, setImageHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setProfileImage(result);
        localStorage.setItem('mahesh_profile_image', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = () => {
    setProfileImage('');
    localStorage.removeItem('mahesh_profile_image');
  };

  return (
    <section
      id="hero"
      className="relative pt-24 sm:pt-32 pb-16 md:pb-24 overflow-hidden"
    >
      {/* Subtle background gradient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Introduction & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status / Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>B.Tech AI & ML '27 • NBKRIST</span>
              <span className="text-indigo-300 dark:text-indigo-600">|</span>
              <span className="font-semibold">CGPA: 8.31</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none">
              <span className={`block ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Hi, I&apos;m
              </span>
              <span className="block mt-2 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 dark:from-indigo-400 dark:via-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
                {PORTFOLIO_DATA.personal.name}
              </span>
            </h1>

            {/* Roles / Specializations */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2 text-sm sm:text-base font-medium text-slate-600 dark:text-slate-300">
              <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                Machine Learning
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                Generative AI
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                Full Stack Development
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                Cybersecurity
              </span>
            </div>

            {/* Summary description */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Motivated computer science undergrad specializing in{' '}
              <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">
                AI & Machine Learning
              </strong>{' '}
              at NBKR Institute of Science and Technology. Former ML Intern at Cognifyz IT
              Solutions with proven problem-solving and full-stack development experience.
            </p>

            {/* Location & Contact Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-indigo-500" />
                <span>Nellore, Andhra Pradesh, India</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-indigo-500" />
                <span>{PORTFOLIO_DATA.personal.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-indigo-500" />
                <span>{PORTFOLIO_DATA.personal.phone}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02]"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResumeModal}
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold border transition-all ${
                  darkMode
                    ? 'border-slate-700 bg-slate-800 text-white hover:bg-slate-700'
                    : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50 shadow-sm'
                }`}
              >
                <FileText className="w-4 h-4 text-indigo-500" />
                <span>View Resume PDF</span>
              </button>

              <a
                href={`https://wa.me/${PORTFOLIO_DATA.personal.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3.5 rounded-xl border transition-all ${
                  darkMode
                    ? 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:border-slate-600'
                    : 'border-slate-300 bg-white text-slate-700 hover:text-slate-900 shadow-sm'
                }`}
                title="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5 text-sky-600" />
              </a>
            </div>
          </div>

          {/* Right Column: Profile Picture Card & Photo Uploader */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-72 sm:w-80 lg:w-80">
              {/* Decorative Frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-md opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />

              {/* Profile Card Container */}
              <div
                className={`relative rounded-2xl overflow-hidden border shadow-xl transition-all ${
                  darkMode
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-slate-200'
                }`}
                onMouseEnter={() => setImageHovered(true)}
                onMouseLeave={() => setImageHovered(false)}
              >
                {/* Photo Header */}
                <div className="relative aspect-square w-full bg-gradient-to-br from-indigo-900 via-slate-800 to-slate-900 overflow-hidden flex items-center justify-center">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Mahesh Poludasu"
                      className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    /* Default High-Quality Styled Professional Portrait / Avatar representing Mahesh Poludasu */
                    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950">
                      {/* Subtle circular background halo */}
                      <div className="absolute w-44 h-44 rounded-full bg-indigo-500/20 blur-xl -z-10" />
                      <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 border-4 border-indigo-400/30 shadow-2xl flex items-center justify-center mb-4">
                        <span className="text-4xl font-extrabold text-white tracking-wider">
                          MP
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        Mahesh Poludasu
                      </h3>
                      <p className="text-xs text-indigo-300 mt-1 font-medium">
                        AI & ML Specialist • B.Tech NBKRIST
                      </p>
                      <div className="mt-4 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5" />
                        <span>WhatsApp Profile Photo</span>
                      </div>
                    </div>
                  )}

                  {/* Hover Overlay with option to change/upload WhatsApp photo */}
                  <div
                    className={`absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-4 transition-opacity duration-300 ${
                      imageHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <p className="text-white text-xs font-medium text-center">
                      Personalize your portfolio by uploading your WhatsApp profile photo
                    </p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-lg transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload WhatsApp Photo</span>
                    </button>
                    {profileImage && (
                      <button
                        onClick={handleResetPhoto}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Reset to Default</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Quick Stat Highlights below profile */}
            <div className="grid grid-cols-3 gap-3 mt-6 w-full max-w-sm">
              <div
                className={`p-3 rounded-xl border text-center ${
                  darkMode
                    ? 'bg-slate-800/60 border-slate-700/60'
                    : 'bg-white border-slate-200/80 shadow-sm'
                }`}
              >
                <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                  8.31
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  B.Tech CGPA
                </div>
              </div>
              <div
                className={`p-3 rounded-xl border text-center ${
                  darkMode
                    ? 'bg-slate-800/60 border-slate-700/60'
                    : 'bg-white border-slate-200/80 shadow-sm'
                }`}
              >
                <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                  3+ Core
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  AI & ML Projects
                </div>
              </div>
              <div
                className={`p-3 rounded-xl border text-center ${
                  darkMode
                    ? 'bg-slate-800/60 border-slate-700/60'
                    : 'bg-white border-slate-200/80 shadow-sm'
                }`}
              >
                <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                  6+ Certs
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Verified Skills
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
