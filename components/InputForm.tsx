import React from 'react';
import { FormData, Niche } from '../types';

interface InputFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ formData, setFormData, onSubmit, isLoading }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = formData.topic && formData.audience && formData.valueProp && formData.niche;

  return (
    <div className="bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-700 shadow-xl backdrop-blur-sm h-fit">
      <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
        <span className="text-indigo-500">Video</span> Details
      </h2>
      
      <div className="space-y-5">
        {/* Niche Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Content Niche</label>
          <div className="relative">
            <select
              name="niche"
              value={formData.niche}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none appearance-none transition-all"
            >
              {Object.values(Niche).map((niche) => (
                <option key={niche} value={niche}>{niche}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {/* Video Topic */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Video Topic</label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            placeholder="e.g. Coding a portfolio website"
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-slate-600"
          />
        </div>

        {/* Target Audience */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Target Audience</label>
          <input
            type="text"
            name="audience"
            value={formData.audience}
            onChange={handleChange}
            placeholder="e.g. Junior developers looking for jobs"
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-slate-600"
          />
        </div>

        {/* Value Prop */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Main Value Proposition</label>
          <textarea
            name="valueProp"
            value={formData.valueProp}
            onChange={handleChange}
            rows={3}
            placeholder="e.g. A fast way to build a site that actually impresses recruiters."
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-slate-600 resize-none"
          />
        </div>

        {/* Current Title */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Current Title (Optional)</label>
          <input
            type="text"
            name="currentTitle"
            value={formData.currentTitle}
            onChange={handleChange}
            placeholder="e.g. How to code a portfolio"
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-slate-600"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={onSubmit}
          disabled={isLoading || !isFormValid}
          className={`w-full mt-4 py-4 px-6 rounded-lg font-bold text-lg tracking-wide shadow-lg transition-all duration-300 transform 
            ${isLoading || !isFormValid 
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-500 text-white hover:scale-[1.02] hover:shadow-indigo-500/25'
            }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Strategizing...
            </span>
          ) : (
            "Generate Viral Titles"
          )}
        </button>
      </div>
    </div>
  );
};

export default InputForm;