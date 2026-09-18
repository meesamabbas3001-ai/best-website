import React, { useState } from 'react';
import { Job, EmploymentType, JobStatus } from '../../types';
import { Plus, Edit3, Briefcase, MapPin, DollarSign, Clock, Search, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface JobManagementProps {
  jobs: Job[];
  onSaveJob: (job: Job) => void;
  onOpenCreateJob: () => void;
}

export const JobManagement: React.FC<JobManagementProps> = ({ jobs, onSaveJob, onOpenCreateJob }) => {
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Editing state form fields
  const [editTitle, setEditTitle] = useState('');
  const [editDepartment, setEditDepartment] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editEmploymentType, setEditEmploymentType] = useState<EmploymentType>('Full-time');
  const [editExp, setEditExp] = useState('');
  const [editEdu, setEditEdu] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editReqSkills, setEditReqSkills] = useState('');
  const [editPrefSkills, setEditPrefSkills] = useState('');
  const [editSalary, setEditSalary] = useState('');
  const [editStatus, setEditStatus] = useState<JobStatus>('Active');

  const handleStartEdit = (job: Job) => {
    setEditingJob(job);
    setEditTitle(job.title);
    setEditDepartment(job.department);
    setEditLocation(job.location);
    setEditEmploymentType(job.employmentType);
    setEditExp(job.experienceRequired);
    setEditEdu(job.educationRequired);
    setEditDesc(job.description);
    setEditReqSkills(job.requiredSkills.join(', '));
    setEditPrefSkills(job.preferredSkills.join(', '));
    setEditSalary(job.salaryRange || '');
    setEditStatus(job.status);
  };

  const handleSaveEditedJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;

    const updatedJob: Job = {
      ...editingJob,
      title: editTitle,
      department: editDepartment,
      location: editLocation,
      employmentType: editEmploymentType,
      experienceRequired: editExp,
      educationRequired: editEdu,
      description: editDesc,
      requiredSkills: editReqSkills.split(',').map(s => s.trim()).filter(Boolean),
      preferredSkills: editPrefSkills.split(',').map(s => s.trim()).filter(Boolean),
      salaryRange: editSalary || undefined,
      status: editStatus,
      updatedAt: new Date().toISOString()
    };

    onSaveJob(updatedJob);
    setEditingJob(null);
  };

  const filteredJobs = jobs.filter(j => {
    if (filterStatus !== 'all' && j.status !== filterStatus) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return j.title.toLowerCase().includes(q) || j.department.toLowerCase().includes(q) || j.location.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white">Job Requisitions</h2>
          <p className="text-xs text-slate-400 mt-1">Manage active listings, draft descriptions, and candidate target requirements.</p>
        </div>

        <button
          onClick={onOpenCreateJob}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center space-x-2 cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Job</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
          {['all', 'Active', 'Draft', 'Closed'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterStatus === st 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st === 'all' ? 'All Jobs' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-slate-700 transition-colors">
            
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">{job.department}</span>
                <h3 className="text-base font-bold text-white mt-0.5">{job.title}</h3>
              </div>

              <span className={`text-[11px] px-2.5 py-1 rounded-full font-semibold border ${
                job.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                job.status === 'Draft' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                {job.status}
              </span>
            </div>

            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{job.description}</p>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span className="truncate">{job.location}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{job.employmentType} ({job.experienceRequired})</span>
              </div>
              {job.salaryRange && (
                <div className="flex items-center space-x-1.5 col-span-2 text-indigo-300 font-medium">
                  <DollarSign className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{job.salaryRange}</span>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Required Skills</span>
              <div className="flex flex-wrap gap-1.5">
                {job.requiredSkills.map(sk => (
                  <span key={sk} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-indigo-300 border border-slate-700">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => handleStartEdit(job)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center space-x-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Edit Job Details</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Edit Job Modal */}
      {editingJob && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white">Edit Job Requisition</h3>
              <button onClick={() => setEditingJob(null)} className="text-slate-400 hover:text-white text-sm font-semibold">✕</button>
            </div>

            <form onSubmit={handleSaveEditedJob} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Job Title</label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Department</label>
                  <input
                    type="text"
                    required
                    value={editDepartment}
                    onChange={(e) => setEditDepartment(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Employment Type</label>
                  <select
                    value={editEmploymentType}
                    onChange={(e) => setEditEmploymentType(e.target.value as EmploymentType)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Experience Required</label>
                  <input
                    type="text"
                    required
                    value={editExp}
                    onChange={(e) => setEditExp(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as JobStatus)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Job Description</label>
                <textarea
                  rows={4}
                  required
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  value={editReqSkills}
                  onChange={(e) => setEditReqSkills(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingJob(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white"
                >
                  Save Changes
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
