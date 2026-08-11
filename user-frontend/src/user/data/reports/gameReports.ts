import type { GameReportEntry } from '../../types/reports';

export const mockGameReports: GameReportEntry[] = [
  {
    id: 'gr-001',
    gameName: '20-20 Teenpatti',
    sportCategory: 'TEENPATTI',
    roundId: 'Round #482193',
    betsCount: 2,
    stake: 1200,
    result: 'Trio (Three of a Kind)',
    profitLoss: 5800,
    date: '2026-08-11 21:06',
    status: 'SETTLED'
  },
  {
    id: 'gr-002',
    gameName: 'Roulette Table A',
    sportCategory: 'CASINO',
    roundId: 'Round #849201',
    betsCount: 1,
    stake: 800,
    result: 'Red Outcome (Number 14)',
    profitLoss: 800,
    date: '2026-08-11 22:22',
    status: 'SETTLED'
  },
  {
    id: 'gr-003',
    gameName: '1 Day Teenpatti',
    sportCategory: 'TEENPATTI',
    roundId: 'Round #102492',
    betsCount: 1,
    stake: 500,
    result: 'Dealer Win',
    profitLoss: -500,
    date: '2026-08-10 15:42',
    status: 'SETTLED'
  },
  {
    id: 'gr-004',
    gameName: 'Baccarat Royal',
    sportCategory: 'BACCARAT',
    roundId: 'Round #382941',
    betsCount: 1,
    stake: 1000,
    result: 'Banker Win (8 points)',
    profitLoss: 950,
    date: '2026-08-09 18:24',
    status: 'SETTLED'
  },
  {
    id: 'gr-005',
    gameName: 'Lucky 7 - A',
    sportCategory: 'LOTTERY',
    roundId: 'Round #729482',
    betsCount: 2,
    stake: 1500,
    result: 'Dealer Cancelled',
    profitLoss: 0,
    date: '2026-08-08 16:30',
    status: 'CANCELLED'
  }
];
