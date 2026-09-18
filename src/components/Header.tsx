import React from 'react';
import { Briefcase, Sparkles, ArrowRight, Shield } from 'lucide-react';

interface HeaderProps {
  currentView: 'landing' | 'ats';
  onNavigate: (view: 'landing' | 'ats') => void;
  activeAtsTab?: string;
  onAtsTabChange?: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-md print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-indigo-500 p-0.5 shadow-lg shadow-emerald-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight text-white font-sans">Recruitz Solution</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-semibold uppercase">Official</span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">Staffing & Enterprise ATS</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          {currentView === 'landing' ? (
            <>
              <a href="#services" className="text-sm text-slate-300 hover:text-white transition-colors">Services</a>
              <a href="#inclusive" className="text-sm text-slate-300 hover:text-white transition-colors">PWD & Deaf Hiring</a>
              <a href="#uk-services" className="text-sm text-slate-300 hover:text-white transition-colors">UK Contracts & Agreements</a>
              <a href="#global-scope" className="text-sm text-slate-300 hover:text-white transition-colors">Pakistan & Global Scope</a>
            </>
          ) : (
            <div className="flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60 text-xs font-semibold text-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>AI ATS Resume Analyzer</span>
            </div>
          )}
        </nav>

        {/* Right Switcher Action */}
        <div className="flex items-center space-x-3">
          {currentView === 'landing' ? (
            <button
              onClick={() => onNavigate('ats')}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-md shadow-emerald-600/30 transition-all border border-emerald-400/30 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white animate-pulse" />
              <span>AI ATS Resume Analyzer</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          ) : (
            <button
              onClick={() => onNavigate('landing')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700 cursor-pointer"
            >
              ← Back to Recruitz Solution
            </button>
          )}
        </div>

      </div>
    </header>
  );
};

