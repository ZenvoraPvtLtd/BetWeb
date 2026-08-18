import React, { useState } from 'react';
import { AlertCircle, Trash2, ShieldAlert } from 'lucide-react';
import type { SportEvent, DemoSelection } from '../../types/sports';

interface DemoSelectionSlipProps {
  selectedEvent: SportEvent | null;
  selectedSelection: DemoSelection | null;
  onClear: () => void;
  onSubmit: (points: number) => void;
  balance: number;
}

export const DemoSelectionSlip: React.FC<DemoSelectionSlipProps> = ({
  selectedEvent,
  selectedSelection,
  onClear,
  onSubmit,
  balance,
}) => {
  const [points, setPoints] = useState<string>('100');
  const [error, setError] = useState<string | null>(null);

  if (!selectedEvent || !selectedSelection) {
    return (
      <div className="bg-[#131B2E] border border-[#1E293B] rounded-[10px] p-5 shadow-xl min-h-[220px] flex flex-col items-center justify-center text-center select-none font-sans">
        <ShieldAlert className="w-8 h-8 text-slate-500 mb-3" />
        <h3 className="text-xs font-semibold text-slate-300">Empty Selection Slip</h3>
        <p className="text-[10px] text-slate-400 max-w-[180px] mt-1 leading-relaxed">
          Select any live or upcoming demo rate to fill the selection slip.
        </p>
      </div>
    );
  }

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^[0-9\b]+$/.test(val)) {
      setPoints(val);
      setError(null);
    }
  };

  const handleQuickAdd = (amount: number) => {
    const currentVal = parseInt(points || '0', 10);
    setPoints((currentVal + amount).toString());
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericPoints = parseInt(points, 10);

    if (isNaN(numericPoints) || numericPoints <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    if (numericPoints > balance) {
      setError('Insufficient Demo Points balance.');
      return;
    }

    onSubmit(numericPoints);
    setError(null);
  };

  const possiblePayout = parseInt(points || '0', 10) * selectedSelection.rate;

  return (
    <div className="bg-[#131B2E] border border-[#1E293B] rounded-[10px] p-4 shadow-xl text-left select-none flex flex-col gap-4 font-sans animate-fadeIn">
      {/* Title */}
      <div className="border-b border-[#1E293B] pb-2.5 flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider font-mono">
          Demo Selection Slip
        </h3>
        <button
          type="button"
          onClick={onClear}
          className="text-slate-400 hover:text-red-400 transition-colors p-1 rounded hover:bg-[#18233C] cursor-pointer focus:outline-none"
          title="Clear all"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Selected target info */}
      <div className="flex flex-col gap-1.5 p-3 bg-[#0E1524] border border-[#233252] rounded-[8px]">
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none">
          {selectedEvent.name}
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs font-bold text-slate-100">{selectedSelection.name}</span>
          <span className="text-xs font-mono font-extrabold text-amber-400 bg-amber-500/15 border border-amber-500/30 rounded px-2 py-0.5">
            {selectedSelection.rate.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Points input form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        <div className="flex flex-col text-left">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-1.5">
            Stake Points
          </label>
          <input
            type="text"
            value={points}
            onChange={handlePointsChange}
            placeholder="0"
            className="w-full h-[38px] px-3 bg-[#090E17] border border-[#233252] rounded-[8px] text-xs font-mono font-bold text-slate-100 focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Quick add pill buttons */}
        <div className="grid grid-cols-4 gap-1.5">
          {[100, 500, 1000, 5000].map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => handleQuickAdd(amt)}
              className="py-1 bg-[#18233C] hover:bg-[#223050] text-slate-300 border border-[#2B3C60] rounded-[6px] text-[10px] font-mono font-bold transition-all cursor-pointer"
            >
              +{amt}
            </button>
          ))}
        </div>

        {/* Possible Payout Summary */}
        <div className="p-2.5 bg-[#0E1524] rounded-[8px] border border-[#233252] flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 font-semibold">Potential Payout:</span>
          <span className="text-emerald-400 font-bold">
            {isNaN(possiblePayout) ? '0' : possiblePayout.toFixed(2)} Pts
          </span>
        </div>

        {error && (
          <div className="flex items-center gap-1.5 text-red-400 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full h-[40px] bg-gradient-to-r from-[#FF5722] to-[#F97316] hover:from-[#F4511E] hover:to-[#EA580C] text-white font-bold text-xs rounded-[8px] shadow-md shadow-orange-950/40 transition-all cursor-pointer active:scale-98"
        >
          Place Demo Bet
        </button>
      </form>
    </div>
  );
};
