import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { SuperAdminLayout } from '../super-admin/SuperAdminLayout';
import { SportsHeader } from './SportsHeader';
import { SportsEventList } from './SportsEventList';
import { DemoSelectionSlip } from './DemoSelectionSlip';
import { ChevronRight } from 'lucide-react';

// Import sport configurations
import { golfConfig } from '../../config/sports/golf';
import { kabaddiConfig } from '../../config/sports/kabaddi';
import { eGamesConfig } from '../../config/sports/e-games';
import { soccerConfig } from '../../config/sports/soccer';
import { horseRacingConfig } from '../../config/sports/horse-racing';
import { tennisConfig } from '../../config/sports/tennis';
import { basketballConfig } from '../../config/sports/basketball';
import { futsalConfig } from '../../config/sports/futsal';
import { cricketConfig } from '../../config/sports/cricket';
import { tableTennisConfig } from '../../config/sports/table-tennis';
import { volleyballConfig } from '../../config/sports/volleyball';
import { snookerConfig } from '../../config/sports/snooker';
import { greyhoundRacingConfig } from '../../config/sports/greyhound-racing';

import type { SportEvent, DemoSelection } from '../../types/sports';

const configMap: Record<string, any> = {
  golf: golfConfig,
  kabaddi: kabaddiConfig,
  'e-games': eGamesConfig,
  soccer: soccerConfig,
  'horse-racing': horseRacingConfig,
  tennis: tennisConfig,
  basketball: basketballConfig,
  futsal: futsalConfig,
  cricket: cricketConfig,
  'table-tennis': tableTennisConfig,
  volleyball: volleyballConfig,
  snooker: snookerConfig,
  'greyhound-racing': greyhoundRacingConfig,
};

