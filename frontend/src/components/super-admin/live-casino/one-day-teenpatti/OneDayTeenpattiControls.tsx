import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';

export const OneDayTeenpattiControls: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full bg-zinc-900 border border-zinc-850 rounded-b-[8px] p-4 flex items-center justify-between gap-4 select-none">
      {/* BACK navigation trigger */}
      <button
        onClick={handleBack}
        className="px-4 h-[32px] text-[10px] font-bold uppercase tracking-wider bg-zinc-850 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-750 hover:border-zinc-700 rounded-[4px] flex items-center gap-1.5 transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-zinc-700"
        aria-label="Back to previous page"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back</span>
      </button>

      {/* LAY action with light pink semantic cue */}
      <button
        onClick={() => alert('LAY betting mechanics are locked.')}
        className="px-5 h-[32px] text-[10px] font-bold uppercase tracking-wider bg-pink-100/10 hover:bg-pink-100/15 text-pink-400 hover:text-pink-300 border border-pink-400/20 hover:border-pink-400/30 rounded-[4px] flex items-center gap-1.5 transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-pink-700"
        aria-label="Lay action"
      >
        <Play className="w-3 h-3 rotate-90" />
        <span>Lay</span>
      </button>
    </div>
  );
};
