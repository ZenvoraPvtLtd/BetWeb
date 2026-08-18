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
      <div className="p-4 md:p-6 flex flex-col gap-6 select-none">
        {/* Navigation row */}
        <div className="flex items-center justify-between">
          <Breadcrumbs items={breadcrumbItems} />
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#18233C] border border-[#2B3C60] rounded-[8px] text-[10px] font-bold text-slate-300 hover:text-white hover:bg-[#223050] transition-colors cursor-pointer outline-none font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-orange-400" />
            <span>Back</span>
          </button>
        </div>

        {/* Header Block details */}
        <div className="p-5 bg-[#131B2E] border border-[#1E293B] rounded-[12px] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left shadow-lg">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap font-mono">
              {match.isLive ? (
                <div className="flex items-center gap-1 bg-red-500/15 border border-red-500/30 text-red-400 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-live-pulse" />
                  <span>LIVE</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 bg-[#18233C] border border-[#2B3C60] text-slate-400 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                  <Calendar className="w-2.5 h-2.5" />
                  <span>Upcoming</span>
                </div>
              )}
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                {match.competition}
              </span>
            </div>

            <h2 className="text-base sm:text-xl font-extrabold text-slate-100 flex items-center gap-2">
              <Swords className="w-5 h-5 text-orange-400" />
              <span>{match.teams}</span>
            </h2>

            <span className="text-xs text-slate-400 font-semibold mt-1 font-mono">
              {match.isLive ? `Live Score: ${match.scoreDisplay}` : `Starts at ${match.date} ${match.time}`}
            </span>
          </div>
        </div>

        {/* View Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Markets container */}
          <div className="flex-1 flex flex-col gap-6 text-left">
            {match.markets.map((market, idx) => (
              <div key={idx} className="bg-[#131B2E] border border-[#1E293B] rounded-[12px] p-5 flex flex-col gap-4 shadow-md">
                <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest flex items-center gap-1.5 font-mono">
                    <Zap className="w-4 h-4 text-orange-400" />
                    <span>{market.name}</span>
                  </h4>
                  <div className="flex gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 font-mono">
                    <span className="w-14 text-center">Back</span>
                    <span className="w-14 text-center">Lay</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  {market.selections.map((sel) => (
                    <div
                      key={sel.name}
                      className="flex items-center justify-between h-[48px] px-4 bg-[#090E17] border border-[#1E293B] rounded-[8px]"
                    >
                      <span className="text-xs font-extrabold text-slate-100">{sel.name}</span>
                      <div className="flex gap-1.5 shrink-0 font-mono">
                        {/* BACK button */}
                        <button
                          disabled={sel.backPrice === '---'}
                          onClick={() => handleOddsClick(sel.name, sel.backPrice, 'BACK', market.name)}
                          className={`
                            w-14 h-9 font-extrabold text-xs rounded-[6px] border transition-all cursor-pointer outline-none
                            ${
                              activeSelection?.selectionName === sel.name && activeSelection?.type === 'BACK'
                                ? 'bg-blue-600 text-white border-blue-500 ring-2 ring-blue-400'
                                : 'bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30'
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
                                ? 'bg-pink-600 text-white border-pink-500 ring-2 ring-pink-400'
                                : 'bg-pink-500/20 text-pink-400 border-pink-500/30 hover:bg-pink-500/30'
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
            <div className="p-4 bg-[#131B2E] border border-[#1E293B] rounded-[12px] flex items-start gap-2.5 text-[11px] text-slate-400 font-semibold leading-relaxed select-none">
              <AlertCircle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
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
