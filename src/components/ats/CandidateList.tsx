import React, { useState } from 'react';
import { Candidate, Job, FilterOptions } from '../../types';
import { filterCandidates, updateCandidateStatus } from '../../services/api';
import { Search, Filter, SlidersHorizontal, Eye, CheckCircle2, UserX, MessageSquare, ArrowUpDown, Download, Award, Briefcase } from 'lucide-react';

interface CandidateListProps {
  candidates: Candidate[];
  jobs: Job[];
  onViewCandidate: (candidateId: string) => void;
  onOpenUploadCv: () => void;
  onCandidateUpdated: () => void;
}

export const CandidateList: React.FC<CandidateListProps> = ({
  candidates,
  jobs,
  onViewCandidate,
  onOpenUploadCv,
  onCandidateUpdated
}) => {
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    jobId: 'all',
    status: 'all',
    minScore: 0,
    maxScore: 100,
    skill: 'all',
    sortBy: 'score',
    sortOrder: 'desc'
  });

  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string>('all');

  // Collect all unique skills across candidates
  const allSkills = Array.from(new Set(candidates.flatMap(c => c.skills)));

  const filteredCandidates = filterCandidates(candidates, {
    ...filters,
    skill: selectedSkillFilter
  });

  const handleStatusChange = (candidateId: string, status: Candidate['status']) => {
    updateCandidateStatus(candidateId, status);
    onCandidateUpdated();
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white">Candidate Repository</h2>
          <p className="text-xs text-slate-400 mt-1">Review AI ATS evaluations, search candidate skills, and update recruitment pipeline statuses.</p>
        </div>

        <button
          onClick={onOpenUploadCv}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center space-x-2 cursor-pointer w-fit"
        >
          <span>Upload New CV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Search Query */}
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search candidate name, email, skills..."
              value={filters.searchQuery}
              onChange={(e) => setFilters(f => ({ ...f, searchQuery: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Job Filter */}
          <div>
            <select
              value={filters.jobId}
              onChange={(e) => setFilters(f => ({ ...f, jobId: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Jobs</option>
              {jobs.map(j => (
                <option key={j.id} value={j.id}>{j.title}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={filters.status}
              onChange={(e) => setFilters(f => ({ ...f, status: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Statuses</option>
              <option value="Applied">Applied</option>
              <option value="Screening">Screening</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview">Interview</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onChange={(e) => {
                const [sb, so] = e.target.value.split('-');
                setFilters(f => ({ ...f, sortBy: sb as any, sortOrder: so as any }));
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="score-desc">Highest Match Score</option>
              <option value="score-asc">Lowest Match Score</option>
              <option value="date-desc">Newest Applied</option>
              <option value="date-asc">Oldest Applied</option>
              <option value="name-asc">Candidate Name (A-Z)</option>
            </select>
          </div>

        </div>

        {/* Score Slider and Skill Pills */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Min Score: {filters.minScore}%</span>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={filters.minScore}
              onChange={(e) => setFilters(f => ({ ...f, minScore: Number(e.target.value) }))}
              className="w-36 accent-indigo-500"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap mr-1">Skill Filter:</span>
            <button
              onClick={() => setSelectedSkillFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap ${
                selectedSkillFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              All Skills
            </button>
            {allSkills.slice(0, 6).map(sk => (
              <button
                key={sk}
                onClick={() => setSelectedSkillFilter(sk)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap ${
                  selectedSkillFilter === sk ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {sk}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Candidate Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Candidate</th>
                <th className="py-3.5 px-4">Match Score</th>
                <th className="py-3.5 px-4">Experience</th>
                <th className="py-3.5 px-4">Education</th>
                <th className="py-3.5 px-4">Matched Skills</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredCandidates.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No candidate records found matching current search and filter criteria.
                  </td>
                </tr>
              ) : (
                filteredCandidates.map((cand) => {
                  const score = cand.analysis?.overallMatchScore || 0;
                  return (
                    <tr key={cand.id} className="hover:bg-slate-800/50 transition-colors">
                      
                      {/* Candidate Column */}
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-full bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-bold text-xs flex items-center justify-center shrink-0">
                            {cand.fullName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <span 
                              onClick={() => onViewCandidate(cand.id)}
                              className="font-bold text-white hover:text-indigo-400 cursor-pointer text-xs transition-colors"
                            >
                              {cand.fullName}
                            </span>
                            <p className="text-[11px] text-slate-400 truncate max-w-[180px]">{cand.jobTitle}</p>
                            <p className="text-[10px] text-slate-500">{cand.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Match Score Column */}
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <div className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${
                            score >= 85 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                            score >= 70 ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30' :
                            'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          }`}>
                            {score}%
                          </div>
                        </div>
                      </td>

                      {/* Experience Column */}
                      <td className="py-4 px-4">
                        <span className="font-medium text-white">{cand.yearsOfExperience} years exp</span>
                        <p className="text-[10px] text-slate-400 truncate max-w-[160px]">
                          {cand.companies.slice(0, 2).join(', ')}
                        </p>
                      </td>

                      {/* Education Column */}
                      <td className="py-4 px-4">
                        <span className="font-medium text-slate-200">{cand.degree || 'Degree'}</span>
                        <p className="text-[10px] text-slate-400 truncate max-w-[150px]">{cand.university || 'University'}</p>
                      </td>

                      {/* Skills Column */}
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {cand.skills.slice(0, 3).map(sk => (
                            <span key={sk} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700">
                              {sk}
                            </span>
                          ))}
                          {cand.skills.length > 3 && (
                            <span className="text-[10px] text-slate-500">+{cand.skills.length - 3}</span>
                          )}
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-4">
                        <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold border ${
                          cand.status === 'Shortlisted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          cand.status === 'Interview' ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20' :
                          cand.status === 'Selected' ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20' :
                          cand.status === 'Rejected' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                          'bg-slate-800 text-slate-300 border-slate-700'
                        }`}>
                          {cand.status}
                        </span>
                      </td>

                      {/* Actions Column */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <button
                            onClick={() => onViewCandidate(cand.id)}
                            title="View Candidate Profile"
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleStatusChange(cand.id, 'Shortlisted')}
                            title="Shortlist Candidate"
                            className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-400 border border-emerald-800/80 cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleStatusChange(cand.id, 'Rejected')}
                            title="Reject Candidate"
                            className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-rose-400 border border-rose-800/80 cursor-pointer"
                          >
                            <UserX className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};
