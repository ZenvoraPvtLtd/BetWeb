import React, { useState, useEffect } from 'react';
import { useBetSlip } from '../../../context/BetSlipContext';
import { X, Receipt, CheckCircle } from 'lucide-react';

export const BetSlip: React.FC = () => {
  const { activeSelection, clearSelection, placeBet } = useBetSlip();
  const [stake, setStake] = useState<number>(100);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (activeSelection) {
      setShowSuccess(false);
    }
  }, [activeSelection]);

  if (!activeSelection && !showSuccess) return null;

  const oddsNum = parseFloat(activeSelection?.odds || '1.90') || 1.0;
  const potentialReturn = Math.round(stake * oddsNum);

  const handlePlaceBet = () => {
    if (stake <= 0) return;
    const success = placeBet(stake);
    if (success) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  };

  const stakeOptions = [100, 500, 1000, 5000, 10000];

  const slipContent = (
    <div className="w-full bg-[#111F30] border border-slate-700/15 rounded-[12px] overflow-hidden flex flex-col shadow-xl select-none text-left">
      <div className="bg-[#0D1B2A] px-4 py-3 border-b border-zinc-800/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Receipt className="w-4 h-4 text-[#0EA5E9]" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Bet Slip</h4>
        </div>
        <button
          onClick={clearSelection}
          className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer outline-none"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Match / Game title */}
        <div>
          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block">
            {activeSelection?.marketName}
          </span>
          <h5 className="text-xs font-extrabold text-white mt-1">
            {activeSelection?.teams || activeSelection?.gameTitle}
          </h5>
        </div>

        {/* Selection / Odds type indicator */}
        <div className="flex items-center justify-between p-3 bg-zinc-900/40 border border-zinc-850 rounded-[8px]">
          <div>
            <span className="text-xs font-extrabold text-white">{activeSelection?.selectionName}</span>
            <span className="text-[10px] text-zinc-400 block font-semibold mt-0.5">Mock Outcome</span>
          </div>
          <span
            className={`
              px-2.5 py-1 rounded-[4px] text-[10px] font-extrabold tracking-wider
              ${
                activeSelection?.type === 'BACK'
                  ? 'bg-[#0EA5E9]/10 text-[#0EA5E9] border border-[#0EA5E9]/20'
                  : 'bg-[#F43F5E]/10 text-[#F43F5E] border border-[#F43F5E]/20'
              }
            `}
          >
            {activeSelection?.type}
          </span>
        </div>

        {/* Odds & Stake Inputs */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">Odds</label>
            <input
              type="text"
              readOnly
              value={activeSelection?.odds}
              className="h-9 px-3 bg-zinc-900/60 border border-zinc-800 rounded-[8px] text-xs font-bold text-white outline-none cursor-not-allowed select-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">Stake (₹)</label>
            <input
              type="number"
              value={stake}
              onChange={(e) => setStake(Math.max(0, parseInt(e.target.value) || 0))}
              className="h-9 px-3 bg-zinc-900 border border-zinc-850 rounded-[8px] text-xs font-bold text-white outline-none focus:border-[#0EA5E9] transition-colors"
            />
          </div>
        </div>

        {/* Quick Stakes Options */}
        <div className="flex flex-wrap gap-1.5">
          {stakeOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setStake((prev) => prev + opt)}
              className="h-7 px-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-[6px] text-[10px] font-bold transition-all cursor-pointer outline-none"
            >
              +{opt}
            </button>
          ))}
        </div>

        {/* Calculator Return Panel */}
        <div className="p-3 bg-zinc-950/20 border border-zinc-900 rounded-[8px] flex items-center justify-between text-xs">
          <span className="font-semibold text-zinc-400">Potential Return</span>
          <span className="font-extrabold text-emerald-400">₹{potentialReturn.toLocaleString()}</span>
        </div>

        {/* Submit Mock Bet Button */}
        <button
          onClick={handlePlaceBet}
          className="w-full h-10 rounded-[8px] bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer outline-none shadow-md shadow-emerald-500/10"
        >
          Place Mock Bet
        </button>
      </div>
    </div>
  );

  const successContent = (
    <div className="w-full bg-[#111F30] border border-[#22C55E]/30 rounded-[12px] p-5 flex flex-col items-center justify-center text-center shadow-lg animate-fadeIn select-none text-left">
      <CheckCircle className="w-10 h-10 text-emerald-500 mb-3 animate-bounce" />
      <h4 className="text-sm font-bold text-white uppercase tracking-wider">Mock Bet Placed!</h4>
      <p className="text-xs text-zinc-400 mt-1 font-semibold">
        Your bet has been registered inside the "My Bets" section.
      </p>
    </div>
  );

  return (
    <>
      {/* Desktop view: Absolute side column */}
      <div className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-20 flex flex-col gap-4">
          {showSuccess ? successContent : slipContent}
        </div>
      </div>

      {/* Mobile/Tablet view: Bottom slide drawer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] px-4 pb-4 pointer-events-none select-none">
        <div className="max-w-md mx-auto pointer-events-auto shadow-2xl animate-slideUp">
          {showSuccess ? successContent : slipContent}
        </div>
      </div>
    </>
  );
};
export default BetSlip;
