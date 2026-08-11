import type { SportConfig } from '../../types/sports';

export const tennisConfig: SportConfig = {
  sportId: 'tennis',
  title: 'Tennis',
  initialEvents: [
    {
      id: 'tennis-event-1',
      name: 'Player A vs Player B',
      status: 'Live',
      startTime: 'Live Now',
      sportType: 'tennis',
      participants: {
        home: { name: 'Player A', score: '30', subScore: '1' },
        away: { name: 'Player B', score: '15', subScore: '0' },
      },
      score: {
        status: 'Live',
        detail: 'Set 2 - Game 3',
        scoreDisplay: 'Sets: 1-0 | Games: 2-1 | 30-15',
      },
      selections: [
        { id: 'pla', name: 'Player A', rate: 1.22 },
        { id: 'plb', name: 'Player B', rate: 3.85 },
      ],
      meta: {
        set: 2,
        gamesHome: 2,
        gamesAway: 1,
        pointsHome: '30',
        pointsAway: '15',
        setsHome: 1,
        setsAway: 0,
      },
    },
    {
      id: 'tennis-event-2',
      name: 'Player C vs Player D',
      status: 'Upcoming',
      startTime: 'Starts in 1 hour',
      sportType: 'tennis',
      participants: {
        home: { name: 'Player C' },
        away: { name: 'Player D' },
      },
      selections: [
        { id: 'plc', name: 'Player C', rate: 1.72 },
        { id: 'pld', name: 'Player D', rate: 2.05 },
      ],
    },
  ],
};
