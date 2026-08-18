import React from 'react';
import { DemoScoreboard } from './DemoScoreboard';
import { SportStatusBadge } from './SportStatusBadge';
import type { SportEvent, DemoSelection } from '../../types/sports';

interface SportsEventCardProps {
  event: SportEvent;
  selectedSelectionId: string | null;
  onSelect: (selection: DemoSelection, event: SportEvent) => void;
}

export const SportsEventCard: React.FC<SportsEventCardProps> = ({
  event,
  selectedSelectionId,
  onSelect,
}) => {
  return (
    <div className="bg-[#131B2E] border border-[#1E293B] rounded-[10px] p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-[#2D3F66]">
      <div className="flex-1 flex flex-col gap-2 text-left">
        <div className="flex items-center gap-2.5">
          <SportStatusBadge status={event.status} />
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
            {event.startTime}
          </span>
        </div>

        <h3 className="text-sm font-bold text-slate-100 tracking-wide leading-tight">
          {event.name}
        </h3>

        {/* Dynamic Scoreboard */}
        <DemoScoreboard event={event} />
      </div>

      {/* Selections columns */}
      <div className="flex items-center gap-2 shrink-0 select-none">
        {event.status !== 'Completed' ? (
          event.selections.map((sel) => {
            const isSelected = selectedSelectionId === sel.id;
            return (
              <button
                key={sel.id}
                type="button"
                onClick={() => onSelect(sel, event)}
                className={`
                  h-[44px] min-w-[96px] px-3.5 rounded-[8px] border flex flex-col items-center justify-center transition-all cursor-pointer outline-none shadow-sm
                  ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#FF5722] to-[#F97316] border-orange-500 text-white font-bold shadow-md shadow-orange-950/40'
                      : 'bg-[#0E1524] hover:bg-[#18233C] border-[#233252] text-slate-200 hover:text-white hover:border-orange-500/40'
                  }
                  focus-visible:ring-1 focus-visible:ring-orange-500
                `}
              >
                <span className="text-[9px] uppercase font-bold tracking-wider leading-none opacity-80 mb-0.5">
                  {sel.name}
                </span>
                <span className={`text-xs font-extrabold font-mono tracking-wide leading-none ${isSelected ? 'text-white' : 'text-amber-400'}`}>
                  {sel.rate.toFixed(2)}
                </span>
              </button>
            );
          })
        ) : (
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono px-3">
            Closed
          </div>
        )}
      </div>
    </div>
  );
};
