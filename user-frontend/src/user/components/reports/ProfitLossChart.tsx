import React from 'react';
import type { ProfitLossEntry } from '../../types/reports';

interface ProfitLossChartProps {
  entries: ProfitLossEntry[];
}

export const ProfitLossChart: React.FC<ProfitLossChartProps> = ({ entries }) => {
  const maxVal = Math.max(...entries.map(e => Math.abs(e.netPL)), 100);

  return (
    <div className="bg-[#131B2E] border border-[#1E293B] rounded-[12px] p-5 flex flex-col gap-4 select-none text-left w-full shadow-md font-sans">
      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1 font-mono">
        Breakdown by Category
      </h3>

      <div className="flex flex-col gap-4">
        {entries.map((entry) => {
          const isPositive = entry.netPL >= 0;
          const percentage = Math.min(100, Math.round((Math.abs(entry.netPL) / maxVal) * 100));

          return (
            <div key={entry.category} className="flex flex-col gap-1.5 font-mono">
              {/* Labels row */}
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-100 uppercase tracking-wide">{entry.category}</span>
                <span className={isPositive ? 'text-emerald-400' : 'text-rose-400'}>
                  {isPositive ? '+' : ''}₹{entry.netPL.toLocaleString()}
                </span>
              </div>

              {/* Progress bar container */}
              <div className="w-full h-2 bg-[#090E17] rounded-full overflow-hidden flex relative">
                <div
                  style={{
                    width: `${percentage}%`,
                    marginLeft: isPositive ? '50%' : 'auto',
                    marginRight: isPositive ? 'auto' : '50%'
                  }}
                  className={`h-full rounded-full transition-all duration-500 ${isPositive ? 'bg-emerald-500' : 'bg-rose-500'}`}
                />
                {/* Center marker line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#233252]" />
              </div>

              {/* Meta stats */}
              <div className="flex items-center justify-between text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                <span>Staked: ₹{entry.stake.toLocaleString()}</span>
                <span>
                  Gain: ₹{entry.profit.toLocaleString()} | Loss: ₹{entry.loss.toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ProfitLossChart;
