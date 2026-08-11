export interface DeletedBet {
  id: string;
  uplevel: string;
  username: string;
  eventName: string;
  nation: string;
  eventType: string; // e.g. Back / Lay
  type: string; // e.g. Match Odds, Bookmaker
  sport: string; // aligned with sportsConfig slugs
  rate: number;
  amount: number;
  pnl: number;
  placeDate: string; // ISO DateTime string
  deletedAt?: string; // ISO DateTime string
  status: 'deleted';
}

export const mockDeletedBets: DeletedBet[] = [
  {
    id: 'db1',
    uplevel: 'superadmin',
    username: 'ALEX_EXCHANGE',
    eventName: 'India v Australia',
    nation: 'India',
    eventType: 'Back',
    type: 'Match Odds',
    rate: 1.85,
    amount: 1000.00,
    pnl: 850.00,
    placeDate: '2026-08-04T12:00:00.000Z',
    deletedAt: '2026-08-04T12:05:00.000Z',
    sport: 'cricket',
    status: 'deleted',
  },
  {
    id: 'db2',
    uplevel: 'superadmin',
    username: 'BETMAX_SUPER',
    eventName: 'Chelsea v Liverpool',
    nation: 'Draw',
    eventType: 'Lay',
    type: 'Match Odds',
    rate: 3.40,
    amount: 1200.00,
    pnl: -2880.00,
    placeDate: '2026-08-05T14:30:00.000Z',
    deletedAt: '2026-08-05T14:38:00.000Z',
    sport: 'soccer',
    status: 'deleted',
  },
  {
    id: 'db3',
    uplevel: 'superadmin',
    username: 'WINNER_AGENT',
    eventName: 'Djokovic v Alcaraz',
    nation: 'Djokovic',
    eventType: 'Back',
    type: 'Match Odds',
    rate: 1.75,
    amount: 500.00,
    pnl: 375.00,
    placeDate: '2026-08-06T10:15:00.000Z',
    deletedAt: '2026-08-06T10:22:00.000Z',
    sport: 'tennis',
    status: 'deleted',
  },
  {
    id: 'db4',
    uplevel: 'superadmin',
    username: 'CHAMPION_EXCH',
    eventName: 'Patna Pirates v U Mumba',
    nation: 'U Mumba',
    eventType: 'Lay',
    type: 'Match Odds',
    rate: 2.10,
    amount: 800.00,
    pnl: -880.00,
    placeDate: '2026-08-07T19:00:00.000Z',
    deletedAt: '2026-08-07T19:12:00.000Z',
    sport: 'kabaddi',
    status: 'deleted',
  },
  {
    id: 'db5',
    uplevel: 'superadmin',
    username: 'BETSTA_MASTER',
    eventName: 'India v Australia',
    nation: 'Australia',
    eventType: 'Back',
    type: 'Match Odds',
    rate: 2.20,
    amount: 1500.00,
    pnl: 1800.00,
    placeDate: '2026-08-08T15:20:00.000Z',
    deletedAt: '2026-08-08T15:33:00.000Z',
    sport: 'cricket',
    status: 'deleted',
  },
];
