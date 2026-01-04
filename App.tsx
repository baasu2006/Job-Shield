
import React, { useState } from 'react';
import { JobData, AnalysisResult } from './types';
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

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'form' | 'loading' | 'result' | 'internships' | 'skills' | 'tech'>('home');
  const [lastResult, setLastResult] = useState<AnalysisResult | null>(null);

  const handleStartAnalysis = () => setView('form');
  const handleViewInternships = () => setView('internships');
  const handleViewSkills = () => setView('skills');
  const handleViewTech = () => setView('tech');
  
  const handleFormSubmit = async (data: JobData) => {
    setView('loading');
    try {
      const result = await performRiskAnalysis(data);
      setLastResult(result);
      setView('result');
    } catch (error) {
      console.error(error);
      alert("Something went wrong during analysis.");
      setView('form');
    }
  };

  const handleReset = () => {
    setLastResult(null);
    setView('home');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        onHomeClick={handleReset} 
        onInternshipsClick={handleViewInternships}
        onSkillsClick={handleViewSkills}
        onTechClick={handleViewTech}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {view === 'home' && (
          <HomeView 
            onStart={handleStartAnalysis} 
            onViewInternships={handleViewInternships}
            onViewSkills={handleViewSkills}
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
      </main>

      <Footer />
    </div>
  );
};

export default App;
