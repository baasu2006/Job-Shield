
import React, { useState } from 'react';
import { fetchLiveInternships, InternshipListing } from '../services/marketService';

const InternshipFinder: React.FC = () => {
  const [query, setQuery] = useState('Software Engineering');
  const [listings, setListings] = useState<InternshipListing[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const results = await fetchLiveInternships(query);
    setListings(results);
    setLoading(false);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-extrabold text-slate-900">Verified Job Discovery</h2>
        <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Bypass the ads and low-trust listings. We use Google Search grounding to scan the web for active, legitimate job and internship postings from official company sites and high-trust job boards.
        </p>
        
        <form onSubmit={handleSearch} className="flex gap-2 max-w-lg mx-auto pt-4">
          <input 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search role (e.g. AI, UX Design)..."
            className="flex-grow px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button 
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md shadow-indigo-100"
          >
            {loading ? 'Verifying...' : 'Find Jobs'}
          </button>
        </form>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-40 bg-slate-100 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {listings.map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100">{item.source}</span>
                  <span className="text-xs text-slate-400">{item.postedDate}</span>
                </div>
                <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1">{item.title}</h3>
                <p className="text-slate-500 text-sm mb-4 font-medium">{item.company}</p>
              </div>
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full py-2.5 bg-slate-50 text-slate-700 rounded-xl text-sm font-bold hover:bg-indigo-600 hover:text-white transition-all"
              >
                View on Official Site
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </div>
          ))}
          {!loading && listings.length === 0 && (
            <div className="col-span-full py-20 text-center text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">
              Enter a search term above to find verified job opportunities in your field.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InternshipFinder;
