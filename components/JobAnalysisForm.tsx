
import React, { useState, useRef } from 'react';
import { JobData, ContactMethod } from '../types';

interface Props {
  onSubmit: (data: JobData) => void;
}

const JobAnalysisForm: React.FC<Props> = ({ onSubmit }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<JobData>({
    jobTitle: '',
    companyName: '',
    jobDescription: '',
    recruiterEmail: '',
    salary: '',
    askedForMoney: false,
    contactMethod: ContactMethod.EMAIL,
    offerImage: undefined
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          offerImage: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, offerImage: undefined }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl shadow-slate-200 p-8 border border-slate-100 space-y-6">
      <div className="space-y-2 border-b border-slate-100 pb-4 mb-4">
        <h2 className="text-2xl font-bold text-slate-800">New Job Verification</h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          Protect yourself by analyzing the details of your job offer. For the best results, upload a screenshot of the offer and paste the full job description below.
        </p>
      </div>

      {/* Image Upload Section */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-700 block">Offer Screenshot (Optional but recommended)</label>
        {!formData.offerImage ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group"
          >
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center group-hover:bg-indigo-100 group-hover:text-indigo-500 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <p className="mt-2 text-sm text-slate-500 font-medium">Click to Upload Screenshot</p>
            <p className="text-xs text-slate-400">Works with WhatsApp, LinkedIn, or Email screenshots</p>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              className="hidden" 
              accept="image/*" 
            />
          </div>
        ) : (
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 group">
            <img src={formData.offerImage} alt="Offer Preview" className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                type="button"
                onClick={removeImage}
                className="bg-white text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors shadow-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-700">Job Title</label>
          <input 
            required
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="e.g. Remote Designer"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-700">Company Name</label>
          <input 
            required
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="e.g. Google"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-700">Recruiter Email</label>
        <input 
          type="email"
          name="recruiterEmail"
          value={formData.recruiterEmail}
          onChange={handleChange}
          placeholder="hr@company.com"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-700">Full Job Description</label>
        <textarea 
          required
          name="jobDescription"
          value={formData.jobDescription}
          onChange={handleChange}
          rows={4}
          placeholder="Paste the full job description or offer text here..."
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-700">Offered Salary (Optional)</label>
          <input 
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="e.g. $60/hour or $120k/yr"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-700">Initial Contact Method</label>
          <select 
            name="contactMethod"
            value={formData.contactMethod}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          >
            {Object.values(ContactMethod).map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center space-x-3 p-4 bg-orange-50 border border-orange-100 rounded-2xl">
        <input 
          type="checkbox"
          name="askedForMoney"
          id="money"
          checked={formData.askedForMoney}
          onChange={handleChange}
          className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
        />
        <label htmlFor="money" className="text-sm font-medium text-orange-800 cursor-pointer select-none leading-snug">
          Did they ask for any upfront fees, equipment deposits, or ID verification via third-party links?
        </label>
      </div>

      <button 
        type="submit"
        className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center justify-center space-x-2"
      >
        <span>Run Full Risk Analysis</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
      </button>
    </form>
  );
};

export default JobAnalysisForm;
