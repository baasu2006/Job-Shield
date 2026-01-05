
import React from 'react';
import { HistoryItem, RiskLevel } from '../types';

interface Props {
  history: HistoryItem[];
  onView: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

const HistoryView: React.FC<Props> = ({ history, onView, onDelete, onClearAll }) => {
  const getRiskStyles = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.HIGH:
        return 'bg-red-100 text-red-700 border-red-200';
      case RiskLevel.MEDIUM:
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case RiskLevel.LOW:
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(timestamp));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">Analysis History</h2>
          <p className="text-slate-500 mt-1">Review your past job verifications and risk reports.</p>
        </div>
        {history.length > 0 && (
          <button 
            onClick={onClearAll}
            className="text-sm font-bold text-red-500 hover:text-red-700 transition-colors flex items-center bg-red-50 px-4 py-2 rounded-xl"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
          <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800">No History Yet</h3>
          <p className="text-slate-500 max-w-xs mx-auto mt-2">Any jobs you verify will appear here for you to review later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {history.map((item) => (
            <div 
              key={item.id}
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center space-x-4 flex-grow cursor-pointer" onClick={() => onView(item)}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${getRiskStyles(item.result.riskLevel)}`}>
                  {item.result.riskScore}%
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 flex items-center">
                    {item.jobData.jobTitle}
                    <span className="mx-2 text-slate-300">•</span>
                    <span className="text-slate-500 font-medium">{item.jobData.companyName}</span>
                  </h4>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-xs text-slate-400 font-medium">{formatDate(item.timestamp)}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase border ${getRiskStyles(item.result.riskLevel)}`}>
                      {item.result.riskLevel}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onView(item)}
                  className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  title="View Report"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </button>
                <button 
                  onClick={() => onDelete(item.id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryView;
