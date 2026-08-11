import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';

export const OpenTeenpattiControls: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full bg-zinc-900 border border-zinc-850 rounded-b-[8px] p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5 select-none">
      {/* Back (Min: Max:) control block */}
      <button
        onClick={handleBack}
        className="flex-1 px-4 h-[40px] text-[10px] font-bold uppercase tracking-wider bg-zinc-850 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-750 hover:border-zinc-700 rounded-[4px] flex items-center justify-center gap-2 transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-zinc-700"
        aria-label="Back to previous page"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back (Min: Max: )</span>
      </button>

      {/* Min: Max: separate control block */}
      <button
        onClick={() => alert('Min/Max betting limits details are pending confirmation.')}
        className="flex-1 px-4 h-[40px] text-[10px] font-bold uppercase tracking-wider bg-zinc-950 text-zinc-400 border border-zinc-900 rounded-[4px] flex items-center justify-center gap-2 transition-all cursor-not-allowed opacity-75"
        aria-label="Bet limits info"
        disabled
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
        <span>Min: Max: </span>
      </button>
    </div>
  );
};
