
import React from 'react';

interface Props {
  onHomeClick: () => void;
  onInternshipsClick: () => void;
  onSkillsClick: () => void;
  onTechClick: () => void;
}

const Navbar: React.FC<Props> = ({ onHomeClick, onInternshipsClick, onSkillsClick, onTechClick }) => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={onHomeClick}
        >
          <div className="bg-indigo-600 text-white p-1.5 rounded-lg shadow-sm">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">JobShield</span>
        </div>
        
        <div className="hidden lg:flex items-center space-x-6 text-sm font-medium text-slate-600">
          <button onClick={onHomeClick} className="hover:text-indigo-600 transition-colors">Verify Job</button>
          <button onClick={onInternshipsClick} className="hover:text-indigo-600 transition-colors">Live Internships</button>
          <button onClick={onSkillsClick} className="hover:text-indigo-600 transition-colors">Skills Radar</button>
          <button onClick={onTechClick} className="hover:text-indigo-600 transition-colors">Tech Stack</button>
          <button 
            className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            onClick={() => window.open('https://www.ftc.gov/business-guidance/resources/job-scams', '_blank')}
          >
            Safety Guide
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
