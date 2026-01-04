
import React from 'react';

const TechStack: React.FC = () => {
  const tools = [
    {
      name: 'Gemini 3 Flash',
      category: 'Reasoning Engine',
      description: 'High-speed multimodal model used for linguistic analysis and scam pattern recognition.',
      icon: '🧠'
    },
    {
      name: 'Google Search Grounding',
      category: 'Real-time Data',
      description: 'Connects AI to live web results to verify companies and fetch current internships.',
      icon: '🌐'
    },
    {
      name: 'Gemini Multimodal',
      category: 'Vision AI',
      description: 'Analyzes screenshots of job offers to detect visual red flags and layout inconsistencies.',
      icon: '👁️'
    },
    {
      name: 'Structured JSON Mode',
      category: 'Data Integrity',
      description: 'Ensures the AI output matches our strict application schema for risk scoring.',
      icon: '📊'
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-extrabold text-slate-900">Powered by Google AI</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          JobShield leverages the latest in Generative AI and Google Cloud technology to provide a secure environment for job seekers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-indigo-200 transition-all">
            <div className="text-4xl mb-4">{tool.icon}</div>
            <h3 className="text-xl font-bold text-slate-800">{tool.name}</h3>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded-md mb-3 inline-block">
              {tool.category}
            </span>
            <p className="text-slate-500 text-sm leading-relaxed">{tool.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 text-white">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          Deployment Architecture
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-1">
            <h4 className="text-indigo-400 font-bold">Frontend</h4>
            <p className="text-slate-400 text-xs">React + Tailwind CSS hosted on Firebase.</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-indigo-400 font-bold">Backend</h4>
            <p className="text-slate-400 text-xs">Serverless Cloud Functions (Node.js).</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-indigo-400 font-bold">Data</h4>
            <p className="text-slate-400 text-xs">Gemini Embeddings for semantic search (Roadmap).</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
