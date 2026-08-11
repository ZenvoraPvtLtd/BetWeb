import type { SportConfig } from '../../types/sports';

export const horseRacingConfig: SportConfig = {
  sportId: 'horse-racing',
  title: 'Horse Racing',
  initialEvents: [
    {
      id: 'horse-event-1',
      name: 'Ascot Gold Cup',
      status: 'Live',
      startTime: 'Race 3',
      sportType: 'horse-racing',
      participants: {
        home: { name: 'Thundering Blue', score: 1 },
        away: { name: 'Midnight Run', score: 2 },
      },
      score: {
        status: 'Live',
        detail: 'Race 3 - Final Stretch',
        scoreDisplay: 'Leader: Thundering Blue',
      },
      selections: [
        { id: 'tb', name: 'Thundering Blue', rate: 2.1 },
        { id: 'mr', name: 'Midnight Run', rate: 2.9 },
        { id: 'sd', name: 'Silent Dream', rate: 4.5 },
      ],
      meta: {
        raceNumber: 3,
        runners: [
          { name: 'Thundering Blue', position: 1 },
          { name: 'Midnight Run', position: 2 },
          { name: 'Silent Dream', position: 3 },
        ],
      },
    },
    {
      id: 'horse-event-2',
      name: 'Dubai World Cup',
      status: 'Upcoming',
      startTime: 'Starts in 1 day',
      sportType: 'horse-racing',
      participants: {
        home: { name: 'Desert King' },
        away: { name: 'Stormy Sea' },
      },
      selections: [
        { id: 'dk', name: 'Desert King', rate: 1.8 },
        { id: 'ss', name: 'Stormy Sea', rate: 2.2 },
      ],
    },
  ],
};
