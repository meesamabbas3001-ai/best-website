import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { AiAtsResumeAnalyzer } from './components/AiAtsResumeAnalyzer';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'ats'>('landing');

  // Synchronize route hash for /ats
  useEffect(() => {
    if (window.location.hash === '#ats' || window.location.pathname === '/ats') {
      setCurrentView('ats');
    }

    const handleHashChange = () => {
      if (window.location.hash === '#ats' || window.location.pathname === '/ats') {
        setCurrentView('ats');
      } else {
        setCurrentView('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view: 'landing' | 'ats') => {
    setCurrentView(view);
    if (view === 'ats') {
      window.location.hash = 'ats';
    } else {
      window.location.hash = '';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col justify-between">
      <div>
        <Header
          currentView={currentView}
          onNavigate={handleNavigate}
        />

        {currentView === 'landing' ? (
          <LandingPage onOpenAts={() => handleNavigate('ats')} />
        ) : (
          <main className="py-2">
            <AiAtsResumeAnalyzer />
          </main>
        )}
      </div>

      <Footer />
    </div>
  );
}
