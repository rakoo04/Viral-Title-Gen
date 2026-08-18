import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

// A lightweight renderer that handles basic bolding and headers standard in the prompt output
// without needing heavy external dependencies, ensuring 100% functionality in a simple React setup.
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) return null;

  // Split by newlines to handle paragraphs
  const lines = content.split('\n');

  return (
    <div className="space-y-2 text-slate-300 leading-relaxed font-light">
      {lines.map((line, index) => {
        // Handle Headers (Start with **) or specific sections
        const isHeader = line.startsWith('**') && line.endsWith('**') && line.length < 50;
        const isSubSection = line.startsWith('**Option');
        const isWinner = line.includes('RECOMMENDED WINNER');
        
        let className = "min-h-[1.5rem]";
        if (isHeader) className = "text-xl font-bold text-white mt-6 mb-2";
        if (isSubSection) className = "text-lg font-semibold text-sky-400 mt-4";
        if (isWinner) className = "text-lg font-bold text-emerald-400 mt-6 p-4 border border-emerald-500/30 bg-emerald-500/10 rounded-lg";

        // Parse bold syntax **text** within the line
        const parts = line.split(/(\*\*.*?\*\*)/g);

        return (
          <div key={index} className={className}>
            {parts.map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
              }
              return <span key={i}>{part}</span>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default MarkdownRenderer;