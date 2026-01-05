
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 space-y-8 animate-in fade-in duration-500">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-10 h-10 text-indigo-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
        </div>
      </div>
      <div className="text-center space-y-3">
        <h3 className="text-2xl font-bold text-slate-800">Verifying Offer Authenticity...</h3>
        <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
          We are currently cross-referencing company domains, checking for linguistic scam patterns, and grounding analysis in live Google Search data.
        </p>
        <div className="flex items-center justify-center space-x-2 pt-2">
            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce delay-75"></span>
            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce delay-150"></span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
