import React, { useState } from 'react';
import { Candidate, CandidateStatus } from '../../types';
import { addRecruiterNote, updateCandidateStatus } from '../../services/api';
import { X, Award, CheckCircle2, AlertTriangle, FileText, Send, User, Briefcase, GraduationCap, MapPin, Mail, Phone, Calendar, Sparkles, Building, Layers } from 'lucide-react';

interface CandidateProfileModalProps {
  candidate: Candidate | null;
  onClose: () => void;
  onCandidateUpdated: () => void;
}

export const CandidateProfileModal: React.FC<CandidateProfileModalProps> = ({
  candidate,
  onClose,
  onCandidateUpdated
}) => {
  const [newNoteText, setNewNoteText] = useState('');
  const [activeTab, setActiveTab] = useState<'evaluation' | 'resume' | 'notes'>('evaluation');

  if (!candidate) return null;

  const analysis = candidate.analysis;
  const breakdown = analysis?.scoreBreakdown;

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    addRecruiterNote(candidate.id, 'Sarah Jenkins (Recruiter)', newNoteText.trim());
    setNewNoteText('');
    onCandidateUpdated();
  };

  const handleStatusChange = (status: CandidateStatus) => {
    updateCandidateStatus(candidate.id, status);
    onCandidateUpdated();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto flex flex-col shadow-2xl">
        
        {/* Modal Top Header */}
        <div className="p-6 border-b border-slate-800 flex items-start justify-between bg-slate-950/60 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-extrabold text-base flex items-center justify-center shrink-0">
              {candidate.fullName.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-white">{candidate.fullName}</h2>
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold border ${
                  candidate.status === 'Shortlisted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                  candidate.status === 'Interview' ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20' :
                  candidate.status === 'Rejected' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                  'bg-slate-800 text-slate-300 border-slate-700'
                }`}>
                  {candidate.status}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">{candidate.jobTitle}</p>
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 mt-1">
                <span className="flex items-center"><Mail className="w-3 h-3 mr-1 text-slate-500" />{candidate.email}</span>
                <span className="flex items-center"><Phone className="w-3 h-3 mr-1 text-slate-500" />{candidate.phone}</span>
                <span className="flex items-center"><MapPin className="w-3 h-3 mr-1 text-slate-500" />{candidate.location}</span>
              </div>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/80 hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Pipeline Action Changer */}
        <div className="bg-slate-950 p-4 border-b border-slate-800/80 flex items-center justify-between overflow-x-auto">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-2">Pipeline Stage:</span>
          <div className="flex items-center space-x-1.5">
            {(['Applied', 'Screening', 'Shortlisted', 'Interview', 'Selected', 'Rejected'] as CandidateStatus[]).map((st) => (
              <button
                key={st}
                onClick={() => handleStatusChange(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  candidate.status === st 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-800 bg-slate-900/50 px-6">
          <button
            onClick={() => setActiveTab('evaluation')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'evaluation' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            AI Evaluation & Breakdown
          </button>
          <button
            onClick={() => setActiveTab('resume')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'resume' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Resume Text & Background
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'notes' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Recruiter Notes ({candidate.notes?.length || 0})
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 space-y-6">
          
          {activeTab === 'evaluation' && (
            <div className="space-y-6">
              
              {/* Score Header Banner */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                <div className="flex flex-col justify-center items-center p-3 border-r border-slate-800/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Overall ATS Match</span>
                  <div className="text-4xl font-extrabold text-emerald-400 mt-1">
                    {analysis?.overallMatchScore || 0}%
                  </div>
                  <span className="text-[10px] text-indigo-300 font-medium mt-1">{analysis?.recommendation || 'Evaluated'}</span>
                </div>

                <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block font-semibold">Skills (40%)</span>
                    <span className="text-xl font-bold text-white">{breakdown?.skillsMatchScore || 0}%</span>
                  </div>
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block font-semibold">Experience (30%)</span>
                    <span className="text-xl font-bold text-white">{breakdown?.experienceMatchScore || 0}%</span>
                  </div>
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block font-semibold">Education (15%)</span>
                    <span className="text-xl font-bold text-white">{breakdown?.educationMatchScore || 0}%</span>
                  </div>
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block font-semibold">Keywords (15%)</span>
                    <span className="text-xl font-bold text-white">{breakdown?.keywordMatchScore || 0}%</span>
                  </div>
                </div>
              </div>

              {/* Matched vs Missing Skills */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-emerald-400 flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-1.5" /> Matched Required Skills
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {analysis?.matchedSkills.map(sk => (
                      <span key={sk} className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-amber-400 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1.5" /> Missing Skills Gaps
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {analysis?.missingSkills.length === 0 ? (
                      <span className="text-xs text-slate-400">No missing required skills detected!</span>
                    ) : (
                      analysis?.missingSkills.map(sk => (
                        <span key={sk} className="text-xs px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium">
                          {sk}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* AI Candidate Executive Summary */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center space-x-2 text-indigo-400">
                  <Sparkles className="w-4 h-4" />
                  <h3 className="text-sm font-bold text-white">AI Executive Summary & Assessment</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">{analysis?.candidateSummary}</p>
                
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <h4 className="font-semibold text-slate-200 mb-1">Key Strengths</h4>
                    <ul className="list-disc list-inside text-slate-400 space-y-1">
                      {analysis?.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200 mb-1">Potential Gaps / Considerations</h4>
                    <ul className="list-disc list-inside text-slate-400 space-y-1">
                      {analysis?.gaps.map((g, i) => (
                        <li key={i}>{g}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'resume' && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-white flex items-center"><Briefcase className="w-4 h-4 mr-1.5 text-indigo-400" /> Professional Experience</span>
                  <p className="text-slate-300 font-medium">{candidate.yearsOfExperience} years total experience</p>
                  <p className="text-slate-400">{candidate.companies.join(' • ')}</p>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-white flex items-center"><GraduationCap className="w-4 h-4 mr-1.5 text-indigo-400" /> Education</span>
                  <p className="text-slate-300 font-medium">{candidate.degree}</p>
                  <p className="text-slate-400">{candidate.university}</p>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-indigo-400" />
                    Extracted Resume Text ({candidate.resumeFileName})
                  </h3>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800/80 font-mono text-[11px] text-slate-300 leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
                  {candidate.resumeText}
                </div>
              </div>

            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-6">
              
              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="space-y-3">
                <label className="block text-xs font-semibold text-slate-300">Add Recruiter Note</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Log interview feedback, salary expectations, or screening comments..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all flex items-center space-x-1.5 cursor-pointer shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Save Note</span>
                  </button>
                </div>
              </form>

              {/* Notes History */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Recruiter Feedback Log</h4>
                {candidate.notes?.length === 0 ? (
                  <p className="text-xs text-slate-500">No recruiter notes recorded for this candidate yet.</p>
                ) : (
                  candidate.notes.map((note) => (
                    <div key={note.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-semibold text-indigo-300">{note.author}</span>
                        <span>{new Date(note.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">{note.text}</p>
                    </div>
                  ))
                )}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
