import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';

export const OpenTeenpattiControls: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full bg-[#131B2E] border border-[#1E293B] rounded-b-[10px] p-4 flex items-center justify-between gap-4 select-none">
      {/* BACK navigation trigger */}
      <button
        onClick={handleBack}
        className="px-4 h-[32px] text-[10px] font-bold uppercase tracking-wider bg-[#18233C] hover:bg-[#223050] text-slate-300 hover:text-white border border-[#2B3C60] rounded-[6px] flex items-center gap-1.5 transition-all cursor-pointer focus:outline-none"
        aria-label="Back to previous page"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back</span>
      </button>

      {/* LAY action with light pink semantic cue */}
      <button
        onClick={() => alert('LAY betting mechanics are locked.')}
        className="px-5 h-[32px] text-[10px] font-bold uppercase tracking-wider bg-pink-500/15 hover:bg-pink-500/25 text-pink-400 hover:text-pink-300 border border-pink-500/30 rounded-[6px] flex items-center gap-1.5 transition-all cursor-pointer focus:outline-none"
        aria-label="Lay action"
      >
        <Play className="w-3 h-3 rotate-90" />
        <span>Lay</span>
      </button>
    </div>
  );
};
