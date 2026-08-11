export interface GameReport {
  id: string;
  eventType: string; // e.g. Cricket, Soccer, Tennis
  eventName: string; // e.g. India v Australia
  amount: number; // financial amount
  username: string; // user name for filtering
  date: string; // YYYY-MM-DD
}

export const mockGameReports: GameReport[] = [
  {
    id: 'gr1',
    eventType: 'Cricket',
    eventName: 'India v Australia',
    amount: 8500.00,
    username: 'ALEX_EXCHANGE',
    date: '2026-08-04',
  },
  {
    id: 'gr2',
    eventType: 'Soccer',
    eventName: 'Chelsea v Liverpool',
    amount: -1250.00,
    username: 'SUPERADMIN',
    date: '2026-08-05',
  },
  {
    id: 'gr3',
    eventType: 'Tennis',
    eventName: 'Djokovic v Alcaraz',
    amount: 5000.00,
    username: 'BETMAX_SUPER',
    date: '2026-08-06',
  },
  {
    id: 'gr4',
    eventType: 'Kabaddi',
    eventName: 'Patna Pirates v U Mumba',
    amount: 2200.00,
    username: 'WINNER_AGENT',
    date: '2026-08-07',
  },
  {
    id: 'gr5',
    eventType: 'Basketball',
    eventName: 'Lakers v Celtics',
    amount: -4500.00,
    username: 'ALEX_EXCHANGE',
    date: '2026-08-08',
  },
  {
    id: 'gr6',
    eventType: 'Cricket',
    eventName: 'India v Australia',
    amount: 15000.00,
    username: 'SUPERADMIN',
    date: '2026-08-09',
  },
  {
    id: 'gr7',
    eventType: 'Soccer',
    eventName: 'Real Madrid v Barcelona',
    amount: 3200.00,
    username: 'BETSTA_MASTER',
    date: '2026-08-10',
  },
  {
    id: 'gr8',
    eventType: 'Golf',
    eventName: 'Grand Prix Tournament',
    amount: 1200.00,
    username: 'ALEX_EXCHANGE',
    date: '2026-08-11',
  },
  {
    id: 'gr9',
    eventType: 'Cricket',
    eventName: 'T20 Blast Final',
    amount: -750.00,
    username: 'ROYAL_MASTER',
    date: '2026-08-11',
  },
  {
    id: 'gr10',
    eventType: 'E Games',
    eventName: 'Cyber Arena Championship',
    amount: 600.00,
    username: 'APEX_ADMIN',
    date: '2026-08-08',
  },
];
