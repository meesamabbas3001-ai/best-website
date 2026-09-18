import React from 'react';
import { Briefcase, Shield, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Briefcase className="w-4 h-4" />
            </div>
            <span className="font-bold text-white text-lg">Nexus Talent</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Enterprise recruitment automation & AI applicant tracking system for high-growth engineering, AI, and design organizations.
          </p>
          <div className="flex items-center space-x-2 text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-md w-fit">
            <Shield className="w-3.5 h-3.5" />
            <span>SOC2 Type II & GDPR Compliant</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">ATS Platform</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#ats-dashboard" className="hover:text-white transition-colors">AI Candidate Evaluation</a></li>
            <li><a href="#pipeline" className="hover:text-white transition-colors">Visual Pipeline Kanban</a></li>
            <li><a href="#scoring" className="hover:text-white transition-colors">Transparent Match Scoring</a></li>
            <li><a href="#cv-parse" className="hover:text-white transition-colors">PDF/DOCX Resume Parser</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Solutions</h4>
          <ul className="space-y-2 text-xs">
            <li><span className="text-slate-400">Engineering Recruitment</span></li>
            <li><span className="text-slate-400">AI & Machine Learning Talent</span></li>
            <li><span className="text-slate-400">Product & Design Hiring</span></li>
            <li><span className="text-slate-400">Executive Search Automation</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Security & Vercel Edge</h4>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            Built with server-side AI guardrails, direct payload storage pipelines, and serverless edge endpoints.
          </p>
          <div className="flex items-center space-x-1.5 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>No client API key exposure</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
        <p>© 2026 Nexus Talent Inc. All rights reserved. Existing Client Website Protection Guaranteed.</p>
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
          <span className="hover:text-slate-300 cursor-pointer">Security Portal</span>
        </div>
      </div>
    </footer>
  );
};
