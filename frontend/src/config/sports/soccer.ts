import type { SportConfig } from '../../types/sports';

export const soccerConfig: SportConfig = {
  sportId: 'soccer',
  title: 'Soccer',
  initialEvents: [
    {
      id: 'soccer-event-1',
      name: 'Manchester United vs Arsenal',
      status: 'Live',
      startTime: 'Live Now',
      sportType: 'soccer',
      participants: {
        home: { name: 'Manchester United', score: 2 },
        away: { name: 'Arsenal', score: 1 },
      },
      score: {
        status: 'Live',
        detail: '1st Half - 42:15',
        scoreDisplay: '2 - 1',
      },
      selections: [
        { id: 'mun', name: 'Man Utd', rate: 1.45 },
        { id: 'draw', name: 'Draw', rate: 3.25 },
        { id: 'ars', name: 'Arsenal', rate: 4.1 },
      ],
      meta: {
        timer: 2535, // 42m 15s
        half: '1st',
      },
    },
    {
      id: 'soccer-event-2',
      name: 'Barcelona vs Real Madrid',
      status: 'Upcoming',
      startTime: 'Starts in 4 hours',
      sportType: 'soccer',
      participants: {
        home: { name: 'Barcelona' },
        away: { name: 'Real Madrid' },
      },
      selections: [
        { id: 'bar', name: 'Barcelona', rate: 2.1 },
        { id: 'draw', name: 'Draw', rate: 3.4 },
        { id: 'rma', name: 'Real Madrid', rate: 2.8 },
      ],
    },
  ],
};
