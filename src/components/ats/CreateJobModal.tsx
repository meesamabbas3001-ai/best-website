import React, { useState } from 'react';
import { Job, EmploymentType, JobStatus } from '../../types';
import { Briefcase, X, Sparkles } from 'lucide-react';

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveJob: (job: Job) => void;
}

export const CreateJobModal: React.FC<CreateJobModalProps> = ({ isOpen, onClose, onSaveJob }) => {
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [location, setLocation] = useState('San Francisco, CA (Hybrid)');
  const [employmentType, setEmploymentType] = useState<EmploymentType>('Full-time');
  const [experienceRequired, setExperienceRequired] = useState('3+ years');
  const [educationRequired, setEducationRequired] = useState("Bachelor's Degree in CS or related field");
  const [description, setDescription] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('React, TypeScript, Node.js');
  const [preferredSkills, setPreferredSkills] = useState('GraphQL, Docker, AWS');
  const [salaryRange, setSalaryRange] = useState('$140,000 - $175,000 / yr');
  const [status, setStatus] = useState<JobStatus>('Active');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: Job = {
      id: 'job-' + Date.now(),
      title,
      department,
      location,
      employmentType,
      experienceRequired,
      educationRequired,
      description,
      requiredSkills: requiredSkills.split(',').map(s => s.trim()).filter(Boolean),
      preferredSkills: preferredSkills.split(',').map(s => s.trim()).filter(Boolean),
      salaryRange: salaryRange || undefined,
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSaveJob(newJob);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Create Job Requisition</h3>
              <p className="text-xs text-slate-400">Define role requirements for AI candidate evaluation</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Job Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Senior Machine Learning Engineer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Department *</label>
              <input
                type="text"
                required
                placeholder="e.g. Engineering, AI, Design"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Location *</label>
              <input
                type="text"
                required
                placeholder="e.g. San Francisco, CA or Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Employment Type *</label>
              <select
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value as EmploymentType)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500"
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
              <label className="block text-xs font-semibold text-slate-300 mb-1">Experience Required *</label>
              <input
                type="text"
                required
                placeholder="e.g. 5+ years"
                value={experienceRequired}
                onChange={(e) => setExperienceRequired(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Education Required *</label>
              <input
                type="text"
                required
                placeholder="e.g. Bachelor's or Master's Degree"
                value={educationRequired}
                onChange={(e) => setEducationRequired(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Job Description *</label>
            <textarea
              rows={4}
              required
              placeholder="Detailed description of responsibilities and expectations..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Required Skills (Comma separated) *</label>
              <input
                type="text"
                required
                placeholder="React, TypeScript, PostgreSQL"
                value={requiredSkills}
                onChange={(e) => setRequiredSkills(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Skills</label>
              <input
                type="text"
                placeholder="Docker, GraphQL, Redis"
                value={preferredSkills}
                onChange={(e) => setPreferredSkills(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Salary Range (Optional)</label>
              <input
                type="text"
                placeholder="e.g. $150,000 - $185,000 / yr"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Initial Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as JobStatus)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500"
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 cursor-pointer"
            >
              Create Job Listing
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
