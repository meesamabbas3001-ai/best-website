import React from 'react';
import { Candidate, CandidateStatus } from '../../types';
import { updateCandidateStatus } from '../../services/api';
import { Users, CheckCircle2, Eye, UserX, ChevronRight, Award } from 'lucide-react';

interface PipelineBoardProps {
  candidates: Candidate[];
  onViewCandidate: (candidateId: string) => void;
  onCandidateUpdated: () => void;
}

const STAGES: { id: CandidateStatus; label: string; color: string }[] = [
  { id: 'Applied', label: 'Applied', color: 'border-slate-700 bg-slate-900/60' },
  { id: 'Screening', label: 'Screening', color: 'border-blue-800/80 bg-blue-950/20' },
  { id: 'Shortlisted', label: 'Shortlisted', color: 'border-emerald-800/80 bg-emerald-950/20' },
  { id: 'Interview', label: 'Interview', color: 'border-purple-800/80 bg-purple-950/20' },
  { id: 'Selected', label: 'Selected', color: 'border-cyan-800/80 bg-cyan-950/20' },
  { id: 'Rejected', label: 'Rejected', color: 'border-rose-800/80 bg-rose-950/20' },
];

export const PipelineBoard: React.FC<PipelineBoardProps> = ({
  candidates,
  onViewCandidate,
  onCandidateUpdated
}) => {
  const handleMoveStage = (candidateId: string, nextStatus: CandidateStatus) => {
    updateCandidateStatus(candidateId, nextStatus);
    onCandidateUpdated();
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white">Visual Recruitment Pipeline</h2>
          <p className="text-xs text-slate-400 mt-1">Track candidates across recruitment funnel stages. Click candidate cards to view AI evaluations or transition stages.</p>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const stageCandidates = candidates.filter(c => c.status === stage.id);
          return (
            <div key={stage.id} className={`p-4 rounded-2xl border ${stage.color} space-y-4 min-w-[200px] flex flex-col`}>
              
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <span className="text-xs font-bold text-white tracking-wide">{stage.label}</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold">
                  {stageCandidates.length}
                </span>
              </div>

              <div className="space-y-3 flex-1">
                {stageCandidates.length === 0 ? (
                  <div className="text-center py-8 text-[11px] text-slate-500 font-medium">
                    No candidates in {stage.label}
                  </div>
                ) : (
                  stageCandidates.map((cand) => {
                    const score = cand.analysis?.overallMatchScore || 0;
                    return (
                      <div
                        key={cand.id}
                        className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-2.5 hover:border-indigo-500/50 transition-all shadow-sm group"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 
                              onClick={() => onViewCandidate(cand.id)}
                              className="text-xs font-bold text-white hover:text-indigo-400 cursor-pointer line-clamp-1"
                            >
                              {cand.fullName}
                            </h4>
                            <p className="text-[10px] text-slate-400 line-clamp-1">{cand.jobTitle}</p>
                          </div>

                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border shrink-0 ${
                            score >= 85 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                            score >= 70 ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20' :
                            'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}>
                            {score}%
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                          <span>{cand.yearsOfExperience} yrs exp</span>
                          <button
                            onClick={() => onViewCandidate(cand.id)}
                            className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center space-x-0.5"
                          >
                            <span>Profile</span>
                            <Eye className="w-3 h-3 ml-0.5" />
                          </button>
                        </div>

                        {/* Stage Transition Selector */}
                        <div className="pt-2">
                          <select
                            value={cand.status}
                            onChange={(e) => handleMoveStage(cand.id, e.target.value as CandidateStatus)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-[10px] text-slate-300 focus:outline-none focus:border-indigo-500"
                          >
                            <option value="Applied">→ Move to Applied</option>
                            <option value="Screening">→ Move to Screening</option>
                            <option value="Shortlisted">→ Move to Shortlisted</option>
                            <option value="Interview">→ Move to Interview</option>
                            <option value="Selected">→ Move to Selected</option>
                            <option value="Rejected">→ Move to Rejected</option>
                          </select>
                        </div>

                      </div>
                    );
                  })
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
