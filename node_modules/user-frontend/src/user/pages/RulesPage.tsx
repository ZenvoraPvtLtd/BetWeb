import React, { useState } from 'react';
import { UserLayout } from '../components/user/layout/UserLayout';
import { SettingsHeader } from '../components/settings/SettingsHeader';
import { ChevronDown, BookOpen } from 'lucide-react';

export const RulesPage: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('general');

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const ruleSections = [
    {
      id: 'general',
      title: 'General Exchange Rules',
      content: `1. All bets are settled based on the official results announced by the respective sports governing body.
2. In the event of a matched bet being cancelled due to match abandonment or postponement, funds are returned immediately to the user's balance.
3. Users are responsible for managing their exposures. Negative balances are restricted.
4. Back and Lay prices fluctuate based on exchange market liquidity.`
    },
    {
      id: 'cricket',
      title: 'Cricket Betting Rules',
      content: `1. Match Bets: If a match is shortened or interrupted by weather, bets will be settled according to the official Duckworth-Lewis-Stern (DLS) method.
2. In Limited Overs matches, bets are void if the match is abandoned without a single ball bowled.
3. Tie / Draw: If a match finishes in a tie and no super-over or tie-breaker is played, tie rules apply.
4. Session runs are settled based on the exact runs scored during the specified overs.`
    },
    {
      id: 'tennis',
      title: 'Tennis Betting Rules',
      content: `1. If a player retires or is disqualified before the match is fully completed, all head-to-head match bets are void.
2. Set Betting: If the required number of sets is changed or shortened, all set bets are voided.
3. Delay/Postponement: Tennis fixtures postponed due to rain or light delays remain active until completed.`
    },
    {
      id: 'soccer',
      title: 'Soccer/Football Betting Rules',
      content: `1. All match markets are settled on the result at the end of normal time (90 minutes play plus injury time), excluding extra time and penalty shootouts unless specified.
2. Abandoned Matches: If a match is abandoned before the 90th minute, all undecided markets are voided.`
    },
    {
      id: 'teenpatti',
      title: 'Teenpatti & Card Games Rules',
      content: `1. Teenpatti: Three cards are dealt to each player. The highest hand wins (Trio/Trail > Pure Sequence > Sequence > Color > Pair > High Card).
2. Decks are shuffled before each round. Live dealer video stream determines game results.
3. Bet placement is locked once the timer hits zero.`
    },
    {
      id: 'casino',
      title: 'General Casino & Baccarat Rules',
      content: `1. Player/Banker Baccarat bets are paid at 1:1, with Banker bets subject to standard commission where applicable.
2. Tie bets are paid at 8:1 payout rates.
3. Disconnection: If a connection error occurs during a live spin or deal, the server-side result is deemed official.`
    }
  ];

  const breadcrumbs = [
    { label: 'Home', to: '/home' },
    { label: 'Betting Rules' }
  ];

  return (
    <UserLayout>
      <div className="p-6 flex flex-col gap-6 select-none text-left">
        <SettingsHeader
          title="Betting Rules"
          description="Read general exchange rules and guidelines for sports and live dealer casino."
          breadcrumbs={breadcrumbs}
        />

        <div className="max-w-3xl flex flex-col gap-3">
          {ruleSections.map((section) => {
            const isExpanded = expandedSection === section.id;
            return (
              <div
                key={section.id}
                className="bg-[#111F30] border border-slate-700/15 rounded-[12px] overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-zinc-900/10 cursor-pointer outline-none transition-colors"
                >
                  <span className="text-xs font-extrabold uppercase text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#0EA5E9]" />
                    <span>{section.title}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-zinc-900/30 text-xs font-semibold text-zinc-400 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </UserLayout>
  );
};
export default RulesPage;
