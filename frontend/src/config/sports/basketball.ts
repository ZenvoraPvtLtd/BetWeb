import type { SportConfig } from '../../types/sports';

export const basketballConfig: SportConfig = {
  sportId: 'basketball',
  title: 'Basketball',
  initialEvents: [
    {
      id: 'basketball-event-1',
      name: 'LA Lakers vs Boston Celtics',
      status: 'Live',
      startTime: 'Live Now',
      sportType: 'basketball',
      participants: {
        home: { name: 'LA Lakers', score: 88 },
        away: { name: 'Boston Celtics', score: 85 },
      },
      score: {
        status: 'Live',
        detail: 'Q4 - 04:30',
        scoreDisplay: '88 - 85',
      },
      selections: [
        { id: 'lal', name: 'Lakers', rate: 1.62 },
        { id: 'bos', name: 'Celtics', rate: 2.25 },
      ],
      meta: {
        timer: 270, // 4m 30s
        quarter: 4,
      },
    },
    {
      id: 'basketball-event-2',
      name: 'Golden State vs Phoenix Suns',
      status: 'Upcoming',
      startTime: 'Starts in 3 hours',
      sportType: 'basketball',
      participants: {
        home: { name: 'Golden State' },
        away: { name: 'Phoenix Suns' },
      },
      selections: [
        { id: 'gsw', name: 'Warriors', rate: 1.85 },
        { id: 'phx', name: 'Suns', rate: 1.95 },
      ],
    },
  ],
};
