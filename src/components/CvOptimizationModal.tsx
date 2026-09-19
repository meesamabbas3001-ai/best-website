import React, { useState } from 'react';
import { Sparkles, X, Check, Lock, ShieldCheck, ArrowRight, FileText, CheckCircle2, Award, Zap } from 'lucide-react';

interface CvOptimizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetIndustry: string;
  candidateName?: string;
}

export const CvOptimizationModal: React.FC<CvOptimizationModalProps> = ({
  isOpen,
  onClose,
  targetIndustry,
  candidateName,
}) => {
  const [selectedPackage, setSelectedPackage] = useState<'standard' | 'executive'>('standard');
  const [isOrdering, setIsOrdering] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSimulateOrder = () => {
    setIsOrdering(true);
    setTimeout(() => {
      setIsOrdering(false);
      setOrderComplete(true);
    }, 1200);
  };

  const handleModalClose = () => {
    setOrderComplete(false);
    setIsOrdering(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100 space-y-0">
        
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Professional CV Service</h3>
              <p className="text-xs text-slate-400">Job-Targeted Optimization & ATS-Proof Formatting</p>
            </div>
          </div>
          <button
            onClick={handleModalClose}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">

          {!orderComplete ? (
            <>
              {/* Headline Banner */}
              <div className="bg-gradient-to-r from-indigo-900/40 via-indigo-800/20 to-slate-900 p-4 rounded-xl border border-indigo-500/30 space-y-1">
                <div className="flex items-center space-x-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span>Turn your ATS results into a professional, job-targeted CV.</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our professional resume specialists rewrite and reformat your CV tailored specifically for <strong className="text-white">{targetIndustry}</strong> roles using proven ATS keyword density rules.
                </p>
              </div>

              {/* Package Selection */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Select CV Optimization Package
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Standard Package */}
                  <div
                    onClick={() => setSelectedPackage('standard')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer space-y-3 relative ${
                      selectedPackage === 'standard'
                        ? 'bg-indigo-600/10 border-indigo-500 shadow-md shadow-indigo-500/10'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-white text-sm">Professional ATS Rewrite</h4>
                        <p className="text-[11px] text-slate-400">Perfect for Mid-level Roles</p>
                      </div>
                      <span className="text-lg font-black text-white">$49</span>
                    </div>
                    <ul className="space-y-1.5 text-[11px] text-slate-300">
                      <li className="flex items-center space-x-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>ATS-formatted Word & PDF versions</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Missing keywords incorporated</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Targeted professional summary</span>
                      </li>
                    </ul>
                  </div>

                  {/* Executive Package */}
                  <div
                    onClick={() => setSelectedPackage('executive')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer space-y-3 relative ${
                      selectedPackage === 'executive'
                        ? 'bg-indigo-600/10 border-indigo-500 shadow-md shadow-indigo-500/10'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="absolute -top-2.5 right-3 bg-emerald-500 text-slate-950 font-black text-[9px] uppercase px-2 py-0.5 rounded-full">
                      Most Popular
                    </span>
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-white text-sm">Executive & Leadership Pack</h4>
                        <p className="text-[11px] text-slate-400">Senior & Executive Level</p>
                      </div>
                      <span className="text-lg font-black text-white">$89</span>
                    </div>
                    <ul className="space-y-1.5 text-[11px] text-slate-300">
                      <li className="flex items-center space-x-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Includes everything in Professional</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>LinkedIn Profile Optimization</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Cover Letter Template included</span>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>

              {/* Demo Mode Notice */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>UI Demo Mode: Real payment gateway can be connected here.</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-500">Recruitz Solution</span>
              </div>

              {/* Order Button */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleSimulateOrder}
                  disabled={isOrdering}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 border border-indigo-400/30 shadow-lg flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  <FileText className="w-4 h-4 text-emerald-300" />
                  <span>{isOrdering ? 'Processing Order Request...' : `Order ${selectedPackage === 'standard' ? 'Professional' : 'Executive'} CV Optimization`}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="w-full py-2 text-xs font-medium text-slate-400 hover:text-slate-200 text-center cursor-pointer"
                >
                  Close
                </button>
              </div>
            </>
          ) : (
            /* Order Success View */
            <div className="py-8 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-white">CV Optimization Request Received!</h3>
                <p className="text-xs text-slate-400">
                  Thank you{candidateName ? `, ${candidateName}` : ''}! Your ATS analysis data has been saved.
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 max-w-md mx-auto space-y-1 text-left">
                <div className="flex justify-between font-semibold border-b border-slate-800 pb-2 mb-2">
                  <span>Selected Service:</span>
                  <span className="text-indigo-400">{selectedPackage === 'standard' ? 'Professional ATS Rewrite ($49)' : 'Executive Pack ($89)'}</span>
                </div>
                <p className="text-slate-400">
                  In a production setup, your real payment gateway will verify the transaction and send the optimized CV package directly to your email.
                </p>
              </div>
              <button
                type="button"
                onClick={handleModalClose}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer inline-block"
              >
                Return to ATS Report
              </button>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Recruitz Solution Resume Services</span>
          </div>
          <span>Demo Checkout Flow</span>
        </div>

      </div>
    </div>
  );
};
