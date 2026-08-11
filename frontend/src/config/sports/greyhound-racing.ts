import type { SportConfig } from '../../types/sports';

export const greyhoundRacingConfig: SportConfig = {
  sportId: 'greyhound-racing',
  title: 'Greyhound Racing',
  initialEvents: [
    {
      id: 'greyhound-event-1',
      name: 'Wimbledon Greyhound Derby',
      status: 'Live',
      startTime: 'Race 2',
      sportType: 'greyhound-racing',
      participants: {
        home: { name: 'Fast Jack', score: 1 },
        away: { name: 'Slick Sally', score: 2 },
      },
      score: {
        status: 'Live',
        detail: 'Race 2 - Final Bend',
        scoreDisplay: 'Leader: Fast Jack',
      },
      selections: [
        { id: 'fj', name: 'Fast Jack', rate: 2.3 },
        { id: 'ss', name: 'Slick Sally', rate: 2.7 },
        { id: 'bb', name: 'Blue Bomber', rate: 3.8 },
      ],
      meta: {
        raceNumber: 2,
        runners: [
          { name: 'Fast Jack', position: 1 },
          { name: 'Slick Sally', position: 2 },
          { name: 'Blue Bomber', position: 3 },
        ],
      },
    },
    {
      id: 'greyhound-event-2',
      name: 'Towcester Gold Cup',
      status: 'Upcoming',
      startTime: 'Starts in 2 hours',
      sportType: 'greyhound-racing',
      participants: {
        home: { name: 'Desert Wind' },
        away: { name: 'Black Velvet' },
      },
      selections: [
        { id: 'dw', name: 'Desert Wind', rate: 1.9 },
        { id: 'bv', name: 'Black Velvet', rate: 1.9 },
      ],
    },
  ],
};
