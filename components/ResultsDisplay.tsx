import React from 'react';
import MarkdownRenderer from './MarkdownRenderer';

interface ResultsDisplayProps {
  response: string | null;
  error: string | null;
  isLoading: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ response, error, isLoading }) => {
  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-6 text-center">
        <p className="text-red-400 font-medium">Error: {error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 h-full min-h-[400px] flex flex-col items-center justify-center text-center animate-pulse">
         <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-indigo-400 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
         </div>
         <p className="text-slate-400 text-lg">Analyzing 10,000+ viral videos...</p>
         <p className="text-slate-500 text-sm mt-2">Checking pattern matches for your niche</p>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 h-full min-h-[400px] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-slate-700/30 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        </div>
        <h3 className="text-xl font-medium text-white mb-2">Ready to Boost CTR?</h3>
        <p className="text-slate-400 max-w-sm">
          Fill out the details on the left to generate high-performing title variations based on proven psychology.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-700 shadow-xl backdrop-blur-sm relative">
      <div className="absolute top-4 right-4">
        <button 
           onClick={() => navigator.clipboard.writeText(response)}
           className="text-xs font-semibold bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy All
        </button>
      </div>
      <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
        <span className="text-emerald-500">Strategy</span> Report
      </h2>
      <div className="overflow-y-auto max-h-[800px] pr-2 custom-scrollbar">
        <MarkdownRenderer content={response} />
      </div>
    </div>
  );
};

export default ResultsDisplay;