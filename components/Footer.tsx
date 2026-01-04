
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-400 text-sm mb-4">
            &copy; {new Date().getFullYear()} JobShield. Powered by Google Gemini AI.
          </p>
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs text-slate-500 italic">
            <strong>Disclaimer:</strong> This tool uses rule-based logic and AI patterns to identify common scam indicators. 
            Risk scores are estimates for educational purposes and do not constitute a definitive judgment or legal advice. 
            Always verify employers independently before sharing personal or financial information.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
