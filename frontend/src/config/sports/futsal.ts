import type { SportConfig } from '../../types/sports';

export const futsalConfig: SportConfig = {
  sportId: 'futsal',
  title: 'Futsal',
  initialEvents: [
    {
      id: 'futsal-event-1',
      name: 'Brazil vs Spain',
      status: 'Live',
      startTime: 'Live Now',
      sportType: 'futsal',
      participants: {
        home: { name: 'Brazil', score: 3 },
        away: { name: 'Spain', score: 2 },
      },
      score: {
        status: 'Live',
        detail: '2nd Half - 12:45',
        scoreDisplay: '3 - 2',
      },
      selections: [
        { id: 'bra', name: 'Brazil', rate: 1.44 },
        { id: 'draw', name: 'Draw', rate: 3.8 },
        { id: 'esp', name: 'Spain', rate: 3.1 },
      ],
      meta: {
        timer: 765, // 12m 45s
        half: '2nd',
      },
    },
    {
      id: 'futsal-event-2',
      name: 'Argentina vs Portugal',
      status: 'Upcoming',
      startTime: 'Starts in 2 hours',
      sportType: 'futsal',
      participants: {
        home: { name: 'Argentina' },
        away: { name: 'Portugal' },
      },
      selections: [
        { id: 'arg', name: 'Argentina', rate: 2.1 },
        { id: 'draw', name: 'Draw', rate: 3.3 },
        { id: 'por', name: 'Portugal', rate: 2.5 },
      ],
    },
  ],
};
