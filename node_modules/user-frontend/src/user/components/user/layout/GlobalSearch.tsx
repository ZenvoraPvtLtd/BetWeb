import React, { useState, useEffect, useRef } from 'react';
import { Search, Trophy, Sparkles, X } from 'lucide-react';
import { userMatches } from '../../../data/matches';
import { casinoGames } from '../../../data/casinoGames';
import type { Match } from '../../../types/matches';
import type { Game } from '../../../types/games';

export const GlobalSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileActive, setIsMobileActive] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setIsMobileActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelectResult = () => {
    setQuery('');
    setIsOpen(false);
    setIsMobileActive(false);
  };

  const filteredMatches = query.trim()
    ? userMatches.filter(
        (m: Match) =>
          m.teams.toLowerCase().includes(query.toLowerCase()) ||
          (m.competition || '').toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredGames = query.trim()
    ? casinoGames.filter((g: Game) => g.title.toLowerCase().includes(query.toLowerCase()))
    : [];

  const suggestedMatches = userMatches.slice(0, 2);
  const suggestedGames = casinoGames.slice(0, 3);

  const searchResultsBody = (
    <div className="absolute left-0 right-0 mt-2 bg-[#111F30] border border-slate-700/15 rounded-[12px] shadow-2xl overflow-hidden z-[100] p-4 flex flex-col gap-4 text-left select-none max-h-[380px] overflow-y-auto scrollbar-thin animate-slideDown">
      {query.trim() === '' ? (
        <>
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-extrabold uppercase text-zinc-550 tracking-widest flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-[#0EA5E9]" />
              <span>Suggested Live Matches</span>
            </span>
            <div className="flex flex-col gap-1.5 mt-1">
              {suggestedMatches.map((m: Match) => (
                <a
                  key={m.id}
                  href={`/match/${m.id}`}
                  onClick={handleSelectResult}
                  className="flex flex-col justify-center px-3 py-2 rounded-[8px] bg-zinc-950/20 hover:bg-[#16283D] border border-slate-700/5 hover:border-zinc-800 transition-all"
                >
                  <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider">
                    {m.sport} • {m.competition}
                  </span>
                  <span className="text-xs font-extrabold text-white mt-1 uppercase tracking-wide">
                    {m.teams}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-extrabold uppercase text-zinc-550 tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Popular Casino Games</span>
            </span>
            <div className="flex flex-col gap-1.5 mt-1">
              {suggestedGames.map((g: Game) => (
                <a
                  key={g.id}
                  href={`/games/teenpatti/${g.title.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={handleSelectResult}
                  className="flex items-center justify-between px-3 py-2 rounded-[8px] bg-zinc-950/20 hover:bg-[#16283D] border border-slate-700/5 hover:border-zinc-800 transition-all text-xs font-bold text-white uppercase tracking-wide"
                >
                  <span>{g.title}</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                    {g.category}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {filteredMatches.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-extrabold uppercase text-[#0EA5E9] tracking-widest">
                Matches ({filteredMatches.length})
              </span>
              <div className="flex flex-col gap-1.5">
                {filteredMatches.map((m: Match) => (
                  <a
                    key={m.id}
                    href={`/match/${m.id}`}
                    onClick={handleSelectResult}
                    className="flex flex-col justify-center px-3 py-2 rounded-[8px] bg-zinc-950/25 hover:bg-[#16283D] border border-slate-700/5 transition-colors"
                  >
                    <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
                      {m.competition}
                    </span>
                    <span className="text-xs font-extrabold text-white mt-1 uppercase">
                      {m.teams}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {filteredGames.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-extrabold uppercase text-emerald-400 tracking-widest">
                Casino Games ({filteredGames.length})
              </span>
              <div className="flex flex-col gap-1.5">
                {filteredGames.map((g) => (
                  <a
                    key={g.id}
                    href={`/games/teenpatti/${g.title.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={handleSelectResult}
                    className="flex items-center justify-between px-3 py-2 rounded-[8px] bg-zinc-950/25 hover:bg-[#16283D] border border-slate-700/5 transition-colors text-xs font-bold text-white uppercase"
                  >
                    <span>{g.title}</span>
                    <span className="text-[8px] px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                      {g.category}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {filteredMatches.length === 0 && filteredGames.length === 0 && (
            <div className="py-8 text-center text-[10px] uppercase font-bold text-zinc-550 tracking-wider">
              No matches or games found
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <div ref={searchRef} className="relative select-none text-left">
      <div className="hidden md:block relative w-64 lg:w-80">
        <input
          placeholder="Search matches, sports or casino..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full h-9 pl-9 pr-8 bg-[#111F30] border border-slate-700/15 rounded-[8px] text-xs font-bold text-white placeholder-zinc-550 outline-none focus:border-[#0EA5E9]"
        />
        <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
            aria-label="Clear Search Input"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {isOpen && searchResultsBody}
      </div>

      <div className="md:hidden">
        <button
          onClick={() => {
            setIsMobileActive(true);
            setIsOpen(true);
          }}
          className="w-9 h-9 rounded-[8px] bg-[#111F30] border border-slate-700/10 flex items-center justify-center text-zinc-400 hover:text-white"
          aria-label="Open Mobile Search Overlay"
        >
          <Search className="w-4 h-4" />
        </button>

        {isMobileActive && (
          <div className="fixed inset-0 bg-[#07111F] z-[1200] flex flex-col p-4">
            <div className="flex items-center gap-3 border-b border-zinc-900 pb-3 mb-4">
              <div className="relative flex-1">
                <input
                  placeholder="Search matches, casino..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-8 bg-[#111F30] border border-slate-700/15 rounded-[8px] text-xs font-bold text-white outline-none focus:border-[#0EA5E9]"
                  autoFocus
                />
                <Search className="w-4.5 h-4.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                    aria-label="Clear Mobile Search Query"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <button
                onClick={() => {
                  setIsMobileActive(false);
                  setIsOpen(false);
                }}
                className="text-xs font-bold text-zinc-450 uppercase hover:text-white"
              >
                Cancel
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-1">
              {searchResultsBody}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default GlobalSearch;
