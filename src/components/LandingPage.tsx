import React from 'react';
import { 
  Sparkles, Users, FileCheck, ArrowRight, ShieldCheck, HeartHandshake, 
  FileText, Mail, ShoppingCart, Globe, MapPin, CheckCircle, Award, Building2
} from 'lucide-react';

interface LandingPageProps {
  onOpenAts: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenAts }) => {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/40 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Lahore HQ • Global Recruitment & Staffing Solutions</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Recruitz Solution <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-300">
                Staffing & Enterprise ATS
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Empowering organizations in Pakistan and worldwide with specialized recruitment, inclusive PWD & Deaf hiring, UK documentation services, and integrated AI ATS resume evaluation.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenAts}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold text-sm shadow-xl shadow-emerald-600/25 transition-all flex items-center justify-center space-x-2 border border-emerald-400/30 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
                <span>Launch AI ATS Resume Analyzer</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
              
              <a
                href="#services"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-all flex items-center justify-center space-x-2"
              >
                <span>Explore Services</span>
              </a>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-900 grid grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
              <div>
                <p className="text-2xl font-bold text-white">6 Core</p>
                <p className="text-xs text-slate-400 mt-0.5">Specialized Services</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-400">Inclusive</p>
                <p className="text-xs text-slate-400 mt-0.5">PWD & Deaf Hiring</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-400">Global</p>
                <p className="text-xs text-slate-400 mt-0.5">Pakistan, US, UK, Global</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6 CORE SERVICES SECTION */}
      <section id="services" className="py-20 bg-slate-900/40 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">Comprehensive Offerings</h2>
            <p className="text-3xl font-bold text-white">Recruitz Solution Business Services</p>
            <p className="text-sm text-slate-400 mt-3">Tailored recruitment, inclusive staffing, and international contract support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Service 1 */}
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">1. Recruitment & Staffing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                End-to-end recruitment for on-site, hybrid, and remote roles across Pakistan and international markets.
              </p>
            </div>

            {/* Service 2 */}
            <div id="inclusive" className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">2. PWD & Deaf Recruitment</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated inclusive hiring initiatives empowering Persons with Disabilities (PWD) and Deaf professionals into suitable workplaces.
              </p>
            </div>

            {/* Service 3 */}
            <div id="uk-services" className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">3. UK Employment Contracts</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Professional drafting and compliance support for UK employment contracts and legal staffing agreements.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">4. UK Tenancy Agreements</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Standard UK tenancy and rental contract documentation services for landlords, tenants, and corporate relocations.
              </p>
            </div>

            {/* Service 5 */}
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">5. LinkedIn InMail Outreach</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Strategic candidate sourcing, personalized LinkedIn InMail messaging, and executive headhunting outreach campaigns.
              </p>
            </div>

            {/* Service 6 */}
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-teal-500/50 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">6. E-commerce Virtual Assistance</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated virtual assistants for Amazon, eBay, Shopify store operations, inventory management, and customer support.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* GEOGRAPHIC SCOPE SECTION */}
      <section id="global-scope" className="py-16 bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Pakistan Operations */}
            <div className="bg-slate-900/90 p-8 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-emerald-400" />
                <h3 className="text-xl font-bold text-white">Pakistan Market Leadership</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Headquartered in <strong>Lahore</strong>, Recruitz Solution delivers on-site, hybrid, and remote recruitment across key Pakistan business hubs including <strong>Lahore, Karachi, and Islamabad</strong>.
              </p>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Inclusive hiring initiatives for PWD & Deaf job seekers</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>On-site, hybrid, and remote staffing solutions</span>
                </li>
              </ul>
            </div>

            {/* Global Sourcing */}
            <div className="bg-slate-900/90 p-8 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center space-x-3">
                <Globe className="w-6 h-6 text-indigo-400" />
                <h3 className="text-xl font-bold text-white">Global Remote & International Scope</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connecting offshore talent with international employers across the <strong>United States, United Kingdom, Australia, Brazil</strong>, and global remote opportunities.
              </p>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>UK employment contracts & compliance management</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Global remote virtual assistance for e-commerce platforms</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Call to Action Banner */}
      <section className="py-16 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Try the Integrated Tool</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">AI ATS Resume Analyzer</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
              Upload or paste your resume to receive a comprehensive ATS evaluation report, score breakdown, skill gap analysis, and tailored career recommendations.
            </p>
          </div>
          <button
            onClick={onOpenAts}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold text-sm shadow-xl hover:opacity-95 transition-opacity whitespace-nowrap cursor-pointer flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Open ATS Analyzer →</span>
          </button>
        </div>
      </section>

    </div>
  );
};

