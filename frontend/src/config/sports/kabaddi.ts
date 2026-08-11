import type { SportConfig } from '../../types/sports';

export const kabaddiConfig: SportConfig = {
  sportId: 'kabaddi',
  title: 'Kabaddi',
  initialEvents: [
    {
      id: 'kabaddi-event-1',
      name: 'Jaipur Panthers vs U Mumba',
      status: 'Live',
      startTime: 'Live Now',
      sportType: 'kabaddi',
      participants: {
        home: { name: 'Jaipur Panthers', score: 28 },
        away: { name: 'U Mumba', score: 24 },
      },
      score: {
        status: 'Live',
        detail: 'Raid: Jaipur (Empty)',
        scoreDisplay: '28 - 24',
      },
      selections: [
        { id: 'jpi', name: 'Jaipur', rate: 1.4 },
        { id: 'mumba', name: 'U Mumba', rate: 2.65 },
      ],
      meta: {
        timer: 1440, // 24m 0s
        raidStatus: 'Jaipur Raid (Active)',
      },
    },
    {
      id: 'kabaddi-event-2',
      name: 'Bengaluru Bulls vs Patna Pirates',
      status: 'Upcoming',
      startTime: 'Starts in 5 hours',
      sportType: 'kabaddi',
      participants: {
        home: { name: 'Bengaluru Bulls' },
        away: { name: 'Patna Pirates' },
      },
      selections: [
        { id: 'ben', name: 'Bengaluru', rate: 1.8 },
        { id: 'pat', name: 'Patna', rate: 1.9 },
      ],
    },
  ],
};
