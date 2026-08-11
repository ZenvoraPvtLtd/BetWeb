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
      <div className="bg-white border border-zinc-200 rounded-[8px] p-5 shadow-sm min-h-[220px] flex flex-col items-center justify-center text-center select-none font-sans">
        <ShieldAlert className="w-8 h-8 text-zinc-350 mb-3" />
        <h3 className="text-xs font-semibold text-zinc-700">Empty Selection Slip</h3>
        <p className="text-[10px] text-zinc-400 max-w-[180px] mt-1 leading-relaxed">
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
    <div className="bg-white border border-zinc-200 rounded-[8px] p-4 shadow-sm text-left select-none flex flex-col gap-4 font-sans animate-fadeIn">
      {/* Title */}
      <div className="border-b border-zinc-150 pb-2.5 flex items-center justify-between">
        <h3 className="text-xs font-bold text-zinc-800 uppercase tracking-wider font-mono">
          Demo Selection Slip
        </h3>
        <button
          type="button"
          onClick={onClear}
          className="text-zinc-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-zinc-50 cursor-pointer focus:outline-none"
          title="Clear all"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Selected target info */}
      <div className="flex flex-col gap-1.5 p-3 bg-zinc-50 border border-zinc-200/60 rounded-[6px]">
        <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider leading-none">
          {selectedEvent.name}
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs font-bold text-zinc-800">{selectedSelection.name}</span>
          <span className="text-xs font-mono font-extrabold text-indigo-650 bg-indigo-50 border border-indigo-100 rounded px-1.5 py-0.5">
            {selectedSelection.rate.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Points input form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="points"
            className="text-[10px] font-bold text-zinc-650 uppercase tracking-wider font-mono"
          >
            Demo Points *
          </label>
          <div className="relative flex items-center">
            <input
              id="points"
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              value={points}
              onChange={handlePointsChange}
              className={`w-full px-3 h-[38px] rounded-[6px] border text-xs font-bold font-mono text-zinc-800 bg-zinc-50/20 focus:outline-none focus:ring-1 focus:bg-white placeholder-zinc-400
                ${
                  error
                    ? 'border-red-400 focus:ring-red-400'
                    : 'border-zinc-250 focus:border-indigo-500 focus:ring-indigo-500'
                }
              `}
            />
          </div>
          {error && (
            <span className="text-[10px] text-red-500 flex items-center gap-1 mt-0.5 leading-none">
              <AlertCircle className="w-3 h-3 shrink-0" />
              {error}
            </span>
          )}
        </div>

        {/* Quick add triggers */}
        <div className="grid grid-cols-4 gap-1.5">
          {[100, 500, 1000, 5000].map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => handleQuickAdd(amt)}
              className="py-1 px-1 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded text-[10px] font-bold font-mono text-zinc-600 cursor-pointer focus:outline-none"
            >
              +{amt}
            </button>
          ))}
        </div>

        {/* Calculations */}
        <div className="flex justify-between items-center text-[11px] font-bold font-mono border-t border-zinc-150 pt-2.5 text-zinc-500 leading-none">
          <span>Virtual Return</span>
          <span className="text-zinc-800">
            {possiblePayout.toLocaleString(undefined, {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}{' '}
            Pts
          </span>
        </div>

        {/* Action button triggers */}
        <div className="flex flex-col gap-2 mt-1">
          <button
            type="submit"
            className="w-full h-[38px] rounded-[6px] text-xs font-bold uppercase tracking-wider bg-indigo-650 hover:bg-indigo-750 text-white transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            Add Demo Selection
          </button>
          <button
            type="button"
            onClick={onClear}
            className="w-full h-[34px] rounded-[6px] text-xs font-bold uppercase tracking-wider border border-zinc-250 hover:bg-zinc-50 text-zinc-600 transition-colors cursor-pointer focus:outline-none"
          >
            Remove
          </button>
        </div>
      </form>
    </div>
  );
};
