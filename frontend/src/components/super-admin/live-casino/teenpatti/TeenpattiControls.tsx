import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, ArrowLeft } from 'lucide-react';
import { LockedBetControl } from './LockedBetControl';

export const TeenpattiControls: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full bg-[#131B2E] border border-[#1E293B] rounded-b-[10px] p-4 flex flex-col gap-4 select-none">
      {/* Top action row */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => alert('Information deck is pending further instructions.')}
          className="w-8 h-8 rounded-full bg-[#18233C] hover:bg-[#223050] text-slate-400 hover:text-white border border-[#2B3C60] flex items-center justify-center transition-colors cursor-pointer focus:outline-none"
          aria-label="Game Info"
        >
          <Info className="w-4 h-4" />
        </button>

        <button
          onClick={handleBack}
          className="px-4 h-[32px] text-[10px] font-bold uppercase tracking-wider bg-[#18233C] hover:bg-[#223050] text-slate-300 hover:text-white border border-[#2B3C60] rounded-[6px] flex items-center gap-1.5 transition-all cursor-pointer focus:outline-none"
          aria-label="Back to previous page"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </div>

      {/* Grid containing locked controls columns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <LockedBetControl title="Player A" subtitle="Back 1.95" />
        <LockedBetControl title="Player B" subtitle="Back 1.95" />
        <LockedBetControl title="Pair Plus A" subtitle="Payout up to 1:45" />
        <LockedBetControl title="Pair Plus B" subtitle="Payout up to 1:45" />
      </div>
    </div>
  );
};
