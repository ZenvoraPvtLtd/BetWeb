import type { SportConfig } from '../../types/sports';

export const eGamesConfig: SportConfig = {
  sportId: 'e-games',
  title: 'E Games',
  initialEvents: [
    {
      id: 'egames-event-1',
      name: 'Natus Vincere vs FaZe Clan',
      status: 'Live',
      startTime: 'Live Now',
      sportType: 'e-games',
      participants: {
        home: { name: 'Natus Vincere', score: 1 },
        away: { name: 'FaZe Clan', score: 0 },
      },
      score: {
        status: 'Live',
        detail: 'Map 2 - NAVI leading',
        scoreDisplay: '1 - 0',
      },
      selections: [
        { id: 'navi', name: 'NAVI', rate: 1.35 },
        { id: 'faze', name: 'FaZe', rate: 3.1 },
      ],
      meta: {
        map: 2,
        homeScore: 1,
        awayScore: 0,
      },
    },
    {
      id: 'egames-event-2',
      name: 'Sentinels vs Fnatic',
      status: 'Upcoming',
      startTime: 'Starts in 3 hours',
      sportType: 'e-games',
      participants: {
        home: { name: 'Sentinels' },
        away: { name: 'Fnatic' },
      },
      selections: [
        { id: 'sen', name: 'Sentinels', rate: 1.75 },
        { id: 'fnc', name: 'Fnatic', rate: 1.95 },
      ],
    },
  ],
};
