import React from 'react';
import { useBetSlip } from '../../../context/BetSlipContext';
import type { Match, Market, MarketSelection } from '../../../types/matches';
import { Tv, AlertCircle } from 'lucide-react';

interface HomeMarketTableProps {
  matches: Match[];
}

export const HomeMarketTable: React.FC<HomeMarketTableProps> = ({ matches }) => {
  const { addSelection, activeSelection } = useBetSlip();

  const handleBetClick = (match: Match, market: Market, sel: MarketSelection, type: 'BACK' | 'LAY') => {
    const odds = type === 'BACK' ? sel.backPrice : sel.layPrice;
    if (odds === '---') return;

    addSelection({
      id: `${match.id}-${sel.name}-${type}`,
      matchId: match.id,
      teams: match.teams,
      selectionName: sel.name,
      marketName: market.name,
      odds,
      type
    });
  };

  const renderCells = (match: Match, market: Market, sel: MarketSelection | undefined) => {
    if (!sel) {
      return (
        <div className="flex gap-1 justify-center shrink-0">
          <div className="w-11 sm:w-14 h-8 bg-zinc-900/10 border border-zinc-900/40 rounded flex items-center justify-center text-[10px] text-zinc-600 font-bold">- -</div>
          <div className="w-11 sm:w-14 h-8 bg-zinc-900/10 border border-zinc-900/40 rounded flex items-center justify-center text-[10px] text-zinc-600 font-bold">- -</div>
        </div>
      );
    }

    const backActive = activeSelection?.matchId === match.id && activeSelection?.selectionName === sel.name && activeSelection?.type === 'BACK';
    const layActive = activeSelection?.matchId === match.id && activeSelection?.selectionName === sel.name && activeSelection?.type === 'LAY';

    return (
      <div className="flex gap-1 justify-center shrink-0">
        <button
          onClick={() => handleBetClick(match, market, sel, 'BACK')}
          className={`w-11 sm:w-14 h-8 bg-[#0EA5E9]/10 hover:bg-[#0EA5E9]/20 border border-[#0EA5E9]/25 hover:border-[#0EA5E9]/50 rounded text-center transition-all cursor-pointer outline-none flex flex-col items-center justify-center ${
            backActive ? 'ring-2 ring-[#0EA5E9] bg-[#0EA5E9]/30' : ''
          }`}
        >
          <span className="text-[10px] font-extrabold text-[#0EA5E9]">{sel.backPrice}</span>
        </button>

        <button
          onClick={() => handleBetClick(match, market, sel, 'LAY')}
          className={`w-11 sm:w-14 h-8 bg-[#F43F5E]/10 hover:bg-[#F43F5E]/20 border border-[#F43F5E]/25 hover:border-[#F43F5E]/50 rounded text-center transition-all cursor-pointer outline-none flex flex-col items-center justify-center ${
            layActive ? 'ring-2 ring-[#F43F5E] bg-[#F43F5E]/30' : ''
          }`}
        >
          <span className="text-[10px] font-extrabold text-[#F43F5E]">{sel.layPrice}</span>
        </button>
      </div>
    );
  };

  return (
    <div className="w-full bg-[#0B1320] border border-slate-700/15 rounded-[12px] overflow-hidden shadow-xl text-left select-none">
      <div className="hidden md:flex h-11 items-center justify-between border-b border-zinc-900 bg-[#0D1B2A] px-4 text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">
        <div className="w-[45%]">Game</div>
        <div className="flex-1 flex justify-around">
          <div className="w-[100px] text-center">1</div>
          <div className="w-[100px] text-center">X</div>
          <div className="w-[100px] text-center">2</div>
        </div>
      </div>

      <div className="flex flex-col divide-y divide-zinc-900/60">
        {matches.length === 0 ? (
          <div className="py-12 text-center flex flex-col items-center justify-center gap-2">
            <AlertCircle className="w-8 h-8 text-zinc-600" />
            <span className="text-xs font-bold text-zinc-555 uppercase tracking-widest">No Matches Available</span>
          </div>
        ) : (
          matches.map((match) => {
            const market = match.markets?.[0];
            const sel1 = market?.selections?.[0];
            const selX = market?.selections?.length === 3 ? market.selections[1] : undefined;
            const sel2 = market?.selections?.length === 3 ? market.selections[2] : market?.selections?.[1];

            const hasStream = match.id === 'm1' || match.id === 'm3' || match.id === 'm4';
            const isFeatured = match.id === 'm1' || match.id === 'm2' || match.id === 'm5';
            const hasBM = match.id === 'm3' || match.id === 'm4';

            return (
              <div
                key={match.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 md:py-3.5 gap-4 hover:bg-zinc-900/10 transition-colors"
              >
                <div className="flex flex-col gap-1.5 md:w-[45%]">
                  <div className="flex items-center gap-2 flex-wrap">
                    {match.isLive ? (
                      <span className="flex items-center gap-1">
                        <span className="relative flex h-1.5 w-1.5 shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E]/75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#22C55E]"></span>
                        </span>
                        <span className="text-[7px] text-[#22C55E] font-extrabold uppercase tracking-wider">Live</span>
                      </span>
                    ) : (
                      <span className="text-[7px] text-zinc-550 font-extrabold uppercase tracking-wider">Upc</span>
                    )}

                    <span className="text-[10px] text-zinc-500 font-bold">
                      {match.sport} • {match.competition}
                    </span>

                    <div className="flex items-center gap-1 ml-1 select-none">
                      {hasStream && (
                        <Tv className="w-3.5 h-3.5 text-[#38BDF8] cursor-pointer hover:text-white transition-colors" />
                      )}
                      {isFeatured && (
                        <span className="text-[8px] font-extrabold px-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded scale-90">
                          f
                        </span>
                      )}
                      {hasBM && (
                        <span className="text-[8px] font-extrabold px-1 bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[#38BDF8] rounded scale-90">
                          BM
                        </span>
                      )}
                    </div>
                  </div>

                  <a
                    href={`/match/${match.id}`}
                    className="text-xs font-extrabold text-white hover:text-[#38BDF8] transition-colors line-clamp-1"
                  >
                    {match.teams}
                  </a>

                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                    {match.date} • {match.time}
                  </span>
                </div>

                <div className="flex items-center justify-between md:justify-around flex-1 gap-2 md:gap-0 bg-zinc-950/20 md:bg-transparent p-2.5 md:p-0 rounded-[8px]">
                  <div className="flex flex-col gap-3.5 md:hidden text-[9px] font-bold text-zinc-500 uppercase">
                    <span>1</span>
                    <span>X</span>
                    <span>2</span>
                  </div>

                  <div className="flex md:flex-1 justify-between md:justify-around w-full gap-2 md:gap-0 select-none">
                    <div className="w-[100px] flex justify-center">{market ? renderCells(match, market, sel1) : null}</div>
                    <div className="w-[100px] flex justify-center">{market ? renderCells(match, market, selX) : null}</div>
                    <div className="w-[100px] flex justify-center">{market ? renderCells(match, market, sel2) : null}</div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default HomeMarketTable;
