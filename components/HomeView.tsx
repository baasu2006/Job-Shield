
import React from 'react';

interface Props {
  onStart: () => void;
  onViewInternships: () => void;
  onViewSkills: () => void;
}

const HomeView: React.FC<Props> = ({ onStart, onViewInternships, onViewSkills }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-12 py-12">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Verify Jobs & Discover <span className="text-indigo-600">Verified Internships</span>.
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Verify suspicious job offers, find verified live internships, and stay updated with the skills modern companies want.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button 
            onClick={onStart}
            className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transform hover:scale-105 transition-all shadow-xl shadow-indigo-200"
          >
            Verify a Job
          </button>
          <button 
            onClick={onViewInternships}
            className="px-8 py-4 bg-white border-2 border-indigo-100 text-indigo-600 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all"
          >
            Find Live Internships
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <div onClick={onStart} className="cursor-pointer group">
          <FeatureCard 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
            title="Scam Shield"
            description="AI-powered analysis to detect fake jobs and internship offers instantly."
          />
        </div>
        <div onClick={onViewInternships} className="cursor-pointer group">
          <FeatureCard 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
            title="Verified Listings"
            description="Real-time search for active internships from trusted platforms and companies."
          />
        </div>
        <div onClick={onViewSkills} className="cursor-pointer group">
          <FeatureCard 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
            title="Skills Radar"
            description="See what modern companies are focusing on and learn the most in-demand skills."
          />
        </div>
      </div>

      <div className="w-full max-w-3xl bg-indigo-50 border border-indigo-100 rounded-3xl p-8 text-left">
        <h3 className="text-xl font-bold text-indigo-900 mb-2">Market Insights</h3>
        <p className="text-indigo-700 leading-relaxed">
          The job market is changing fast. AI and Cloud skills are seeing a <strong className="text-indigo-900">40% increase</strong> in demand for 2024. Use our Radar to stay ahead!
        </p>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-left hover:shadow-md hover:border-indigo-200 transition-all h-full">
    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
  </div>
);

export default HomeView;
