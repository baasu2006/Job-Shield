
import React from 'react';

interface Props {
  onStart: () => void;
  onViewInternships: () => void;
  onViewSkills: () => void;
  onViewBot: () => void;
}

const HomeView: React.FC<Props> = ({ onStart, onViewInternships, onViewSkills, onViewBot }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-12 py-12">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Verify Jobs & Crack <span className="text-indigo-600">Your Interviews</span>.
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
          JobShield uses advanced AI to protect you from employment scams while providing a professional toolkit to help you land and negotiate your next role with confidence.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button 
            onClick={onStart}
            className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transform hover:scale-105 transition-all shadow-xl shadow-indigo-200"
          >
            Verify a Job Offer
          </button>
          <button 
            onClick={onViewBot}
            className="px-8 py-4 bg-indigo-50 text-indigo-700 rounded-2xl font-bold text-lg hover:bg-indigo-100 transition-all flex items-center"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m8 0h-4m4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            Talk to AI Coach
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-6xl">
        <div onClick={onStart} className="cursor-pointer group h-full">
          <FeatureCard 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
            title="Scam Shield"
            description="Our reasoning engine analyzes job descriptions for linguistic red flags, suspicious payment requests, and verified corporate patterns to keep you safe."
          />
        </div>
        <div onClick={onViewInternships} className="cursor-pointer group h-full">
          <FeatureCard 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
            title="Verified Jobs"
            description="Bypass low-trust job boards. We use Google Search grounding to pull active listings directly from official company career portals and verified platforms."
          />
        </div>
        <div onClick={onViewSkills} className="cursor-pointer group h-full">
          <FeatureCard 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
            title="Skills Radar"
            description="Stay ahead of the market by tracking technical skills currently in high demand. Build a learning roadmap based on what real recruiters are looking for."
          />
        </div>
        <div onClick={onViewBot} className="cursor-pointer group h-full">
          <FeatureCard 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m8 0h-4m4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>}
            title="Career Coach"
            description="Practice mock interviews, get resume feedback, and simulate tough negotiations with an AI mentor trained on thousands of successful career outcomes."
          />
        </div>
      </div>

      <div className="w-full max-w-3xl bg-indigo-50 border border-indigo-100 rounded-3xl p-8 text-left">
        <h3 className="text-xl font-bold text-indigo-900 mb-2">Market Insight</h3>
        <p className="text-indigo-700 leading-relaxed">
          The job market is shifting rapidly. AI, Cloud Architecture, and Data Privacy roles have seen a 40% surge in demand this year. Use our Radar tool to ensure your profile stays relevant.
        </p>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-left hover:shadow-md hover:border-indigo-200 transition-all h-full flex flex-col">
    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed flex-grow">{description}</p>
    <div className="mt-4 flex items-center text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
      EXPLORE TOOL <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
    </div>
  </div>
);

export default HomeView;
