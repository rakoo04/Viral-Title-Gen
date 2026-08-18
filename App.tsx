import React, { useState } from 'react';
import { FormData, Niche, GenerationState } from './types';
import InputForm from './components/InputForm';
import ResultsDisplay from './components/ResultsDisplay';
import { generateTitles } from './services/geminiService';

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    audience: '',
    valueProp: '',
    niche: Niche.Educational,
    currentTitle: '',
  });

  const [state, setState] = useState<GenerationState>({
    isLoading: false,
    response: null,
    error: null,
  });

  const handleGenerate = async () => {
    setState({ isLoading: true, response: null, error: null });
    
    try {
      const result = await generateTitles(formData);
      setState({ isLoading: false, response: result, error: null });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      setState({ isLoading: false, response: null, error: errorMessage });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-50 selection:bg-indigo-500 selection:text-white pb-20">
      {/* Navbar */}
      <nav className="w-full border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                 <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
               </svg>
             </div>
             <span className="font-bold text-lg tracking-tight">Viral<span className="text-indigo-400">Title</span>Gen</span>
          </div>
          <div className="text-xs font-mono text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50">
            Powered by Gemini 2.5
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="text-center mb-12">
           <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
             Stop Writing <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Boring Titles</span>
           </h1>
           <p className="text-lg text-slate-400 max-w-2xl mx-auto">
             Transform descriptive titles into high-CTR click magnets using elite growth strategies and psychological triggers.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Inputs */}
          <div className="lg:sticky lg:top-24">
             <InputForm 
                formData={formData} 
                setFormData={setFormData} 
                onSubmit={handleGenerate} 
                isLoading={state.isLoading}
             />
             
             {/* Methodology Badge */}
             <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                  <div className="text-2xl font-bold text-indigo-400 mb-1">3.5x</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">CTR Lift</div>
                </div>
                <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                  <div className="text-2xl font-bold text-purple-400 mb-1">7</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Viral Patterns</div>
                </div>
                <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                  <div className="text-2xl font-bold text-emerald-400 mb-1">5+</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Quality Checks</div>
                </div>
             </div>
          </div>

          {/* Right Column: Results */}
          <div>
            <ResultsDisplay 
               response={state.response} 
               error={state.error} 
               isLoading={state.isLoading} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;