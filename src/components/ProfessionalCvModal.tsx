import React, { useState, useEffect } from 'react';
import { 
  Sparkles, X, Check, Lock, ShieldCheck, ArrowRight, FileText, CheckCircle2, 
  Award, Zap, Download, Printer, Edit3, RefreshCw, Briefcase, GraduationCap, 
  User, Mail, Phone, Globe, Layers, AlertCircle
} from 'lucide-react';
import { generateProfessionalCvViaAi } from '../services/api';
import { ProfessionalCvData } from '../types';

interface ProfessionalCvModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetIndustry: string;
  resumeText: string;
  jobDescription?: string;
  candidateName?: string;
}

export const ProfessionalCvModal: React.FC<ProfessionalCvModalProps> = ({
  isOpen,
  onClose,
  targetIndustry,
  resumeText,
  jobDescription,
  candidateName,
}) => {
  // Step flow: 'offer' -> 'payment-select' -> 'demo-paypal' -> 'success-loading' -> 'preview' -> 'edit'
  const [step, setStep] = useState<'offer' | 'payment-select' | 'demo-paypal' | 'success-loading' | 'preview' | 'edit'>('offer');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [cvData, setCvData] = useState<ProfessionalCvData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setStep('offer');
      setCvData(null);
      setError(null);
      setIsGenerating(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Pay with PayPal click
  const handlePayWithPayPal = () => {
    setStep('demo-paypal');
  };

  // Handle Simulate Successful Payment
  const handleSimulatePayment = async () => {
    setStep('success-loading');
    setIsGenerating(true);
    setError(null);

    try {
      // Generate Professional CV via AI using actual background
      const generated = await generateProfessionalCvViaAi(targetIndustry, resumeText, jobDescription);
      setCvData(generated);
      setTimeout(() => {
        setIsGenerating(false);
        setStep('preview');
      }, 800);
    } catch (err: any) {
      setIsGenerating(false);
      setError(err.message || 'Failed to generate professional CV.');
      setStep('preview');
    }
  };

  const handleRegenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const generated = await generateProfessionalCvViaAi(targetIndustry, resumeText, jobDescription);
      setCvData(generated);
    } catch (err: any) {
      setError(err.message || 'Regeneration failed.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Professional CV Optimization Service</h3>
              <p className="text-xs text-slate-450 text-slate-400">Job-Targeted, Truthful, ATS-Friendly CV Generation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* STEP 1: OFFER */}
          {step === 'offer' && (
            <div className="space-y-6 max-w-2xl mx-auto py-4 text-center animate-fadeIn">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Recruitz Solution Professional Service</span>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Build My Professional CV
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Create a professionally structured, job-targeted CV using your existing information and ATS recommendations.
                </p>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 text-left">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h4 className="font-bold text-white text-base">Professional CV Optimization Package</h4>
                    <p className="text-xs text-slate-400">Target Industry: <strong className="text-indigo-300">{targetIndustry}</strong></p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-white">$50</span>
                    <span className="text-xs text-slate-400 block">USD</span>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Strict anti-fabrication adherence: optimizes 100% real experience without invented credentials.</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Tailored professional summary & keyword prioritization based on job description.</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Clean, recruiter-ready, ATS-scannable formatting.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setStep('payment-select')}
                  className="px-8 py-4 rounded-xl font-extrabold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/20 border border-indigo-400/30 transition-all cursor-pointer inline-flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Get My Professional CV</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PAYMENT METHOD SELECTION */}
          {step === 'payment-select' && (
            <div className="space-y-6 max-w-md mx-auto py-4 animate-fadeIn">
              <div className="text-center space-y-1">
                <h3 className="text-lg font-bold text-white">Professional CV Optimization</h3>
                <p className="text-xs text-slate-400">Total Amount Due: <strong className="text-white">$50.00 USD</strong></p>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Select Payment Method</label>
                <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/40 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="px-3 py-1 rounded bg-[#003087] text-white font-black text-xs italic tracking-tighter">
                      PayPal
                    </div>
                    <span className="text-xs font-semibold text-white">PayPal Express Checkout</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Selected</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={handlePayWithPayPal}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-[#0070BA] hover:bg-[#003087] border border-blue-400/30 shadow-lg flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <span className="font-black italic text-base">PayPal</span>
                  <span>Pay with PayPal</span>
                  <ArrowRight className="w-4 h-4 text-white/80" />
                </button>

                <button
                  type="button"
                  onClick={() => setStep('offer')}
                  className="w-full py-2.5 text-xs font-medium text-slate-400 hover:text-slate-200 text-center cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DEMO PAYPAL SCREEN */}
          {step === 'demo-paypal' && (
            <div className="space-y-6 max-w-md mx-auto py-4 animate-fadeIn">
              <div className="bg-[#003087]/20 border border-[#0070BA]/40 p-5 rounded-2xl text-center space-y-2">
                <div className="inline-block px-3 py-1 bg-[#0070BA] text-white font-black italic text-sm rounded shadow">
                  PayPal Demo Checkout
                </div>
                <h4 className="text-sm font-bold text-white">Professional CV Optimization</h4>
                <p className="text-3xl font-black text-white">$50.00 <span className="text-xs text-slate-400 font-normal">USD</span></p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Merchant:</span>
                  <span className="font-semibold text-white">Recruitz Solution</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Service:</span>
                  <span className="font-semibold text-white">Professional CV Optimization & ATS Rewrite</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Mode:</span>
                  <span className="font-semibold text-indigo-400">Demo Payment Flow (Testing Only)</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleSimulatePayment}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/30 shadow-xl flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Simulate Successful Payment</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep('payment-select')}
                  className="w-full py-2.5 text-xs font-medium text-slate-400 hover:text-slate-200 text-center cursor-pointer"
                >
                  Cancel Payment
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS & LOADING */}
          {step === 'success-loading' && (
            <div className="py-12 text-center space-y-4 animate-fadeIn max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 shadow-lg">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-white">Payment Successful</h3>
                <p className="text-xs text-slate-400">
                  Demo payment of $50 USD verified successfully.
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-indigo-300 font-medium space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                  <span>Generating your professional job-targeted CV using your actual background...</span>
                </div>
                <p className="text-[11px] text-slate-400">Enforcing strict anti-fabrication quality control rules.</p>
              </div>
            </div>
          )}

          {/* STEP 5: PREVIEW PROFESSIONAL CV */}
          {step === 'preview' && cvData && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Action Toolbar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 print:hidden">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-white">Professional CV Ready for Review & Download</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setStep('edit')}
                    className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit CV</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleRegenerate}
                    disabled={isGenerating}
                    className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center space-x-1.5 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                    <span>Regenerate Section</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download CV / Print</span>
                  </button>
                </div>
              </div>

              {/* Render Professional CV Document */}
              <div className="bg-white text-slate-950 p-8 sm:p-12 rounded-2xl shadow-2xl max-w-3xl mx-auto space-y-6 font-sans">
                
                {/* Header */}
                <div className="border-b border-slate-300 pb-5 text-center sm:text-left space-y-1">
                  <h1 className="text-3xl font-black tracking-tight text-slate-900">{cvData.candidateName}</h1>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">{cvData.contactInfo}</p>
                </div>

                {/* Professional Summary */}
                {cvData.professionalSummary && (
                  <div className="space-y-2">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-700 border-b border-indigo-200 pb-1">Professional Summary</h2>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{cvData.professionalSummary}</p>
                  </div>
                )}

                {/* Core Skills */}
                {cvData.coreSkills && cvData.coreSkills.length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-700 border-b border-indigo-200 pb-1">Core Skills</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {cvData.coreSkills.map((cat, idx) => (
                        <div key={idx} className="bg-slate-50 p-2.5 rounded border border-slate-200">
                          <strong className="text-slate-900 block mb-1">{cat.category}:</strong>
                          <span className="text-slate-700">{cat.skills.join(', ')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Professional Experience */}
                {cvData.professionalExperience && cvData.professionalExperience.length > 0 && (
                  <div className="space-y-3">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-700 border-b border-indigo-200 pb-1">Professional Experience</h2>
                    <div className="space-y-4">
                      {cvData.professionalExperience.map((exp, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-bold text-slate-900">
                            <span>{exp.title} — <span className="text-indigo-700">{exp.company}</span></span>
                            <span className="text-slate-500 font-normal">{exp.dates}</span>
                          </div>
                          <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 pl-1">
                            {exp.bulletPoints.map((bp, i) => (
                              <li key={i} className="leading-relaxed">{bp}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {cvData.projects && cvData.projects.length > 0 && (
                  <div className="space-y-3">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-700 border-b border-indigo-200 pb-1">Projects</h2>
                    <div className="space-y-3 text-xs">
                      {cvData.projects.map((proj, idx) => (
                        <div key={idx} className="space-y-1 bg-slate-50 p-3 rounded border border-slate-200">
                          <div className="font-bold text-slate-900">{proj.title}</div>
                          <p className="text-slate-700">{proj.description}</p>
                          {proj.technologies && proj.technologies.length > 0 && (
                            <p className="text-[11px] text-indigo-600 font-medium">Technologies: {proj.technologies.join(', ')}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {cvData.education && cvData.education.length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-700 border-b border-indigo-200 pb-1">Education</h2>
                    <div className="space-y-2 text-xs">
                      {cvData.education.map((edu, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <div>
                            <strong className="text-slate-900 block">{edu.degree}</strong>
                            <span className="text-slate-600">{edu.institution}</span>
                          </div>
                          {edu.year && <span className="text-slate-500">{edu.year}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications */}
                {cvData.certifications && cvData.certifications.length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-700 border-b border-indigo-200 pb-1">Certifications</h2>
                    <ul className="list-disc list-inside text-xs text-slate-700 space-y-0.5">
                      {cvData.certifications.map((cert, idx) => (
                        <li key={idx}>{cert}</li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* STEP 6: EDIT CV FORM */}
          {step === 'edit' && cvData && (
            <div className="space-y-6 max-w-2xl mx-auto animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white">Edit Generated CV Details</h3>
                <button
                  type="button"
                  onClick={() => setStep('preview')}
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
                >
                  Save & Preview
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-400 font-bold block mb-1">Candidate Name</label>
                  <input
                    type="text"
                    value={cvData.candidateName}
                    onChange={(e) => setCvData({ ...cvData, candidateName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-bold block mb-1">Contact Information</label>
                  <input
                    type="text"
                    value={cvData.contactInfo}
                    onChange={(e) => setCvData({ ...cvData, contactInfo: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-bold block mb-1">Professional Summary</label>
                  <textarea
                    rows={4}
                    value={cvData.professionalSummary}
                    onChange={(e) => setCvData({ ...cvData, professionalSummary: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white leading-relaxed"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setStep('preview')}
                  className="w-full py-3 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
                >
                  Return to Professional CV Preview
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Recruitz Solution Professional CV Service</span>
          </div>
          <span>Strict Anti-Fabrication Quality Control</span>
        </div>

      </div>
    </div>
  );
};
