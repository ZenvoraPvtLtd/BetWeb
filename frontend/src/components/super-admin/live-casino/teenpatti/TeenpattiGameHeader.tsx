import React from 'react';

interface TeenpattiGameHeaderProps {
  onRulesClick?: () => void;
}

export const TeenpattiGameHeader: React.FC<TeenpattiGameHeaderProps> = ({ onRulesClick }) => {
  return (
    <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-t-[8px] p-3 text-white select-none">
      {/* Left RULES action toggle */}
      <button
        onClick={onRulesClick}
        className="px-3.5 h-[28px] text-[10px] font-bold uppercase tracking-wider bg-zinc-850 hover:bg-zinc-800 hover:text-white text-zinc-300 border border-zinc-750 hover:border-zinc-700 rounded-[4px] transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-zinc-700"
      >
        Rules
      </button>

      {/* Right round metrics placeholders */}
      <div className="flex items-center gap-4 text-[10px] font-semibold text-zinc-400 font-mono">
        <div>
          Round ID: <span className="text-white">—</span>
        </div>
        <div className="h-3 w-[1px] bg-zinc-800" />
        <div>
          Min: <span className="text-white">—</span>
        </div>
        <div className="h-3 w-[1px] bg-zinc-800" />
        <div>
          Max: <span className="text-white">—</span>
        </div>
      </div>
    </div>
  );
};
