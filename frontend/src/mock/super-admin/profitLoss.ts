export interface ProfitLossRecord {
  id: string;
  eventType: string; // e.g. Cricket, Soccer, Tennis
  eventName: string; // e.g. India v Australia
  amount: number; // net financial amount
  username: string; // user name for filtering
  date: string; // YYYY-MM-DD
}

export const mockProfitLossRecords: ProfitLossRecord[] = [
  {
    id: 'pl1',
    eventType: 'Cricket',
    eventName: 'India v Australia',
    amount: 15000.00,
    username: 'ALEX_EXCHANGE',
    date: '2026-08-04',
  },
  {
    id: 'pl2',
    eventType: 'Soccer',
    eventName: 'Chelsea v Liverpool',
    amount: -3500.00,
    username: 'SUPERADMIN',
    date: '2026-08-05',
  },
  {
    id: 'pl3',
    eventType: 'Tennis',
    eventName: 'Djokovic v Alcaraz',
    amount: 8000.00,
    username: 'BETMAX_SUPER',
    date: '2026-08-06',
  },
  {
    id: 'pl4',
    eventType: 'Kabaddi',
    eventName: 'Patna Pirates v U Mumba',
    amount: -2200.00,
    username: 'WINNER_AGENT',
    date: '2026-08-07',
  },
  {
    id: 'pl5',
    eventType: 'Basketball',
    eventName: 'Lakers v Celtics',
    amount: -4500.00,
    username: 'ALEX_EXCHANGE',
    date: '2026-08-08',
  },
  {
    id: 'pl6',
    eventType: 'Cricket',
    eventName: 'India v Australia',
    amount: 25000.00,
    username: 'SUPERADMIN',
    date: '2026-08-09',
  },
  {
    id: 'pl7',
    eventType: 'Soccer',
    eventName: 'Real Madrid v Barcelona',
    amount: -12000.00,
    username: 'BETSTA_MASTER',
    date: '2026-08-10',
  },
  {
    id: 'pl8',
    eventType: 'Golf',
    eventName: 'Grand Prix Tournament',
    amount: 1200.00,
    username: 'ALEX_EXCHANGE',
    date: '2026-08-11',
  },
  {
    id: 'pl9',
    eventType: 'Cricket',
    eventName: 'T20 Blast Final',
    amount: -750.00,
    username: 'ROYAL_MASTER',
    date: '2026-08-11',
  },
  {
    id: 'pl10',
    eventType: 'E Games',
    eventName: 'Cyber Arena Championship',
    amount: 600.00,
    username: 'APEX_ADMIN',
    date: '2026-08-08',
  },
];
