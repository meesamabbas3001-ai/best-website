import React, { useState } from 'react';
import { 
  Sparkles, FileText, Upload, CheckCircle2, AlertCircle, ArrowRight, RefreshCw, 
  Award, Briefcase, GraduationCap, Building2, Globe, MapPin, Search, BarChart3, 
  Layers, ChevronRight, Download, Check, ShieldAlert, Cpu, Lightbulb, FileCheck, Copy, Printer
} from 'lucide-react';
import { evaluateResumeViaAi } from '../services/api';
import { AtsEvaluationResult } from '../types';

const INDUSTRY_OPTIONS = [
  'Information Technology',
  'Healthcare & Clinical',
  'Sales & Business Development',
  'Executive Management',
  'Finance & Banking',
  'Engineering & Manufacturing',
  'Marketing & Communications',
  'Legal & Compliance',
];

const ANALYSIS_STEPS = [
  'Parsing resume',
  'Analyzing experience',
  'Extracting skills',
  'Evaluating ATS compatibility',
  'Matching job requirements',
  'Identifying skill gaps',
  'Analyzing career opportunities',
  'Preparing final report'
];

export const AiAtsResumeAnalyzer: React.FC = () => {
  const [targetIndustry, setTargetIndustry] = useState<string>('Information Technology');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [resumeText, setResumeText] = useState<string>('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Analysis settings checkboxes (enabled by default)
  const [settings, setSettings] = useState({
    atsResumeAnalysis: true,
    jobMatchAnalysis: true,
    skillGapAnalysis: true,
    careerRoleRecommendations: true,
    resumeImprovementSuggestions: true,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AtsEvaluationResult | null>(null);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // File Upload Handler (reads plain text files in browser locally)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setResumeText(content);
      }
    };

    reader.onerror = () => {
      setError('Failed to read resume file. Please paste the raw text manually.');
    };

    reader.readAsText(file);
  };

  // Run Evaluation
  const handleRunEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim()) {
      setError('Please upload or paste your resume first.');
      return;
    }

    setError(null);
    setIsLoading(true);
    setCurrentStepIndex(0);

    // Animate loading steps sequentially
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < ANALYSIS_STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 650);

    try {
      const data = await evaluateResumeViaAi(targetIndustry, resumeText, jobDescription);
      clearInterval(stepInterval);
      setCurrentStepIndex(ANALYSIS_STEPS.length - 1);
      setTimeout(() => {
        setResult(data);
        setIsLoading(false);
      }, 400);
    } catch (err: any) {
      clearInterval(stepInterval);
      setIsLoading(false);
      setError(err.message || 'An error occurred during evaluation. Please try again.');
    }
  };

  const resetForm = () => {
    setResult(null);
    setError(null);
    setResumeText('');
    setJobDescription('');
    setUploadedFileName(null);
  };

  const copyImprovedSummary = () => {
    if (!result?.improvedProfessionalSummary) return;
    navigator.clipboard.writeText(result.improvedProfessionalSummary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (score >= 65) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 65) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const getBadgeClass = (badge: string) => {
    if (badge === 'Excellent Match') return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    if (badge === 'Strong Match') return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
    return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 font-sans print:p-0 print:bg-white print:text-black">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Page Title & Subtitle */}
        <div className="text-center space-y-3 max-w-3xl mx-auto print:hidden">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>AI ATS Resume Analyzer</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            AI ATS Resume Analyzer
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Analyze your resume against ATS requirements, identify skill gaps, improve your CV, and discover job roles that match your experience.
          </p>
        </div>

        {/* INPUT FORM (Shown if no result and not loading) */}
        {!result && !isLoading && (
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-8 max-w-4xl mx-auto">
            
            {error && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Validation Notice: </span>
                  {error}
                </div>
              </div>
            )}

            <form onSubmit={handleRunEvaluation} className="space-y-8">
              
              {/* STEP 1 — TARGET INDUSTRY */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">1</span>
                  <label className="text-sm font-bold text-white uppercase tracking-wider">
                    Target Industry
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {INDUSTRY_OPTIONS.map((ind) => (
                    <button
                      type="button"
                      key={ind}
                      onClick={() => setTargetIndustry(ind)}
                      className={`px-4 py-3 rounded-xl text-xs font-medium text-left border transition-all cursor-pointer ${
                        targetIndustry === ind
                          ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold shadow-md shadow-indigo-500/10'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{ind}</span>
                        {targetIndustry === ind && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 2 — RESUME INPUT */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                  <label className="text-sm font-bold text-white uppercase tracking-wider">
                    Resume Input
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* OPTION A: Upload Resume Text File */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-300">
                      Option A: Upload Resume Text File (.txt / .md)
                    </label>
                    <div className="relative border-2 border-dashed border-slate-800 rounded-xl p-6 text-center bg-slate-950/60 hover:border-indigo-500/60 transition-colors h-44 flex flex-col items-center justify-center">
                      <input
                        type="file"
                        accept=".txt,.md,.text"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Upload className="w-8 h-8 text-indigo-400 mb-2" />
                      {uploadedFileName ? (
                        <div className="text-xs font-semibold text-emerald-400 flex items-center space-x-1.5">
                          <FileCheck className="w-4 h-4" />
                          <span>File Loaded: {uploadedFileName}</span>
                        </div>
                      ) : (
                        <>
                          <p className="text-xs font-medium text-slate-200">
                            Click or drag and drop a plain text file (.txt)
                          </p>
                          <p className="text-[11px] text-slate-500 mt-1">
                            Parsed locally in browser before submission
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* OPTION B: Paste Resume */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-slate-300">
                        Option B: Candidate CV / Resume Raw Text *
                      </label>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {resumeText.length} chars
                      </span>
                    </div>
                    <textarea
                      rows={6}
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      placeholder="Paste your complete resume here for rigorous ATS parsing and analysis..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors font-mono leading-relaxed h-44"
                    />
                  </div>
                </div>
              </div>

              {/* STEP 3 — TARGET JOB */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">3</span>
                  <label className="text-sm font-bold text-white uppercase tracking-wider">
                    Target Job Description / Role Requirements <span className="text-slate-500 font-normal lowercase">(optional)</span>
                  </label>
                </div>
                <textarea
                  rows={3}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description or role requirements here for precise ATS matching..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                />
                <p className="text-[11px] text-indigo-400/80 italic">
                  "Adding a job description provides a more accurate ATS match."
                </p>
              </div>

              {/* STEP 4 — ATS ANALYSIS OPTIONS */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">4</span>
                  <label className="text-sm font-bold text-white uppercase tracking-wider">
                    Analysis Settings
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { id: 'atsResumeAnalysis', label: 'ATS Resume Analysis' },
                    { id: 'jobMatchAnalysis', label: 'Job Match Analysis' },
                    { id: 'skillGapAnalysis', label: 'Skill Gap Analysis' },
                    { id: 'careerRoleRecommendations', label: 'Career Role Recommendations' },
                    { id: 'resumeImprovementSuggestions', label: 'Resume Improvement Suggestions' },
                  ].map((opt) => (
                    <label key={opt.id} className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 cursor-pointer hover:border-slate-700">
                      <input
                        type="checkbox"
                        checked={settings[opt.id as keyof typeof settings]}
                        onChange={(e) => setSettings({ ...settings, [opt.id]: e.target.checked })}
                        className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* MAIN BUTTON */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 hover:from-indigo-500 hover:to-indigo-400 shadow-xl shadow-indigo-600/25 border border-indigo-400/30 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-emerald-300 animate-pulse" />
                  <span>Run Enterprise ATS Evaluation</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

            </form>
          </div>
        )}

        {/* LOADING EXPERIENCE */}
        {isLoading && (
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-8 sm:p-12 shadow-xl max-w-2xl mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/10">
              <Cpu className="w-8 h-8 text-indigo-400 animate-spin" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Evaluating ATS Resume Compatibility</h3>
              <p className="text-xs text-slate-400">Our Enterprise AI model is parsing your CV against ATS criteria...</p>
            </div>

            {/* Analysis Steps Checklist */}
            <div className="space-y-2 text-left bg-slate-950/80 rounded-xl p-5 border border-slate-800">
              {ANALYSIS_STEPS.map((step, idx) => {
                const isDone = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                return (
                  <div key={idx} className="flex items-center space-x-3 text-xs">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : isCurrent ? (
                      <div className="w-4 h-4 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-800 shrink-0" />
                    )}
                    <span className={isDone ? 'text-slate-300' : isCurrent ? 'text-indigo-300 font-semibold' : 'text-slate-600'}>
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* RESULT DESIGN */}
        {result && !isLoading && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Top Bar Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 print:hidden">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <div>
                  <h2 className="text-sm font-bold text-white">ATS Evaluation Completed</h2>
                  <p className="text-xs text-slate-400">Target Industry: {targetIndustry}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={resetForm}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center space-x-2 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Analyze Another Resume</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/30 shadow-md transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Download / Print ATS Report</span>
                </button>
              </div>
            </div>

            {/* OVERALL ATS SCORE CARD */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-semibold uppercase tracking-wide">
                  Candidate Profile Identified
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {result.candidateProfile.candidateName}
                </h2>
                <p className="text-sm text-indigo-400 font-medium">
                  {result.candidateProfile.professionalTitle} • {result.candidateProfile.yearsOfExperience}
                </p>
                <p className="text-xs text-slate-400">
                  {result.scoreExplanation}
                </p>
              </div>

              {/* Large Score Gauge */}
              <div className={`p-6 rounded-2xl border ${getScoreColor(result.atsScore)} text-center min-w-[220px] shadow-lg`}>
                <span className="text-xs uppercase font-bold tracking-wider block opacity-80">ATS SCORE</span>
                <span className="text-5xl font-black tracking-tight my-1 block">{result.atsScore}<span className="text-2xl font-semibold opacity-60">/100</span></span>
                <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-slate-950/80 inline-block mt-1">
                  {result.atsScore >= 80 ? '⭐ Excellent ATS Fit' : result.atsScore >= 65 ? '👍 Competitive' : '⚠️ Critical ATS Gaps'}
                </span>
              </div>
            </div>

            {/* SCORE BREAKDOWN & EXPLANATION */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
              <h3 className="font-bold text-white text-base border-b border-slate-800 pb-2">Score Breakdown & Analysis</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { key: 'keywordOptimization', label: 'Keyword Optimization', score: result.scoreBreakdown.keywordOptimization },
                  { key: 'skillMatch', label: 'Skill Match', score: result.scoreBreakdown.skillMatch },
                  { key: 'experienceMatch', label: 'Experience Match', score: result.scoreBreakdown.experienceMatch },
                  { key: 'educationMatch', label: 'Education Match', score: result.scoreBreakdown.educationMatch },
                  { key: 'jobDescriptionMatch', label: result.jobMatchDetails.jobDescriptionProvided ? 'Job Description Match' : 'General Career Fit Analysis', score: result.scoreBreakdown.jobDescriptionMatch },
                  { key: 'industryAlignment', label: 'Industry Alignment', score: result.scoreBreakdown.industryAlignment },
                  { key: 'resumeStructure', label: 'Resume Structure', score: result.scoreBreakdown.resumeStructure },
                  { key: 'achievementStrength', label: 'Achievement Strength', score: result.scoreBreakdown.achievementStrength },
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block truncate">{item.label}</span>
                    <span className="text-xl font-extrabold text-white block">{item.score}%</span>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full ${getScoreBadgeColor(item.score)}`} style={{ width: `${item.score}%` }} />
                    </div>
                    {result.scoreBreakdown.explanations?.[item.key as keyof typeof result.scoreBreakdown.explanations] && (
                      <p className="text-[10px] text-slate-400 pt-1 line-clamp-2">
                        {result.scoreBreakdown.explanations[item.key as keyof typeof result.scoreBreakdown.explanations]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* RESUME ATS CHECK / ISSUES FOUND */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">ATS Issues Found</h3>
              </div>

              <div className="space-y-3">
                {result.atsIssues?.map((issue, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{issue.problem}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        issue.severity === 'High' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : issue.severity === 'Medium' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {issue.severity} Severity
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      <strong className="text-slate-300">Why it matters: </strong>{issue.whyItMatters}
                    </p>
                    <p className="text-xs text-indigo-300 bg-indigo-500/10 p-2 rounded border border-indigo-500/20">
                      <strong className="text-indigo-200">How to improve: </strong>{issue.howToImprove}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* KEYWORD ANALYSIS */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                <Search className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-white text-base">Keyword Analysis</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-emerald-400 block">Matched Keywords</span>
                  <div className="flex flex-wrap gap-1.5">
                    {result.keywordAnalysis.matchedKeywords?.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px]">✓ {kw}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-rose-400 block">Missing Keywords</span>
                  <div className="flex flex-wrap gap-1.5">
                    {result.keywordAnalysis.missingKeywords?.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[11px]">✗ {kw}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SKILL GAP ANALYSIS */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                <BarChart3 className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Skill Gap Analysis</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-emerald-400 block">Skills You Have</span>
                  <div className="flex flex-wrap gap-1.5">
                    {result.skillGapAnalysis.skillsDemonstrated?.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-amber-400 block">Recommended Skills to Learn</span>
                  <ul className="space-y-1.5">
                    {result.skillGapAnalysis.recommendedSkillsToLearn?.map((item, i) => (
                      <li key={i} className="text-slate-300">
                        <strong className="text-white">{item.skill}:</strong> {item.whyUseful}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* JOB DESCRIPTION MATCH / GENERAL FIT */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
              <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3">
                {result.jobMatchDetails.jobDescriptionProvided ? 'Job Description Match Analysis' : 'General Career Fit Analysis'}
              </h3>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                <p><strong className="text-emerald-400">Why this resume matches: </strong>{result.jobMatchDetails.whyResumeMatches}</p>
                <p><strong className="text-amber-400">What may prevent a stronger match: </strong>{result.jobMatchDetails.whatMayPreventStrongerMatch}</p>
              </div>
            </div>

            {/* CAREER ROLE RECOMMENDATIONS */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6">
              <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
                <Briefcase className="w-6 h-6 text-indigo-400" />
                <div>
                  <h3 className="font-extrabold text-white text-lg">Recommended Job Roles</h3>
                  <p className="text-xs text-slate-400">Suitable job roles matched strictly against candidate technical capabilities and experience.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {result.recommendedRoles?.map((role, idx) => (
                  <div key={idx} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold text-white text-base">{role.role}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getBadgeClass(role.matchBadge)}`}>
                        {role.matchBadge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{role.whyItMatches}</p>
                    <div className="text-[11px] text-slate-400">
                      <strong className="text-slate-200">Career Level: </strong>{role.suggestedCareerLevel}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PAKISTAN CAREER OPPORTUNITIES */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                <Building2 className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="font-bold text-white text-base">Recommended job roles in Pakistan</h3>
                  <p className="text-xs text-slate-400">Career pathways & sector opportunities in major Pakistan tech hubs (Lahore, Karachi, Islamabad).</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="font-bold text-emerald-400 block mb-1">Recommended Categories:</span>
                  <p className="text-slate-300">{result.pakistanOpportunities.recommendedJobCategories?.join(', ')}</p>
                </div>
                <div>
                  <span className="font-bold text-indigo-400 block mb-1">Remote & Work Environments:</span>
                  <p className="text-slate-300">{result.pakistanOpportunities.remoteOpportunities}</p>
                </div>
              </div>
            </div>

            {/* GLOBAL CAREER OPPORTUNITIES */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                <Globe className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-white text-base">Global & Remote Opportunities</h3>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                <p><strong className="text-indigo-300">International Roles: </strong>{result.globalOpportunities.internationalJobRoles?.join(', ')}</p>
                <p><strong className="text-indigo-300">Global Skill Demand: </strong>{result.globalOpportunities.globalSkillOpportunities}</p>
              </div>
            </div>

            {/* AI-GENERATED PROFESSIONAL SUMMARY */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-white text-base">AI-Generated Professional Summary</h3>
                </div>
                <button
                  onClick={copyImprovedSummary}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  {copiedSummary ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSummary ? 'Copied!' : 'Copy Summary'}</span>
                </button>
              </div>
              <p className="text-xs text-slate-200 bg-slate-950 p-4 rounded-xl border border-slate-800 leading-relaxed font-mono">
                {result.improvedProfessionalSummary}
              </p>
            </div>

            {/* RESUME IMPROVEMENT SUGGESTIONS */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">How to Improve Your Resume</h3>
              </div>
              <div className="space-y-3">
                {result.resumeImprovements?.map((item, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <span className="font-bold text-indigo-300 uppercase tracking-wider block">{item.section}</span>
                    <p><strong className="text-rose-400">Current Problem: </strong>{item.currentProblem}</p>
                    <p><strong className="text-emerald-400">Recommended Version: </strong>{item.recommendedVersion}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FINAL ATS REPORT */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-4">
              <h3 className="font-extrabold text-white text-lg border-b border-slate-800 pb-3">ATS Evaluation Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-emerald-400 block">Top Strengths</span>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    {result.finalAtsReport.topStrengths?.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-rose-400 block">Top 5 Resume Improvements</span>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    {result.finalAtsReport.top5Improvements?.map((imp, i) => <li key={i}>{imp}</li>)}
                  </ul>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
