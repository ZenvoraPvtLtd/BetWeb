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

          // 2. Adjust live event progress
          if (evt.status === 'Live') {
            const updatedMeta = { ...evt.meta };
            const updatedScore = evt.score ? { ...evt.score } : { status: 'Live' };
            const homeParticipant = { ...evt.participants.home };
            const awayParticipant = { ...evt.participants.away };
            let currentStatus: SportEvent['status'] = evt.status;

            if (updatedMeta.timer !== undefined) {
              updatedMeta.timer += 3;
            }

            if (evt.sportType === 'cricket') {
              let overs = parseFloat((updatedMeta.overs || 0).toFixed(1));
              let balls = Math.round((overs * 10) % 10) + 1;
              let overNum = Math.floor(overs);
              if (balls >= 6) {
                overNum += 1;
                balls = 0;
              }
              updatedMeta.overs = parseFloat(`${overNum}.${balls}`);

              if (Math.random() < 0.4) {
                const runOptions = [0, 1, 2, 4, 6];
                const gained = runOptions[Math.floor(Math.random() * runOptions.length)];
                updatedMeta.runs = (updatedMeta.runs || 0) + gained;
                homeParticipant.score = updatedMeta.runs;

                if (updatedMeta.currentOverRuns) {
                  updatedMeta.currentOverRuns = [...updatedMeta.currentOverRuns.slice(1), gained];
                }
              }

              if (Math.random() < 0.04) {
                updatedMeta.wickets = (updatedMeta.wickets || 0) + 1;
                homeParticipant.subScore = updatedMeta.wickets;
              }

              updatedScore.detail = `Overs: ${updatedMeta.overs}`;
              updatedScore.scoreDisplay = `${updatedMeta.runs}/${updatedMeta.wickets} (${updatedMeta.overs} overs)`;

              if (updatedMeta.overs >= 20.0) {
                currentStatus = 'Completed';
                updatedScore.detail = 'Match Completed';
              }
            } else if (evt.sportType === 'soccer' || evt.sportType === 'futsal') {
              if (Math.random() < 0.02) {
                if (Math.random() < 0.5) {
                  homeParticipant.score = ((homeParticipant.score as number) || 0) + 1;
                } else {
                  awayParticipant.score = ((awayParticipant.score as number) || 0) + 1;
                }
              }

              if (updatedMeta.timer >= 2700 && updatedMeta.half === '1st') {
                updatedMeta.half = '2nd';
                updatedMeta.timer = 2700;
              } else if (updatedMeta.timer >= 5400) {
                currentStatus = 'Completed';
                updatedScore.detail = 'Full Time';
              }

              updatedScore.scoreDisplay = `${homeParticipant.score} - ${awayParticipant.score}`;
            } else if (evt.sportType === 'basketball') {
              if (Math.random() < 0.15) {
                const pts = Math.random() < 0.6 ? 2 : 3;
                if (Math.random() < 0.5) {
                  homeParticipant.score = ((homeParticipant.score as number) || 0) + pts;
                } else {
                  awayParticipant.score = ((awayParticipant.score as number) || 0) + pts;
                }
              }

              if (updatedMeta.timer >= 2400) {
                currentStatus = 'Completed';
                updatedScore.detail = 'Full Time';
              }
              updatedScore.scoreDisplay = `${homeParticipant.score} - ${awayParticipant.score}`;
            }

            const updatedSelections = evt.selections.map((sel) => {
              const diff = (Math.random() - 0.5) * 0.04;
              let newRate = parseFloat((sel.rate + diff).toFixed(2));
              if (newRate < 1.05) newRate = 1.05;
              if (newRate > 10.0) newRate = 10.0;
              return { ...sel, rate: newRate };
            });

            return {
              ...evt,
              status: currentStatus,
              participants: {
                home: homeParticipant,
                away: awayParticipant,
              },
              score: updatedScore,
              meta: updatedMeta,
              selections: updatedSelections,
            };
          }

          return evt;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [events]);

  if (!config) {
    return <Navigate to="/admin/market-analysis" replace />;
  }

  const handleSelect = (selection: DemoSelection, event: SportEvent) => {
    setSelected({ event, selection });
  };

  const handleClearSelection = () => {
    setSelected(null);
  };

  const handleAddSelection = (pointsDeducted: number) => {
    updateBalance(balance - pointsDeducted);
    setSelected(null);
  };

  return (
    <SuperAdminLayout>
      <div className="flex flex-col text-left select-none animate-fadeIn">
        {/* Breadcrumb Path */}
        <nav className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-5">
          <Link to="/admin/market-analysis" className="hover:text-zinc-955 transition-colors">
            Sports Exchange
          </Link>
          <ChevronRight className="w-3 h-3 text-zinc-400" />
          <span className="text-zinc-955">{config.title}</span>
        </nav>

        {/* Header Block */}
        <SportsHeader title={config.title} balance={balance} />

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Panel */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <SportsEventList
              events={events}
              selectedSelection={
                selected
                  ? { eventId: selected.event.id, selectionId: selected.selection.id }
                  : null
              }
              onSelect={handleSelect}
            />
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-4 sticky top-6">
            <DemoSelectionSlip
              selectedEvent={selected ? selected.event : null}
              selectedSelection={selected ? selected.selection : null}
              onClear={handleClearSelection}
              onSubmit={handleAddSelection}
              balance={balance}
            />
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
};
