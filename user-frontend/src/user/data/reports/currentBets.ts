import type { CurrentBetEntry } from '../../types/reports';

export const mockCurrentBets: CurrentBetEntry[] = [
  {
    id: 'cb-001',
    matchName: 'D Collins v O Jabeur',
    marketName: 'Match Odds',
    selectionName: 'D Collins',
    type: 'BACK',
    odds: '2.10',
    stake: 1500,
    exposure: 0,
    placedAt: '2026-08-11 23:45',
    status: 'OPEN',
    sport: 'Tennis'
  },
  {
    id: 'cb-002',
    matchName: 'Sydney Thunder v Hobart Hurricanes',
    marketName: 'Match Odds',
    selectionName: 'Sydney Thunder',
    type: 'LAY',
    odds: '1.65',
    stake: 800,
    exposure: 520, // (1.65 - 1) * 800
    placedAt: '2026-08-11 23:55',
    status: 'OPEN',
    sport: 'Cricket'
  }
];
