import type { SportConfig } from '../../types/sports';

export const volleyballConfig: SportConfig = {
  sportId: 'volleyball',
  title: 'Volleyball',
  initialEvents: [
    {
      id: 'volleyball-event-1',
      name: 'Poland vs Italy',
      status: 'Live',
      startTime: 'Live Now',
      sportType: 'volleyball',
      participants: {
        home: { name: 'Poland', score: 25, subScore: '2' },
        away: { name: 'Italy', score: 23, subScore: '1' },
      },
      score: {
        status: 'Live',
        detail: 'Set 4',
        scoreDisplay: 'Sets: 2-1 | 25-23',
      },
      selections: [
        { id: 'pol', name: 'Poland', rate: 1.25 },
        { id: 'ita', name: 'Italy', rate: 3.5 },
      ],
      meta: {
        set: 4,
        setsHome: 2,
        setsAway: 1,
        pointsHome: 25,
        pointsAway: 23,
      },
    },
    {
      id: 'volleyball-event-2',
      name: 'France vs USA',
      status: 'Upcoming',
      startTime: 'Starts in 2 hours',
      sportType: 'volleyball',
      participants: {
        home: { name: 'France' },
        away: { name: 'USA' },
      },
      selections: [
        { id: 'fra', name: 'France', rate: 1.9 },
        { id: 'usa', name: 'USA', rate: 1.8 },
      ],
    },
  ],
};
