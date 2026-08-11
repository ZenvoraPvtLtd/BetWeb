import type { ProfitLossEntry } from '../../types/reports';

export const mockProfitLoss: ProfitLossEntry[] = [
  {
    category: 'CRICKET',
    profit: 5250,
    loss: 1000,
    netPL: 4250,
    stake: 8000
  },
  {
    category: 'TENNIS',
    profit: 0,
    loss: 1200,
    netPL: -1200,
    stake: 2000
  },
  {
    category: 'TEENPATTI',
    profit: 5800,
    loss: 500,
    netPL: 5300,
    stake: 1900
  },
  {
    category: 'CASINO',
    profit: 1750,
    loss: 1500,
    netPL: 250,
    stake: 3500
  }
];
export const totalProfit = 12800;
export const totalLoss = 4200;
export const netPL = 8600;
export const totalStake = 15400;
