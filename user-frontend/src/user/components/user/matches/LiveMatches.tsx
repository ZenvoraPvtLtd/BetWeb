import React from 'react';
import type { Match } from '../../../types/matches';
import { MatchCard } from './MatchCard';
import { Swords } from 'lucide-react';
import { EmptyState } from '../feedback/EmptyState';

interface LiveMatchesProps {
  matches: Match[];
}

export const LiveMatches: React.FC<LiveMatchesProps> = ({ matches }) => {
  return (
    <div className="flex flex-col gap-4 select-none">
      <div className="flex items-center gap-2 mb-1">
        <Swords className="w-4 h-4 text-emerald-500" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#94A3B8]">
          Live Now
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {matches.length > 0 ? (
          matches.map((match) => <MatchCard key={match.id} match={match} />)
        ) : (
          <EmptyState
            title="No live matches available"
            message="Check upcoming matches below for featured fixtures."
          />
        )}
      </div>
    </div>
  );
};
export default LiveMatches;
