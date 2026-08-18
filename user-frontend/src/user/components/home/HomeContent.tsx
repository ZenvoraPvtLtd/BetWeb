import React from 'react';
import { Play, Flame, Swords, Calendar } from 'lucide-react';

export const HomeContent: React.FC = () => {
  const matches = [
    {
      id: 1,
      sport: 'Cricket',
      teams: 'India vs Australia',
      status: 'Live',
      score: '172/2 (16.2 ov)',
      back: '1.45',
      lay: '1.47',
    },
    {
      id: 2,
      sport: 'Tennis',
      teams: 'Carlos Alcaraz vs Novak Djokovic',
      status: 'Live',
      score: '6-4, 3-2',
      back: '2.10',
      lay: '2.12',
    },
    {
      id: 3,
      sport: 'Soccer',
      teams: 'Real Madrid vs Barcelona',
      status: 'Upcoming',
      score: 'Starts at 18:30',
      back: '1.95',
      lay: '1.98',
    },
  ];

  return (
    <div className="flex-1 flex flex-col gap-6 overflow-y-auto p-4 md:p-6 scrollbar-thin select-none">
      {/* Upper Tabs Strip */}
      <div className="flex items-center gap-4 border-b border-[#1E293B] pb-3 shrink-0">
        <button className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-400 border-b-2 border-orange-500 pb-1 cursor-pointer outline-none font-mono">
          <Flame className="w-3.5 h-3.5" />
          <span>In-Play</span>
        </button>
        <button className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white pb-1 cursor-pointer outline-none font-mono">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>Upcoming</span>
        </button>
      </div>

      {/* Live Event Cards list */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-300 mb-1 flex items-center gap-1.5 font-mono">
          <Swords className="w-4 h-4 text-orange-400" />
          <span>Featured Exchanges</span>
        </h3>

        <div className="flex flex-col gap-2.5">
          {matches.map((match) => (
            <div
              key={match.id}
              className="bg-[#131B2E] border border-[#1E293B] rounded-[10px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-orange-500/40 transition-all shadow-md"
            >
              {/* Event Info */}
              <div className="flex flex-col gap-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-[4px] font-mono">
                    {match.sport}
                  </span>
                  {match.status === 'Live' && (
                    <span className="flex items-center gap-1 font-mono text-[9px] text-red-400 font-bold uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-live-pulse" />
                      LIVE
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-slate-100">{match.teams}</h4>
                <p className="text-xs text-slate-400 font-medium font-mono">{match.score}</p>
              </div>

              {/* Action Odds */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <div className="flex flex-col items-center">
                  <button className="w-14 h-9 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 rounded-[6px] font-extrabold text-xs transition-colors flex items-center justify-center cursor-pointer outline-none font-mono">
                    {match.back}
                  </button>
                  <span className="text-[9px] text-slate-400 mt-1 uppercase font-bold font-mono">Back</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-14 h-9 bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/30 rounded-[6px] font-extrabold text-xs transition-colors flex items-center justify-center cursor-pointer outline-none font-mono">
                    {match.lay}
                  </button>
                  <span className="text-[9px] text-slate-400 mt-1 uppercase font-bold font-mono">Lay</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promotional / Games category grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 shrink-0">
        {/* Card 1 */}
        <div className="relative h-28 rounded-[10px] bg-[#131B2E] border border-[#1E293B] p-5 flex items-center justify-between overflow-hidden hover:border-orange-500/40 transition-all group shadow-md">
          <div className="flex flex-col text-left">
            <span className="text-[9px] font-bold uppercase tracking-wider text-orange-400 font-mono">Live Casino</span>
            <h4 className="text-sm font-extrabold text-slate-100 mt-1 uppercase">Dealer Lobby</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Explore standard live dealer virtual card games.</p>
          </div>
          <button className="w-9 h-9 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer outline-none">
            <Play className="w-4 h-4 fill-orange-400" />
          </button>
        </div>

        {/* Card 2 */}
        <div className="relative h-28 rounded-[10px] bg-[#131B2E] border border-[#1E293B] p-5 flex items-center justify-between overflow-hidden hover:border-amber-500/40 transition-all group shadow-md">
          <div className="flex flex-col text-left">
            <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400 font-mono">Lottery</span>
            <h4 className="text-sm font-extrabold text-slate-100 mt-1 uppercase">Draw Cards</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Participate in automated lucky numbers draws.</p>
          </div>
          <button className="w-9 h-9 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer outline-none">
            <Play className="w-4 h-4 fill-amber-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
