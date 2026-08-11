import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { Breadcrumbs } from '../../components/user/layout/Breadcrumbs';
import { BetSlip } from '../../components/user/betslip/BetSlip';
import { MatchNotFound } from '../../components/user/feedback/ErrorStates';
import { useBetSlip } from '../../context/BetSlipContext';
import { userMatches } from '../../data/matches';
import { ArrowLeft, Swords, Calendar, Zap, AlertCircle } from 'lucide-react';

export const MatchDetailPage: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const { addSelection, activeSelection } = useBetSlip();

  const match = userMatches.find((m) => m.id === matchId);

  if (!match) {
    return (
      <UserLayout>
        <div className="p-6">
          <MatchNotFound />
        </div>
      </UserLayout>
    );
  }

  const handleOddsClick = (selectionName: string, odds: string, type: 'BACK' | 'LAY', marketName: string) => {
    if (odds === '---') return;
    addSelection({
      id: `${match.id}-${selectionName}-${type}`,
      matchId: match.id,
      teams: match.teams,
      selectionName,
      marketName,
      odds,
      type
    });
  };

  const breadcrumbItems = [
    { label: 'Sports', to: '/home' },
    { label: match.sport, to: `/sports/${match.sport.toLowerCase().replace(' ', '-')}` },
    { label: match.teams }
  ];

  return (
    <UserLayout>
      <div className="p-6 flex flex-col gap-6 select-none">
        {/* Navigation row */}
        <div className="flex items-center justify-between">
          <Breadcrumbs items={breadcrumbItems} />
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#111F30] border border-slate-700/15 rounded-[8px] text-[10px] font-bold text-zinc-350 hover:text-white transition-colors cursor-pointer outline-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        </div>

        {/* Header Block details */}
        <div className="p-5 bg-gradient-to-r from-[#111F30] to-[#0D1B2A] border border-slate-700/15 rounded-[12px] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              {match.isLive ? (
                <div className="flex items-center gap-1 bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-live-pulse" />
                  <span>LIVE</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                  <Calendar className="w-2.5 h-2.5" />
                  <span>Upcoming</span>
                </div>
              )}
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                {match.competition}
              </span>
            </div>

            <h2 className="text-base sm:text-xl font-extrabold text-white flex items-center gap-2">
              <Swords className="w-5 h-5 text-[#0EA5E9]" />
              <span>{match.teams}</span>
            </h2>

            <span className="text-xs text-[#94A3B8] font-semibold mt-1">
              {match.isLive ? `Live Score: ${match.scoreDisplay}` : `Starts at ${match.date} ${match.time}`}
            </span>
          </div>
        </div>

        {/* View Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Markets container */}
          <div className="flex-1 flex flex-col gap-6 text-left">
            {match.markets.map((market, idx) => (
              <div key={idx} className="bg-[#111F30] border border-slate-700/15 rounded-[12px] p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-[#0EA5E9]" />
                    <span>{market.name}</span>
                  </h4>
                  <div className="flex gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#94A3B8]">
                    <span className="w-14 text-center">Back</span>
                    <span className="w-14 text-center">Lay</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  {market.selections.map((sel) => (
                    <div
                      key={sel.name}
                      className="flex items-center justify-between h-[48px] px-4 bg-zinc-900/10 border border-zinc-900 rounded-[8px]"
                    >
                      <span className="text-xs font-extrabold text-white">{sel.name}</span>
                      <div className="flex gap-1.5 shrink-0">
                        {/* BACK button */}
                        <button
                          disabled={sel.backPrice === '---'}
                          onClick={() => handleOddsClick(sel.name, sel.backPrice, 'BACK', market.name)}
                          className={`
                            w-14 h-9 font-extrabold text-xs rounded-[6px] border transition-all cursor-pointer outline-none
                            ${
                              activeSelection?.selectionName === sel.name && activeSelection?.type === 'BACK'
                                ? 'bg-[#0EA5E9] text-white border-[#0EA5E9]'
                                : 'bg-[#0EA5E9]/10 text-[#0EA5E9] border-[#0EA5E9]/25 hover:bg-[#0EA5E9]/20'
                            }
                            disabled:opacity-30 disabled:cursor-not-allowed
                          `}
                        >
                          {sel.backPrice}
                        </button>
                        {/* LAY button */}
                        <button
                          disabled={sel.layPrice === '---'}
                          onClick={() => handleOddsClick(sel.name, sel.layPrice, 'LAY', market.name)}
                          className={`
                            w-14 h-9 font-extrabold text-xs rounded-[6px] border transition-all cursor-pointer outline-none
                            ${
                              activeSelection?.selectionName === sel.name && activeSelection?.type === 'LAY'
                                ? 'bg-[#F43F5E] text-white border-[#F43F5E]'
                                : 'bg-[#F43F5E]/10 text-[#F43F5E] border-[#F43F5E]/25 hover:bg-[#F43F5E]/20'
                            }
                            disabled:opacity-30 disabled:cursor-not-allowed
                          `}
                        >
                          {sel.layPrice}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Disclaimer */}
            <div className="p-4 bg-zinc-900/10 border border-zinc-900 rounded-[12px] flex items-start gap-2.5 text-[11px] text-zinc-550 font-semibold leading-relaxed select-none">
              <AlertCircle className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
              <span>
                Mock Betting Disclaimer: Standard trade credits apply. This is a demonstration environment. No financial transactions or deposits are supported.
              </span>
            </div>
          </div>

          <BetSlip />
        </div>
      </div>
    </UserLayout>
  );
};
export default MatchDetailPage;
