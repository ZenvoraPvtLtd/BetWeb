import React from 'react';
import { SportsEventCard } from './SportsEventCard';
import { Trophy } from 'lucide-react';
import type { SportEvent, DemoSelection } from '../../types/sports';

interface SportsEventListProps {
  events: SportEvent[];
  selectedSelectionId: string | null;
  onSelect: (selection: DemoSelection, event: SportEvent) => void;
}

export const SportsEventList: React.FC<SportsEventListProps> = ({
  events,
  selectedSelectionId,
  onSelect,
}) => {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-[#131B2E] border border-[#1E293B] rounded-[10px] min-h-[280px] text-center shadow-xl select-none">
        <Trophy className="w-10 h-10 text-slate-500 mb-3" />
        <h3 className="text-sm font-bold text-slate-200">No Demo Events</h3>
        <p className="text-xs text-slate-400 mt-1">No demo events available for this sport.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {events.map((event) => {
        return (
          <SportsEventCard
            key={event.id}
            event={event}
            selectedSelectionId={selectedSelectionId}
            onSelect={onSelect}
          />
        );
      })}
    </div>
  );
};
