
import React, { useState, useEffect } from 'react';
import { JobData, AnalysisResult, HistoryItem } from './types';
import { performRiskAnalysis } from './services/riskEngine';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import JobAnalysisForm from './components/JobAnalysisForm';
import AnalysisResults from './components/AnalysisResults';
import Loader from './components/Loader';
import InternshipFinder from './components/InternshipFinder';
import SkillsRadar from './components/SkillsRadar';
import TechStack from './components/TechStack';
import CareerBot from './components/CareerBot';
import ResumeMatcher from './components/ResumeMatcher';
import NegotiationSim from './components/NegotiationSim';
import HistoryView from './components/HistoryView';

type AppView = 'home' | 'form' | 'loading' | 'result' | 'internships' | 'skills' | 'tech' | 'bot' | 'resume' | 'negotiate' | 'history';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');
  const [lastResult, setLastResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem('jobshield_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history on change
  useEffect(() => {
    localStorage.setItem('jobshield_history', JSON.stringify(history));
  }, [history]);

  const handleFormSubmit = async (data: JobData) => {
    setView('loading');
    try {
      const result = await performRiskAnalysis(data);
      
      const newHistoryItem: HistoryItem = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        jobData: data,
        result: result
      };

      setHistory(prev => [newHistoryItem, ...prev]);
      setLastResult(result);
      setView('result');
    } catch (error) {
      console.error(error);
      alert("Something went wrong during analysis.");
      setView('form');
    }
  };

  const handleViewHistoricalItem = (item: HistoryItem) => {
    setLastResult(item.result);
    setView('result');
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear all history?")) {
      setHistory([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar 
        onHomeClick={() => setView('home')} 
        onInternshipsClick={() => setView('internships')}
        onSkillsClick={() => setView('skills')}
        onTechClick={() => setView('tech')}
        onBotClick={() => setView('bot')}
        onResumeClick={() => setView('resume')}
        onNegotiateClick={() => setView('negotiate')}
        onHistoryClick={() => setView('history')}
        historyCount={history.length}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {view === 'home' && (
          <HomeView 
            onStart={() => setView('form')} 
            onViewInternships={() => setView('internships')}
            onViewSkills={() => setView('skills')}
            onViewBot={() => setView('bot')}
          />
        )}
        
        {view === 'form' && (
          <div className="max-w-2xl mx-auto">
             <button 
              onClick={() => setView('home')}
              className="mb-6 flex items-center text-slate-500 hover:text-slate-800 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              Back to Home
            </button>
            <JobAnalysisForm onSubmit={handleFormSubmit} />
          </div>
        )}

        {view === 'loading' && <Loader />}

        {view === 'result' && lastResult && (
          <div className="max-w-3xl mx-auto">
             <button 
              onClick={() => setView('form')}
              className="mb-6 flex items-center text-slate-500 hover:text-slate-800 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              Check Another Job
            </button>
            <AnalysisResults result={lastResult} onCheckAnother={() => setView('form')} />
          </div>
        )}

        {view === 'internships' && <InternshipFinder />}
        {view === 'skills' && <SkillsRadar />}
        {view === 'tech' && <TechStack />}
        {view === 'bot' && <CareerBot />}
        {view === 'resume' && <ResumeMatcher />}
        {view === 'negotiate' && <NegotiationSim />}
        {view === 'history' && (
          <HistoryView 
            history={history} 
            onView={handleViewHistoricalItem} 
            onDelete={handleDeleteHistoryItem}
            onClearAll={handleClearHistory}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
