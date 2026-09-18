import React from 'react';
import { Sparkles, Users, FileCheck, ArrowRight, ShieldCheck, Cpu, Zap, CheckCircle, BarChart3, Lock, LineChart } from 'lucide-react';

interface LandingPageProps {
  onOpenAts: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenAts }) => {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Next-Gen Enterprise Recruitment & ATS Infrastructure</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Transform Talent Acquisition with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-emerald-300 to-indigo-300">Objective AI Matching</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Nexus provides high-growth technology organizations with a production-grade Applicant Tracking System. Process CVs securely, score candidates with transparent skill breakdowns, and streamline recruitment pipelines.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenAts}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2 border border-indigo-400/30 cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>Access Recruiter ATS Portal</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
              
              <a
                href="#features"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-all flex items-center justify-center space-x-2"
              >
                <span>Explore Architecture & Features</span>
              </a>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-900 grid grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
              <div>
                <p className="text-2xl font-bold text-white">40%</p>
                <p className="text-xs text-slate-400 mt-0.5">Skills Weight Ratio</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-400">100%</p>
                <p className="text-xs text-slate-400 mt-0.5">Objective Non-Bias</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-400">Vercel</p>
                <p className="text-xs text-slate-400 mt-0.5">Serverless Ready</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="py-20 bg-slate-900/40 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Core Platform Capabilities</h2>
            <p className="text-3xl font-bold text-white">Built for Scalable Recruitment Operations</p>
            <p className="text-sm text-slate-400 mt-3">From CV ingestion to pipeline stage management, every ATS feature is designed for speed, clarity, and security.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Direct-to-Storage Resume Ingestion</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Parse PDF and DOCX files without clogging serverless memory limits. Small JSON metadata and extracted strings keep request payloads lean and Vercel-optimized.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Server-Side Gemini AI Evaluation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Evaluates skills match, relevant experience, educational fit, and keyword coverage using secure server endpoints with non-discrimination guardrails.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Visual Pipeline & Scoring Rationale</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Move applicants seamlessly between Applied, Screening, Shortlisted, Interview, Selected, and Rejected stages while logging recruiter notes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Ready to test the recruiter workspace?</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">Open the Integrated ATS Portal</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
              Create jobs, parse candidate resumes, review AI match score breakdowns, and manage recruitment candidate pipelines in real time.
            </p>
          </div>
          <button
            onClick={onOpenAts}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-500 text-white font-bold text-sm shadow-xl hover:opacity-95 transition-opacity whitespace-nowrap cursor-pointer"
          >
            Launch ATS Dashboard →
          </button>
        </div>
      </section>

    </div>
  );
};
