import React from 'react';

interface TeenpattiGameHeaderProps {
  onRulesClick?: () => void;
}

export const TeenpattiGameHeader: React.FC<TeenpattiGameHeaderProps> = ({ onRulesClick }) => {
  return (
    <div className="flex items-center justify-between bg-[#0E1524] border border-[#1E293B] rounded-t-[10px] p-3.5 text-white select-none">
      {/* Left RULES action toggle */}
      <button
        onClick={onRulesClick}
        className="px-3.5 h-[28px] text-[10px] font-bold uppercase tracking-wider bg-[#18233C] hover:bg-[#223050] hover:text-white text-orange-400 border border-[#2B3C60] rounded-[6px] transition-all cursor-pointer focus:outline-none"
      >
        Rules
      </button>

      {/* Right round metrics placeholders */}
      <div className="flex items-center gap-4 text-[10px] font-semibold text-slate-400 font-mono">
        <div>
          Round ID: <span className="text-slate-200">—</span>
        </div>
        <div className="h-3 w-[1px] bg-[#1E293B]" />
        <div>
          Min: <span className="text-amber-400">—</span>
        </div>
        <div className="h-3 w-[1px] bg-[#1E293B]" />
        <div>
          Max: <span className="text-amber-400">—</span>
        </div>
      </div>
    </div>
  );
};
