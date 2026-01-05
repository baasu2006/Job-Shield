
import React from 'react';

const TechStack: React.FC = () => {
  const tools = [
    {
      name: 'Gemini 3 Flash',
      category: 'Reasoning Engine',
      description: 'Our core analysis engine. It processes complex linguistic structures in job offers to identify subtle manipulative patterns common in employment fraud.',
      icon: '🧠'
    },
    {
      name: 'Google Search Grounding',
      category: 'Web Connectivity',
      description: 'Provides real-time validation by connecting the AI to the live web. This allows us to verify if a company actually exists and if the job is listed on their portal.',
      icon: '🌐'
    },
    {
      name: 'Gemini Multimodal',
      category: 'Vision Intelligence',
      description: 'The AI "sees" the screenshots you upload, checking for unprofessional branding, inconsistent layouts, or forged corporate watermarks that human eyes might miss.',
      icon: '👁️'
    },
    {
      name: 'Structured JSON Mode',
      category: 'Data Engineering',
      description: 'Ensures every AI response adheres to a strict schema, allowing us to generate consistent Risk Scores and reliable actionable recommendations.',
      icon: '📊'
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-extrabold text-slate-900">Powered by Next-Gen Google AI</h2>
        <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
          JobShield is built on a stack of high-performance AI models and search grounding technologies to ensure that every verification is backed by real-world data and advanced reasoning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-indigo-200 transition-all flex flex-col h-full">
            <div className="text-4xl mb-4">{tool.icon}</div>
            <h3 className="text-xl font-bold text-slate-800 mb-1">{tool.name}</h3>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded-md mb-4 inline-block self-start">
              {tool.category}
            </span>
            <p className="text-slate-500 text-sm leading-relaxed flex-grow">{tool.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <svg className="w-6 h-6 mr-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          Secure Deployment Architecture
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h4 className="text-indigo-400 font-bold uppercase tracking-wider text-xs">Edge Frontend</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Built with React 19 and Tailwind CSS for a performant, responsive, and accessible experience across all devices.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-indigo-400 font-bold uppercase tracking-wider text-xs">AI Orchestration</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Direct integration with the Google GenAI SDK enables low-latency communication with the Gemini 3 series models.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-indigo-400 font-bold uppercase tracking-wider text-xs">Privacy-First</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Your data and analysis history never leave your browser unless you explicitly choose to share them. We value your job hunt privacy.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
