import React from 'react';
import { SportsEventCard } from './SportsEventCard';
import { Trophy } from 'lucide-react';
import type { SportEvent, DemoSelection } from '../../types/sports';

interface SportsEventListProps {
  events: SportEvent[];
  selectedSelection: { eventId: string; selectionId: string } | null;
  onSelect: (selection: DemoSelection, event: SportEvent) => void;
}

export const SportsEventList: React.FC<SportsEventListProps> = ({
  events,
  selectedSelection,
  onSelect,
}) => {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white border border-zinc-200 rounded-[8px] min-h-[280px] text-center shadow-sm select-none">
        <Trophy className="w-10 h-10 text-zinc-300 mb-3" />
        <h3 className="text-sm font-semibold text-zinc-700">No Demo Events</h3>
        <p className="text-xs text-zinc-500 mt-1">No demo events available for this sport.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {events.map((event) => {
        const isEventSelected = selectedSelection?.eventId === event.id;
        return (
          <SportsEventCard
            key={event.id}
            event={event}
            selectedSelectionId={isEventSelected ? selectedSelection.selectionId : null}
            onSelect={onSelect}
          />
        );
      })}
    </div>
  );
};
