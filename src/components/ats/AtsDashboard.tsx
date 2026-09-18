import React from 'react';
import { Candidate, Job, AtsMetrics } from '../../types';
import { Users, UserCheck, UserPlus, UserX, Award, Briefcase, Plus, Upload, TrendingUp, Sparkles, ArrowRight, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

interface AtsDashboardProps {
  metrics: AtsMetrics;
  candidates: Candidate[];
  jobs: Job[];
  onOpenCreateJob: () => void;
  onOpenUploadCv: () => void;
  onViewCandidate: (candidateId: string) => void;
  onSelectTab: (tab: string) => void;
}

export const AtsDashboard: React.FC<AtsDashboardProps> = ({
  metrics,
  candidates,
  jobs,
  onOpenCreateJob,
  onOpenUploadCv,
  onViewCandidate,
  onSelectTab
}) => {
  // Chart Data Preparation
  const statusChartData = [
    { name: 'Applied', count: candidates.filter(c => c.status === 'Applied').length, color: '#6366f1' },
    { name: 'Screening', count: candidates.filter(c => c.status === 'Screening').length, color: '#3b82f6' },
    { name: 'Shortlisted', count: candidates.filter(c => c.status === 'Shortlisted').length, color: '#10b981' },
    { name: 'Interview', count: candidates.filter(c => c.status === 'Interview').length, color: '#8b5cf6' },
    { name: 'Selected', count: candidates.filter(c => c.status === 'Selected').length, color: '#06b6d4' },
    { name: 'Rejected', count: candidates.filter(c => c.status === 'Rejected').length, color: '#ef4444' },
  ];

  const scoreBins = [
    { range: '90-100%', count: candidates.filter(c => (c.analysis?.overallMatchScore || 0) >= 90).length, color: '#10b981' },
    { range: '80-89%', count: candidates.filter(c => (c.analysis?.overallMatchScore || 0) >= 80 && (c.analysis?.overallMatchScore || 0) < 90).length, color: '#6366f1' },
    { range: '70-79%', count: candidates.filter(c => (c.analysis?.overallMatchScore || 0) >= 70 && (c.analysis?.overallMatchScore || 0) < 80).length, color: '#f59e0b' },
    { range: '<70%', count: candidates.filter(c => (c.analysis?.overallMatchScore || 0) < 70).length, color: '#ef4444' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider">Recruiter Workspace</span>
            <span className="text-xs text-slate-400 font-mono">• Production Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-white mt-1">ATS Overview Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">Monitor active job postings, AI candidate match metrics, and recruitment pipeline status.</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenCreateJob}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-semibold transition-all flex items-center space-x-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-indigo-400" />
            <span>Create New Job</span>
          </button>

          <button
            onClick={onOpenUploadCv}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-semibold transition-all flex items-center space-x-2 shadow-md shadow-indigo-600/20 cursor-pointer"
          >
            <Upload className="w-4 h-4 text-emerald-300" />
            <span>Upload Candidate CV</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Candidates</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">{metrics.totalCandidates}</p>
          <div className="flex items-center text-[11px] text-indigo-300 space-x-1">
            <UserPlus className="w-3.5 h-3.5 text-indigo-400" />
            <span>{metrics.newCandidates} new in review</span>
          </div>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Shortlisted & Interview</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">{metrics.shortlistedCandidates + metrics.interviewCandidates}</p>
          <div className="flex items-center text-[11px] text-emerald-400 space-x-1">
            <span>{metrics.shortlistedCandidates} shortlisted • {metrics.interviewCandidates} interview</span>
          </div>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg AI Match Score</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">{metrics.avgMatchScore}%</p>
          <div className="flex items-center text-[11px] text-purple-300 space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Objective evaluation model</span>
          </div>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Job Requisitions</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">{metrics.activeJobsCount}</p>
          <div className="flex items-center text-[11px] text-blue-300 space-x-1">
            <span>Across Engineering, AI, & Design</span>
          </div>
        </div>

      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Candidate Pipeline Distribution Bar Chart */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Recruitment Pipeline Stages</h3>
              <p className="text-xs text-slate-400">Active candidates across hiring funnel steps</p>
            </div>
            <button 
              onClick={() => onSelectTab('pipeline')}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center space-x-1 font-medium"
            >
              <span>View Pipeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc', fontSize: '12px' }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {statusChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Score Distribution Pie Bins */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Candidate AI Match Score Distribution</h3>
              <p className="text-xs text-slate-400">Objective score binned by match strength</p>
            </div>
            <button 
              onClick={() => onSelectTab('candidates')}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center space-x-1 font-medium"
            >
              <span>View Table</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            {scoreBins.map((bin) => (
              <div key={bin.range} className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">{bin.range} Match</span>
                  <span className="text-2xl font-bold text-white">{bin.count}</span>
                </div>
                <div className="w-3 h-10 rounded-full" style={{ backgroundColor: bin.color }} />
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start space-x-3">
            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-300 leading-relaxed">
              Matching scores combine <strong>Skills (40%)</strong>, <strong>Experience (30%)</strong>, <strong>Education (15%)</strong>, and <strong>Keyword Relevance (15%)</strong> evaluated via server-side Gemini AI.
            </p>
          </div>
        </div>

      </div>

      {/* Recent Applications & Active Jobs Table Snippets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Applications List */}
        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Recent Candidate Submissions</h3>
            <button 
              onClick={() => onSelectTab('candidates')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
            >
              All Candidates →
            </button>
          </div>

          <div className="divide-y divide-slate-800/80">
            {candidates.slice(0, 5).map((cand) => (
              <div key={cand.id} className="py-3.5 flex items-center justify-between hover:bg-slate-800/40 px-2 rounded-xl transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-bold text-xs flex items-center justify-center">
                    {cand.fullName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">{cand.fullName}</h4>
                    <p className="text-[11px] text-slate-400">{cand.jobTitle}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400">{cand.analysis?.overallMatchScore || 0}% Match</span>
                    <p className="text-[10px] text-slate-400">{cand.status}</p>
                  </div>

                  <button
                    onClick={() => onViewCandidate(cand.id)}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Jobs Card List */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Active Job Postings</h3>
            <button 
              onClick={() => onSelectTab('jobs')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Manage →
            </button>
          </div>

          <div className="space-y-3">
            {jobs.filter(j => j.status === 'Active').slice(0, 4).map((job) => (
              <div key={job.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-white line-clamp-1">{job.title}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">Active</span>
                </div>
                <p className="text-[11px] text-slate-400">{job.department} • {job.location}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {job.requiredSkills.slice(0, 3).map((s) => (
                    <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">{s}</span>
                  ))}
                  {job.requiredSkills.length > 3 && (
                    <span className="text-[10px] text-slate-400">+{job.requiredSkills.length - 3}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
