
import React from 'react';
import { AnalysisResult, RiskLevel } from '../types';

interface Props {
  result: AnalysisResult;
  onCheckAnother: () => void;
}

const AnalysisResults: React.FC<Props> = ({ result, onCheckAnother }) => {
  const getRiskStyles = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.HIGH:
        return { 
          bg: 'bg-red-50', 
          text: 'text-red-700', 
          border: 'border-red-200', 
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />,
          accent: 'bg-red-500'
        };
      case RiskLevel.MEDIUM:
        return { 
          bg: 'bg-amber-50', 
          text: 'text-amber-700', 
          border: 'border-amber-200', 
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
          accent: 'bg-amber-500'
        };
      case RiskLevel.LOW:
        return { 
          bg: 'bg-emerald-50', 
          text: 'text-emerald-700', 
          border: 'border-emerald-200', 
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
          accent: 'bg-emerald-500'
        };
    }
  };

  const styles = getRiskStyles(result.riskLevel);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className={`rounded-3xl p-8 border ${styles.border} ${styles.bg} shadow-sm`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-6">
            <div className={`p-4 rounded-2xl ${styles.accent} text-white shadow-lg`}>
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {styles.icon}
              </svg>
            </div>
            <div>
              <h3 className={`text-sm font-bold uppercase tracking-widest opacity-70 ${styles.text}`}>Detector Result</h3>
              <h2 className={`text-4xl font-extrabold ${styles.text}`}>{result.riskLevel}</h2>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <div className="relative inline-flex items-center justify-center p-1 rounded-full bg-white shadow-inner">
               <svg className="w-24 h-24 transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                <circle 
                  cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" 
                  strokeDasharray={2 * Math.PI * 40}
                  strokeDashoffset={(2 * Math.PI * 40) * (1 - result.riskScore / 100)}
                  className={result.riskLevel === RiskLevel.HIGH ? "text-red-500" : result.riskLevel === RiskLevel.MEDIUM ? "text-amber-500" : "text-emerald-500"}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-2xl font-black text-slate-800">{result.riskScore}%</div>
            </div>
            <p className="text-xs text-slate-500 mt-2 font-medium uppercase tracking-tighter">Scam Probability</p>
          </div>
        </div>
      </div>

      {/* Web Verification Links Section */}
      {result.verificationLinks.length > 0 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
            Verified Web Sources
          </h4>
          <div className="flex flex-wrap gap-2">
            {result.verificationLinks.map((link, i) => (
              <a 
                key={i} 
                href={link.uri} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-semibold hover:bg-indigo-100 transition-colors border border-indigo-100"
              >
                <span className="truncate max-w-[200px]">{link.title}</span>
                <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Why it might be UNSAFE */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            Risk Indicators
          </h4>
          <ul className="space-y-3">
            {result.redFlags.length > 0 ? result.redFlags.map((flag, i) => (
              <li key={i} className="flex items-start text-slate-600 text-sm">
                <span className="text-red-500 mr-2 font-bold">•</span> {flag}
              </li>
            )) : <li className="text-slate-400 text-sm italic">No specific red flags found.</li>}
          </ul>
        </div>

        {/* Why it might be SAFE */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Trust Indicators
          </h4>
          <ul className="space-y-3">
            {result.trustIndicators.length > 0 ? result.trustIndicators.map((trust, i) => (
              <li key={i} className="flex items-start text-slate-600 text-sm">
                <span className="text-emerald-500 mr-2 font-bold">•</span> {trust}
              </li>
            )) : <li className="text-slate-400 text-sm italic">No specific trust indicators found.</li>}
          </ul>
        </div>
      </div>

      <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200">
        <h4 className="text-xl font-bold mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          AI Reasoning & Web Verification
        </h4>
        <div className="space-y-4">
          <div>
            <h5 className="text-sm font-bold uppercase tracking-wider text-indigo-200 mb-1">Recommendation</h5>
            <p className="text-lg leading-relaxed font-medium">
              {result.aiRecommendation}
            </p>
          </div>
          <div className="pt-4 border-t border-indigo-400">
            <h5 className="text-sm font-bold uppercase tracking-wider text-indigo-200 mb-2">Detailed Analysis</h5>
            <p className="text-sm text-indigo-50 leading-relaxed italic">
              "{result.detailedAnalysis}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
