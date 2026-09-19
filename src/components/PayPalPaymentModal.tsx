import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, X, CheckCircle2, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';

interface PayPalPaymentModalProps {
  isOpen: boolean;
  targetIndustry: string;
  onPaymentSuccess: () => void;
  onCancel: () => void;
}

export const PayPalPaymentModal: React.FC<PayPalPaymentModalProps> = ({
  isOpen,
  targetIndustry,
  onPaymentSuccess,
  onCancel,
}) => {
  // Modal step state: 'checkout' -> 'paypal-screen' -> 'success'
  const [modalStep, setModalStep] = useState<'checkout' | 'paypal-screen' | 'success'>('checkout');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Reset step whenever modal is reopened
  useEffect(() => {
    if (isOpen) {
      setModalStep('checkout');
      setIsSimulating(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Step 2: Handle "Pay with PayPal" button click
  const handlePayWithPayPalClick = () => {
    setModalStep('paypal-screen');
  };

  // Step 3: Handle "Simulate Successful Payment" button click
  const handleSimulatePayment = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setModalStep('success');

      // Auto-continue to ATS evaluation after showing "Payment successful"
      setTimeout(() => {
        onPaymentSuccess();
      }, 1200);
    }, 800);
  };

  const handleModalClose = () => {
    setModalStep('checkout');
    setIsSimulating(false);
    onCancel();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
              <Lock className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">Enterprise ATS Checkout</h3>
              <p className="text-[11px] text-slate-400">Recruitz Solution Secure Payment Gateway</p>
            </div>
          </div>
          <button
            onClick={handleModalClose}
            disabled={isSimulating}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Cancel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">

          {/* STEP 1: INITIAL CHECKOUT SUMMARY */}
          {modalStep === 'checkout' && (
            <div className="space-y-6">
              
              {/* Item Card */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      Service
                    </span>
                    <h4 className="font-bold text-white text-base mt-1">Enterprise ATS Evaluation</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Target Industry: <strong className="text-indigo-300">{targetIndustry}</strong>
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Total Amount Due</span>
                  <span className="text-xl font-black text-white">$50 <span className="text-xs font-normal text-slate-400">USD</span></span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Payment Method</label>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-500/40 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="px-2.5 py-1 rounded bg-[#003087] text-white font-black text-xs italic tracking-tighter">
                      PayPal
                    </div>
                    <span className="text-xs font-semibold text-white">PayPal Express Checkout</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Selected</span>
                </div>
              </div>

              {/* Demo Mode Notice Banner */}
              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Frontend Demo Mode: Testing UI & User Flow</span>
              </div>

              {/* Actions */}
              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={handlePayWithPayPalClick}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-[#0070BA] hover:bg-[#003087] border border-blue-400/30 shadow-lg flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <span className="font-black italic text-base">PayPal</span>
                  <span>Pay with PayPal</span>
                  <ArrowRight className="w-4 h-4 text-white/80" />
                </button>

                <button
                  type="button"
                  onClick={handleModalClose}
                  className="w-full py-2.5 px-4 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors text-center cursor-pointer"
                >
                  Cancel
                </button>
              </div>

            </div>
          )}

          {/* STEP 2: TEST/DEMO PAYPAL PAYMENT SCREEN */}
          {modalStep === 'paypal-screen' && (
            <div className="space-y-5 animate-fadeIn">
              
              {/* PayPal Demo Header Card */}
              <div className="bg-[#003087]/20 border border-[#0070BA]/40 p-4 rounded-xl text-center space-y-2">
                <div className="inline-block px-3 py-1 bg-[#0070BA] text-white font-black italic text-sm rounded shadow">
                  PayPal Demo Checkout
                </div>
                <h4 className="text-sm font-bold text-white">Enterprise ATS Evaluation</h4>
                <p className="text-2xl font-black text-white">$50.00 <span className="text-xs text-slate-400 font-normal">USD</span></p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Merchant:</span>
                  <span className="font-semibold text-white">Recruitz Solution</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Item:</span>
                  <span className="font-semibold text-white">Enterprise ATS Resume Evaluation</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Mode:</span>
                  <span className="font-semibold text-indigo-400">Frontend Test / Demo Flow</span>
                </div>
              </div>

              {/* Simulation Action */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleSimulatePayment}
                  disabled={isSimulating}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/30 shadow-xl flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSimulating ? (
                    <>
                      <RefreshCw className="w-4 h-4 text-white animate-spin" />
                      <span>Simulating Payment Verification...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>Simulate Successful Payment</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleModalClose}
                  disabled={isSimulating}
                  className="w-full py-2.5 px-4 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors text-center cursor-pointer"
                >
                  Cancel
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: PAYMENT SUCCESS CONFIRMATION */}
          {modalStep === 'success' && (
            <div className="py-6 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 shadow-lg">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-white">Payment successful</h3>
                <p className="text-xs text-slate-400">
                  Your $50 USD payment was verified in Demo Mode.
                </p>
              </div>
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300 font-medium inline-block">
                Launching Enterprise ATS Evaluation report now...
              </div>
            </div>
          )}

        </div>

        {/* Footer Security Note */}
        <div className="p-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-bit Encrypted Demo Checkout</span>
          </div>
          <span>$50 USD</span>
        </div>

      </div>
    </div>
  );
};
