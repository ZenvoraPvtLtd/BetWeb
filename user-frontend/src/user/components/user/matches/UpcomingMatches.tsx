import React from 'react';
import type { Match } from '../../../types/matches';
import { MatchCard } from './MatchCard';
import { Calendar } from 'lucide-react';
import { EmptyState } from '../feedback/EmptyState';

interface UpcomingMatchesProps {
  matches: Match[];
}

export const UpcomingMatches: React.FC<UpcomingMatchesProps> = ({ matches }) => {
  return (
    <div className="flex flex-col gap-4 select-none">
      <div className="flex items-center gap-2 mb-1">
        <Calendar className="w-4 h-4 text-orange-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 font-mono">
          Upcoming Matches
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {matches.length > 0 ? (
          matches.map((match) => <MatchCard key={match.id} match={match} />)
        ) : (
          <EmptyState
            title="No upcoming matches available"
            message="Check back later for newly scheduled exchanges."
          />
        )}
      </div>
    </div>
  );
};
export default UpcomingMatches;
