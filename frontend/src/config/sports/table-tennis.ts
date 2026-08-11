import type { SportConfig } from '../../types/sports';

export const tableTennisConfig: SportConfig = {
  sportId: 'table-tennis',
  title: 'Table Tennis',
  initialEvents: [
    {
      id: 'table-tennis-event-1',
      name: 'Player A vs Player B',
      status: 'Live',
      startTime: 'Live Now',
      sportType: 'table-tennis',
      participants: {
        home: { name: 'Player A', score: 11, subScore: '2' },
        away: { name: 'Player B', score: 8, subScore: '1' },
      },
      score: {
        status: 'Live',
        detail: 'Set 4 - Game Point',
        scoreDisplay: 'Sets: 2-1 | 11-8',
      },
      selections: [
        { id: 'pla', name: 'Player A', rate: 1.15 },
        { id: 'plb', name: 'Player B', rate: 4.8 },
      ],
      meta: {
        set: 4,
        setsHome: 2,
        setsAway: 1,
        pointsHome: 11,
        pointsAway: 8,
      },
    },
    {
      id: 'table-tennis-event-2',
      name: 'Player C vs Player D',
      status: 'Upcoming',
      startTime: 'Starts in 45 minutes',
      sportType: 'table-tennis',
      participants: {
        home: { name: 'Player C' },
        away: { name: 'Player D' },
      },
      selections: [
        { id: 'plc', name: 'Player C', rate: 1.8 },
        { id: 'pld', name: 'Player D', rate: 1.9 },
      ],
    },
  ],
};
