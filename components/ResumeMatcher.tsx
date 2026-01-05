
import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';

interface MatchResult {
  score: number;
  missingKeywords: string[];
  suggestedRewrites: { original: string; improved: string; impact: string }[];
  summary: string;
}

const ResumeMatcher: React.FC = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobText, setJobText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MatchResult | null>(null);

  const handleMatch = async () => {
    if (!resumeText || !jobText) return;
    setLoading(true);

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const prompt = `
      Compare this Resume against this Job Description.
      Resume: ${resumeText}
      Job Description: ${jobText}

      Task:
      1. Calculate a match percentage (0-100).
      2. Identify 5 critical missing keywords.
      3. Rewrite 3 bullet points for impact.
      4. Provide a 1-sentence executive summary.
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ text: prompt }],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
              suggestedRewrites: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    original: { type: Type.STRING },
                    improved: { type: Type.STRING },
                    impact: { type: Type.STRING }
                  },
                  required: ["original", "improved", "impact"]
                }
              },
              summary: { type: Type.STRING }
            },
            required: ["score", "missingKeywords", "suggestedRewrites", "summary"]
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      setResult(data);
    } catch (error) {
      console.error("Match failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-slate-900">ATS Resume Optimizer</h2>
        <p className="text-slate-500">Match your resume to a job description and get AI-powered bullet point improvements.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Your Resume</label>
          <textarea 
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume content..."
            className="w-full h-64 p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm resize-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Job Description</label>
          <textarea 
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
            placeholder="Paste the target job description..."
            className="w-full h-64 p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm resize-none"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button 
          onClick={handleMatch}
          disabled={loading || !resumeText || !jobText}
          className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg"
        >
          {loading ? 'Analyzing Alignment...' : 'Calculate Match Score'}
        </button>
      </div>

      {result && (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                <circle 
                  cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" 
                  strokeDasharray={2 * Math.PI * 56}
                  strokeDashoffset={(2 * Math.PI * 56) * (1 - result.score / 100)}
                  className="text-indigo-600"
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-3xl font-black text-slate-800">{result.score}%</span>
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Alignment Summary</h3>
              <p className="text-slate-600 text-sm leading-relaxed italic">"{result.summary}"</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-4 uppercase tracking-widest text-xs">Missing Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {result.missingKeywords.map(k => (
                  <span key={k} className="px-3 py-1.5 bg-red-50 text-red-600 rounded-full text-xs font-bold border border-red-100">{k}</span>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-4 uppercase tracking-widest text-xs">AI Bullet Rewrites</h4>
              <div className="space-y-4">
                {result.suggestedRewrites.map((r, i) => (
                  <div key={i} className="space-y-2">
                    <p className="text-xs text-slate-400 line-through">{r.original}</p>
                    <p className="text-sm text-indigo-700 font-semibold">{r.improved}</p>
                    <p className="text-[10px] text-emerald-600 font-bold uppercase">{r.impact}</p>
                    {i < result.suggestedRewrites.length - 1 && <hr className="border-slate-50" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeMatcher;
