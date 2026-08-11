import type { SportConfig } from '../../types/sports';

export const cricketConfig: SportConfig = {
  sportId: 'cricket',
  title: 'Cricket',
  initialEvents: [
    {
      id: 'cricket-event-1',
      name: 'India vs Australia',
      status: 'Live',
      startTime: 'Live Now',
      sportType: 'cricket',
      participants: {
        home: { name: 'India', score: 145, subScore: 3 },
        away: { name: 'Australia', score: 0, subScore: 0 },
      },
      score: {
        status: 'Live',
        detail: 'Overs: 18.2',
        scoreDisplay: '145/3 (18.2 overs)',
      },
      selections: [
        { id: 'ind', name: 'India', rate: 1.55 },
        { id: 'aus', name: 'Australia', rate: 2.45 },
      ],
      meta: {
        overs: 18.2,
        wickets: 3,
        runs: 145,
        currentOverRuns: [4, 1, 6, 0, 1],
      },
    },
    {
      id: 'cricket-event-2',
      name: 'England vs South Africa',
      status: 'Upcoming',
      startTime: 'Starts in 2 hours',
      sportType: 'cricket',
      participants: {
        home: { name: 'England' },
        away: { name: 'South Africa' },
      },
      selections: [
        { id: 'eng', name: 'England', rate: 1.85 },
        { id: 'rsa', name: 'South Africa', rate: 1.95 },
      ],
    },
    {
      id: 'cricket-event-3',
      name: 'Pakistan vs New Zealand',
      status: 'Completed',
      startTime: 'Completed yesterday',
      sportType: 'cricket',
      participants: {
        home: { name: 'Pakistan', score: 152, subScore: 10 },
        away: { name: 'New Zealand', score: 153, subScore: 4 },
      },
      score: {
        status: 'Completed',
        detail: 'NZ won by 6 wickets',
        scoreDisplay: 'PAK 152 (19.4) vs NZ 153/4 (18.1)',
      },
      selections: [
        { id: 'pak', name: 'Pakistan', rate: 2.1 },
        { id: 'nzl', name: 'New Zealand', rate: 1.7 },
      ],
    },
  ],
};
