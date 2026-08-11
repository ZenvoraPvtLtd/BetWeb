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
    <div className="w-full bg-zinc-900 border border-zinc-850 rounded-b-[8px] p-4 flex flex-col gap-4 select-none">
      {/* Top action row */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => alert('Information deck is pending further instructions.')}
          className="w-8 h-8 rounded-full bg-zinc-850 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-750 flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-zinc-700"
          aria-label="Game Info"
        >
          <Info className="w-4 h-4" />
        </button>

        <button
          onClick={handleBack}
          className="px-4 h-[32px] text-[10px] font-bold uppercase tracking-wider bg-zinc-850 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-750 hover:border-zinc-700 rounded-[4px] flex items-center gap-1.5 transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-zinc-700"
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
