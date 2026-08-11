import type { BlockedMarket } from '../../types/settings';

export const mockBlockedMarkets: BlockedMarket[] = [
  {
    id: 'm-001',
    marketName: 'Match Odds',
    sport: 'Cricket',
    competition: 'International T20',
    status: 'AVAILABLE'
  },
  {
    id: 'm-002',
    marketName: 'Bookmaker 100-50',
    sport: 'Cricket',
    competition: 'Indian Premier League',
    status: 'AVAILABLE'
  },
  {
    id: 'm-003',
    marketName: 'Set 1 Winner',
    sport: 'Tennis',
    competition: 'Wimbledon Men Singles',
    status: 'AVAILABLE'
  },
  {
    id: 'm-054',
    marketName: 'Match Odds',
    sport: 'Soccer',
    competition: 'English Premier League',
    status: 'AVAILABLE'
  },
  {
    id: 'm-005',
    marketName: 'Over/Under 2.5 Goals',
    sport: 'Soccer',
    competition: 'UEFA Champions League',
    status: 'AVAILABLE'
  },
  {
    id: 'm-006',
    marketName: 'Match Winner',
    sport: 'Basketball',
    competition: 'NBA Championship',
    status: 'AVAILABLE'
  }
];