export const SportsExchangePage: React.FC = () => {
  const { sportSlug } = useParams<{ sportSlug: string }>();

  // Resolve matching sport config
  const config = sportSlug ? configMap[sportSlug] : null;

  const [balance, setBalance] = useState<number>(() => {
    const saved = localStorage.getItem('demo_balance');
    return saved ? parseInt(saved, 10) : 10000;
  });

  const [events, setEvents] = useState<SportEvent[]>([]);
  const [selected, setSelected] = useState<{ event: SportEvent; selection: DemoSelection } | null>(
    null
  );

  // Load configuration events
  useEffect(() => {
    if (config) {
      setEvents(config.initialEvents);
      setSelected(null);
    }
  }, [sportSlug, config]);

  // Persist balance to localStorage
  const updateBalance = (newBalance: number) => {
    setBalance(newBalance);
    localStorage.setItem('demo_balance', newBalance.toString());
  };

  // Simulated live event updates progression
  useEffect(() => {
    if (events.length === 0) return;

    const interval = setInterval(() => {
      setEvents((prevEvents) =>
        prevEvents.map((evt) => {
          if (evt.status === 'Completed') return evt;

          // 1. Start upcoming events
          if (evt.status === 'Upcoming') {
            const shouldStart = Math.random() < 0.05;
            if (shouldStart) {
              return {
                ...evt,
                status: 'Live',
                startTime: 'Live Now',
                score: {
                  status: 'Live',
                  detail: evt.sportType === 'cricket' ? 'Overs: 0.0' : '1st Half - 00:00',
                  scoreDisplay: evt.sportType === 'cricket' ? '0/0' : '0 - 0',
                },
                meta: {
                  ...evt.meta,
                  timer: 0,
                  half: '1st',
                  overs: 0,
                  runs: 0,
                  wickets: 0,
                },
              };
            }
            return evt;
          }

          // 2. Progression for live events
          if (evt.status === 'Live') {
            const updated = { ...evt };

            if (evt.sportType === 'soccer' || evt.sportType === 'futsal') {
              const currentTimer = (evt.meta?.timer || 0) + 15;
              const shouldScore = Math.random() < 0.08;
              let homeScore = Number(evt.participants.home.score || 0);
              let awayScore = Number(evt.participants.away.score || 0);

              if (shouldScore) {
                if (Math.random() > 0.5) homeScore++;
                else awayScore++;
              }

              if (currentTimer >= 90 * 60) {
                return {
                  ...evt,
                  status: 'Completed',
                  startTime: 'Finished',
                  participants: {
                    home: { ...evt.participants.home, score: homeScore },
                    away: { ...evt.participants.away, score: awayScore },
                  },
                };
              }

              return {
                ...evt,
                participants: {
                  home: { ...evt.participants.home, score: homeScore },
                  away: { ...evt.participants.away, score: awayScore },
                },
                meta: {
                  ...evt.meta,
                  timer: currentTimer,
                  half: currentTimer > 45 * 60 ? '2nd' : '1st',
                },
              };
            }

            if (evt.sportType === 'cricket') {
              const runsAdded = Math.random() < 0.5 ? Math.floor(Math.random() * 5) : 0;
              const isWicket = Math.random() < 0.04;
              let currentOvers = parseFloat((evt.meta?.overs || 0).toFixed(1));
              let balls = Math.round((currentOvers % 1) * 10);
              let fullOvers = Math.floor(currentOvers);

              balls++;
              if (balls >= 6) {
                fullOvers++;
                balls = 0;
              }
              const newOvers = parseFloat(`${fullOvers}.${balls}`);
              const newRuns = Number(evt.participants.home.score || 0) + runsAdded;
              const newWickets = Math.min(
                10,
                Number(evt.participants.home.subScore || 0) + (isWicket ? 1 : 0)
              );

              if (fullOvers >= 20 || newWickets >= 10) {
                return {
                  ...evt,
                  status: 'Completed',
                  startTime: 'Finished',
                  score: {
                    status: 'Completed',
                    detail: `Innings complete: ${newRuns}/${newWickets} (${newOvers} ov)`,
                  },
                };
              }

              return {
                ...evt,
                participants: {
                  ...evt.participants,
                  home: {
                    ...evt.participants.home,
                    score: newRuns,
                    subScore: newWickets,
                  },
                },
                meta: {
                  ...evt.meta,
                  overs: newOvers,
                  currentOverRuns: [...(evt.meta?.currentOverRuns || []).slice(-5), runsAdded],
                },
              };
            }

            // Fluctuate odds slightly
            const updatedSelections = evt.selections.map((sel) => {
              const delta = (Math.random() - 0.5) * 0.04;
              const newRate = Math.max(1.05, Math.min(15.0, sel.rate + delta));
              return { ...sel, rate: parseFloat(newRate.toFixed(2)) };
            });

            return {
              ...updated,
              selections: updatedSelections,
            };
          }

          return evt;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [events.length]);

  if (!config) {
    return <Navigate to="/admin/market-analysis" replace />;
  }

  const handleSelect = (selection: DemoSelection, event: SportEvent) => {
    setSelected({ event, selection });
  };

  const handleClearSelection = () => {
    setSelected(null);
  };

  const handlePlaceBet = (points: number) => {
    if (!selected) return;
    const newBalance = balance - points;
    updateBalance(newBalance);

    // Confirmation Toast alert
    alert(
      `Demo Bet Placed Successfully!\n\nSelection: ${selected.selection.name} @ ${selected.selection.rate}\nEvent: ${selected.event.name}\nPoints Staked: ${points}\nRemaining Balance: ${newBalance}`
    );

    setSelected(null);
  };

  return (
    <SuperAdminLayout>
      <div className="flex flex-col text-left select-none animate-fadeIn">
        {/* Dynamic Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-4 select-none">
          <Link to="/admin/market-analysis" className="hover:text-orange-400 transition-colors">
            Super Admin
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-slate-500">Sports</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-orange-400">{config.name}</span>
        </nav>

        {/* Reusable Header Console */}
        <SportsHeader title={config.name} balance={balance} />

        {/* 2-Column Responsive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main events roster (Left 2 cols) */}
          <div className="lg:col-span-2">
            <SportsEventList
              events={events}
              selectedSelectionId={selected?.selection.id || null}
              onSelect={handleSelect}
            />
          </div>

          {/* Persistent Selection Slip (Right 1 col) */}
          <div className="lg:col-span-1 sticky top-6">
            <DemoSelectionSlip
              selectedEvent={selected?.event || null}
              selectedSelection={selected?.selection || null}
              onClear={handleClearSelection}
              onSubmit={handlePlaceBet}
              balance={balance}
            />
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
};
