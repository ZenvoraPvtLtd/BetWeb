import type { SportConfig } from '../../types/sports';

export const snookerConfig: SportConfig = {
  sportId: 'snooker',
  title: 'Snooker',
  initialEvents: [
    {
      id: 'snooker-event-1',
      name: "Ronnie O'Sullivan vs Judd Trump",
      status: 'Live',
      startTime: 'Live Now',
      sportType: 'snooker',
      participants: {
        home: { name: "Ronnie O'Sullivan", score: 62, subScore: '5' },
        away: { name: 'Judd Trump', score: 12, subScore: '4' },
      },
      score: {
        status: 'Live',
        detail: 'Frame 10',
        scoreDisplay: 'Frames: 5 - 4 | Break: 45',
      },
      selections: [
        { id: 'ron', name: "O'Sullivan", rate: 1.5 },
        { id: 'jud', name: 'Trump', rate: 2.5 },
      ],
      meta: {
        frame: 10,
        framesHome: 5,
        framesAway: 4,
        pointsHome: 62,
        pointsAway: 12,
        break: 45,
      },
    },
    {
      id: 'snooker-event-2',
      name: 'Mark Selby vs John Higgins',
      status: 'Upcoming',
      startTime: 'Starts in 1 day',
      sportType: 'snooker',
      participants: {
        home: { name: 'Mark Selby' },
        away: { name: 'John Higgins' },
      },
      selections: [
        { id: 'sel', name: 'Selby', rate: 1.7 },
        { id: 'hig', name: 'Higgins', rate: 2.1 },
      ],
    },
  ],
};
