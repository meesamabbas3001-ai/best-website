import React, { useState } from 'react';
import { LayoutDashboard, Users, GitMerge, Briefcase, Upload, Shield, Search, Plus, Sparkles } from 'lucide-react';

interface AtsLayoutProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenCreateJob: () => void;
  onOpenUploadCv: () => void;
  children: React.ReactNode;
}

export const AtsLayout: React.FC<AtsLayoutProps> = ({
  activeTab,
  onSelectTab,
  onOpenCreateJob,
  onOpenUploadCv,
  children
}) => {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      
      {/* Sub-Header Bar */}
      <div className="bg-slate-900/80 border-b border-slate-800 sticky top-16 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between overflow-x-auto">
          
          {/* Navigation Tabs */}
          <div className="flex items-center space-x-1 shrink-0">
            <button
              onClick={() => onSelectTab('analyzer')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer ${
                activeTab === 'analyzer' ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/20 border border-indigo-400/30' : 'text-indigo-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>AI ATS Analyzer</span>
            </button>

            <button
              onClick={() => onSelectTab('dashboard')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer ${
                activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => onSelectTab('candidates')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer ${
                activeTab === 'candidates' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Candidates</span>
            </button>

            <button
              onClick={() => onSelectTab('pipeline')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer ${
                activeTab === 'pipeline' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <GitMerge className="w-4 h-4" />
              <span>Pipeline Kanban</span>
            </button>

            <button
              onClick={() => onSelectTab('jobs')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer ${
                activeTab === 'jobs' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Jobs & Requisitions</span>
            </button>
          </div>

          {/* Quick Action Shortcuts */}
          <div className="hidden sm:flex items-center space-x-2 shrink-0">
            <button
              onClick={onOpenCreateJob}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center space-x-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-indigo-400" />
              <span>New Job</span>
            </button>

            <button
              onClick={onOpenUploadCv}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-xs font-semibold flex items-center space-x-1.5 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-emerald-300" />
              <span>Upload CV</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Page Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

    </div>
  );
};
