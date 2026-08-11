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
    <div className="bg-white border border-zinc-200 rounded-[8px] p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-zinc-300">
      <div className="flex-1 flex flex-col gap-2 text-left">
        <div className="flex items-center gap-2.5">
          <SportStatusBadge status={event.status} />
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider font-mono">
            {event.startTime}
          </span>
        </div>

        <h3 className="text-sm font-bold text-zinc-800 tracking-wide leading-tight">
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
                  h-[42px] min-w-[96px] px-3.5 rounded-[6px] border flex flex-col items-center justify-center transition-all cursor-pointer outline-none
                  ${
                    isSelected
                      ? 'bg-indigo-650 border-indigo-650 text-white font-bold shadow-sm'
                      : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-700 hover:text-zinc-900'
                  }
                  focus-visible:ring-1 focus-visible:ring-indigo-500
                `}
              >
                <span className="text-[9px] uppercase font-bold tracking-wider leading-none opacity-80 mb-0.5">
                  {sel.name}
                </span>
                <span className="text-xs font-extrabold font-mono tracking-wide leading-none">
                  {sel.rate.toFixed(2)}
                </span>
              </button>
            );
          })
        ) : (
          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono px-3">
            Closed
          </div>
        )}
      </div>
    </div>
  );
};
