
import React, { useState, useEffect } from 'react';
import { fetchSkillTrends, SkillTrend } from '../services/marketService';

const SkillsRadar: React.FC = () => {
  const [domain, setDomain] = useState('Frontend Development');
  const [trends, setTrends] = useState<SkillTrend[]>([]);
  const [loading, setLoading] = useState(false);

  const domains = ['Frontend Development', 'Data Science', 'Product Management', 'Cybersecurity', 'Cloud Computing'];

  const loadTrends = async (d: string) => {
    setLoading(true);
    const data = await fetchSkillTrends(d);
    setTrends(data);
    setLoading(false);
  };

  useEffect(() => {
    loadTrends(domain);
  }, []);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-extrabold text-slate-900">Market Skills Radar</h2>
        <p className="text-slate-500 italic">Real-time analysis of what companies are focusing on right now.</p>
        
        <div className="flex flex-wrap justify-center gap-2">
          {domains.map(d => (
            <button 
              key={d}
              onClick={() => { setDomain(d); loadTrends(d); }}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${domain === d ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-300'}`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          [1, 2, 3].map(i => <div key={i} className="h-24 bg-slate-100 rounded-3xl animate-pulse"></div>)
        ) : (
          trends.map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-indigo-100 transition-all flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-grow space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-800">{item.skill}</h3>
                  <span className="text-indigo-600 font-black">{item.relevance}% Demand</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${item.relevance}%` }}></div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SkillsRadar;
