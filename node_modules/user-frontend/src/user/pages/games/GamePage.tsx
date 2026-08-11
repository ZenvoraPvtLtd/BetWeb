import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserLayout } from '../../components/user/layout/UserLayout';
import { Breadcrumbs } from '../../components/user/layout/Breadcrumbs';
import { RulesPanel } from '../../components/user/games/RulesPanel';
import { MyBetsPanel } from '../../components/user/games/MyBetsPanel';
import { BetSlip } from '../../components/user/betslip/BetSlip';
import { GameNotFound } from '../../components/user/feedback/ErrorStates';
import { useBetSlip } from '../../context/BetSlipContext';
import { teenpattiRules, rouletteRules, baccaratRules } from '../../data/rules';
import { casinoGames } from '../../data/casinoGames';
import { teenpattiGames } from '../../data/teenpattiGames';
import { ArrowLeft, Play, Tv, Coins } from 'lucide-react';

export const GamePage: React.FC = () => {
  const { slug, teenpattiSlug } = useParams<{ slug?: string; teenpattiSlug?: string }>();
  const navigate = useNavigate();
  const { addSelection, activeSelection } = useBetSlip();

  const gameSlug = slug || teenpattiSlug;

  // Search in both games databases
  let game = casinoGames.find(
    (g) =>
      g.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === gameSlug ||
      g.title.toLowerCase().replace('teenpatti', '').trim().replace(/[^a-z0-9]+/g, '-') === gameSlug
  );

  if (!game) {
    game = teenpattiGames.find(
      (g) =>
        g.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === gameSlug ||
        g.title.toLowerCase().replace('teenpatti', '').trim().replace(/[^a-z0-9]+/g, '-') === gameSlug
    );
  }

  if (!game) {
    return (
      <UserLayout>
        <div className="p-6">
          <GameNotFound />
        </div>
      </UserLayout>
    );
  }

  // Select rules to display based on title
  const getRules = () => {
    const titleLower = game.title.toLowerCase();
    if (titleLower.includes('teenpatti') || titleLower.includes('teen patti')) {
      return teenpattiRules;
    }
    if (titleLower.includes('roulette')) {
      return rouletteRules;
    }
    return baccaratRules;
  };

  // Selection list to display based on game type
  const getSelections = () => {
    const titleLower = game.title.toLowerCase();
    if (titleLower.includes('teenpatti') || titleLower.includes('teen patti')) {
      return [
        { name: 'Pair Plus', backPrice: '2.00', layPrice: '2.10' },
        { name: 'Trio', backPrice: '30.0', layPrice: '32.0' },
        { name: 'Straight Flush', backPrice: '40.0', layPrice: '42.0' },
        { name: 'Straight', backPrice: '6.00', layPrice: '6.50' },
        { name: 'Flush', backPrice: '4.00', layPrice: '4.30' }
      ];
    }
    if (titleLower.includes('roulette')) {
      return [
        { name: 'Red Outcomes', backPrice: '2.00', layPrice: '2.10' },
        { name: 'Black Outcomes', backPrice: '2.00', layPrice: '2.10' },
        { name: 'Zero Pocket', backPrice: '35.0', layPrice: '38.0' }
      ];
    }
    return [
      { name: 'Player Win', backPrice: '1.95', layPrice: '2.05' },
      { name: 'Banker Win', backPrice: '1.95', layPrice: '2.05' },
      { name: 'Tie Outcome', backPrice: '8.00', layPrice: '9.00' }
    ];
  };

  const handleOddsClick = (selectionName: string, odds: string, type: 'BACK' | 'LAY') => {
    addSelection({
      id: `${game.id}-${selectionName}-${type}`,
      gameId: game.id,
      gameTitle: game.title,
      selectionName,
      marketName: 'Main Board',
      odds,
      type
    });
  };

  const breadcrumbItems = teenpattiSlug
    ? [
        { label: 'Casino', to: '/casino' },
        { label: 'Teenpatti', to: '/games/teenpatti' },
        { label: game.title }
      ]
    : [
        { label: 'Casino', to: '/casino' },
        { label: game.title }
      ];

  const rules = getRules();
  const selections = getSelections();

  return (
    <UserLayout>
      <div className="p-6 flex flex-col gap-6 select-none">
        {/* Top breadcrumbs / back row */}
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

        {/* Game Info Panel */}
        <div className="p-5 bg-gradient-to-r from-[#111F30] to-[#0D1B2A] border border-slate-700/15 rounded-[12px] flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <div className="flex items-center gap-1 bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-live-pulse" />
                <span>LIVE STREAMING</span>
              </div>
              <span className="text-[10px] text-[#0EA5E9] font-bold uppercase tracking-wider">
                Round ID: #482193
              </span>
            </div>

            <h2 className="text-base sm:text-xl font-extrabold text-white flex items-center gap-2">
              <Tv className="w-5 h-5 text-[#0EA5E9]" />
              <span>{game.title}</span>
            </h2>

            <span className="text-[10px] text-[#94A3B8] font-bold mt-1 uppercase tracking-wider">
              Limits: Min ₹100 | Max ₹10,000
            </span>
          </div>
        </div>

        {/* Dynamic game grid workspace */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-6 text-left">
            {/* 1. Mock Game Video Container */}
            <div className="relative w-full aspect-video rounded-[16px] overflow-hidden border border-slate-700/10 shadow-lg group">
              <div
                style={{
                  background: `linear-gradient(135deg, ${game.gradientFrom} 0%, ${game.gradientTo} 100%)`
                }}
                className="absolute inset-0 flex items-center justify-center"
              />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-3xs" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              {/* Central play button overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 z-20">
                <div className="w-14 h-14 rounded-full bg-[#0EA5E9] hover:bg-[#0284c7] text-white flex items-center justify-center shadow-lg cursor-pointer transform hover:scale-105 transition-all">
                  <Play className="w-6 h-6 fill-white ml-1" />
                </div>
                <span className="text-xs text-white font-bold tracking-widest uppercase">Click to open streaming channel</span>
              </div>
            </div>

            {/* 2. Odds Trading Grid */}
            <div className="bg-[#111F30] border border-slate-700/15 rounded-[12px] p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-[#0EA5E9]" />
                  <span>Place Bets</span>
                </h4>
                <div className="flex gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#94A3B8]">
                  <span className="w-14 text-center">Back</span>
                  <span className="w-14 text-center">Lay</span>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                {selections.map((sel) => (
                  <div
                    key={sel.name}
                    className="flex items-center justify-between h-[48px] px-4 bg-zinc-900/10 border border-zinc-900 rounded-[8px]"
                  >
                    <span className="text-xs font-extrabold text-white">{sel.name}</span>
                    <div className="flex gap-1.5 shrink-0">
                      {/* BACK */}
                      <button
                        onClick={() => handleOddsClick(sel.name, sel.backPrice, 'BACK')}
                        className={`
                          w-14 h-9 font-extrabold text-xs rounded-[6px] border transition-all cursor-pointer outline-none
                          ${
                            activeSelection?.selectionName === sel.name && activeSelection?.type === 'BACK'
                              ? 'bg-[#0EA5E9] text-white border-[#0EA5E9]'
                              : 'bg-[#0EA5E9]/10 text-[#0EA5E9] border-[#0EA5E9]/25 hover:bg-[#0EA5E9]/20'
                          }
                        `}
                      >
                        {sel.backPrice}
                      </button>
                      {/* LAY */}
                      <button
                        onClick={() => handleOddsClick(sel.name, sel.layPrice, 'LAY')}
                        className={`
                          w-14 h-9 font-extrabold text-xs rounded-[6px] border transition-all cursor-pointer outline-none
                          ${
                            activeSelection?.selectionName === sel.name && activeSelection?.type === 'LAY'
                              ? 'bg-[#F43F5E] text-white border-[#F43F5E]'
                              : 'bg-[#F43F5E]/10 text-[#F43F5E] border-[#F43F5E]/25 hover:bg-[#F43F5E]/20'
                          }
                        `}
                      >
                        {sel.layPrice}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. My Bets Panel */}
            <MyBetsPanel />
          </div>

          {/* Right sidebar details: Rules & BetSlip */}
          <div className="w-full lg:w-72 shrink-0 flex flex-col gap-6">
            <BetSlip />
            <RulesPanel rules={rules} />
          </div>
        </div>
      </div>
    </UserLayout>
  );
};
export default GamePage;
