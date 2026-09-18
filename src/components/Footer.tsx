import React from 'react';
import { Briefcase, Shield, CheckCircle2, MapPin, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 py-12 px-4 sm:px-6 lg:px-8 print:hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
              <Briefcase className="w-4 h-4" />
            </div>
            <span className="font-bold text-white text-lg">Recruitz Solution</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Lahore-based recruitment, staffing, inclusive hiring (PWD & Deaf), UK contracts & agreements, and enterprise AI ATS evaluation.
          </p>
          <div className="flex items-center space-x-2 text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-md w-fit">
            <Shield className="w-3.5 h-3.5" />
            <span>Inclusive & Ethical Sourcing Partner</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Core Services</h4>
          <ul className="space-y-2 text-xs">
            <li><span className="text-slate-300">1. Recruitment & Staffing</span></li>
            <li><span className="text-slate-300">2. PWD & Deaf Recruitment</span></li>
            <li><span className="text-slate-300">3. UK Employment Contracts</span></li>
            <li><span className="text-slate-300">4. UK Tenancy Agreements</span></li>
            <li><span className="text-slate-300">5. LinkedIn InMail Outreach</span></li>
            <li><span className="text-slate-300">6. E-commerce Virtual Assistance</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Geographic Scope</h4>
          <div className="space-y-2 text-xs">
            <p className="text-slate-300 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span><strong>Pakistan:</strong> Lahore, Karachi, Islamabad</span>
            </p>
            <p className="text-slate-300 flex items-center space-x-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span><strong>Global:</strong> US, UK, Australia, Brazil & Remote</span>
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">AI ATS Evaluation</h4>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            Integrated server-side Gemini AI ATS resume scoring engine. Serverless API routes protect API keys.
          </p>
          <div className="flex items-center space-x-1.5 text-xs text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Vercel-native serverless integration</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
        <p>© 2026 Recruitz Solution. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
          <span className="hover:text-slate-300 cursor-pointer">Contact Lahore HQ</span>
        </div>
      </div>
    </footer>
  );
};

