import type { SportConfig } from '../../types/sports';

export const golfConfig: SportConfig = {
  sportId: 'golf',
  title: 'Golf',
  initialEvents: [
    {
      id: 'golf-event-1',
      name: 'Masters Open Championship',
      status: 'Live',
      startTime: 'Round 3',
      sportType: 'golf',
      participants: {
        home: { name: 'Player A', score: '-4', subScore: '1' },
        away: { name: 'Player B', score: '-2', subScore: '2' },
      },
      score: {
        status: 'Live',
        detail: 'Hole 14',
        scoreDisplay: 'Leader: Player A (-4)',
      },
      selections: [
        { id: 'pla', name: 'Player A', rate: 1.65 },
        { id: 'plb', name: 'Player B', rate: 2.75 },
      ],
      meta: {
        hole: 14,
        players: [
          { name: 'Player A', score: -4, hole: 14, position: 1 },
          { name: 'Player B', score: -2, hole: 14, position: 2 },
          { name: 'Player C', score: '+1', hole: 13, position: 3 },
        ],
      },
    },
    {
      id: 'golf-event-2',
      name: 'PGA Tour Invitational',
      status: 'Upcoming',
      startTime: 'Starts in 3 days',
      sportType: 'golf',
      participants: {
        home: { name: 'Player A' },
        away: { name: 'Player B' },
      },
      selections: [
        { id: 'pla', name: 'Player A', rate: 1.9 },
        { id: 'plb', name: 'Player B', rate: 1.9 },
      ],
    },
  ],
};
