export interface BetReportEntry {
  id: string;
  matchName: string;
  marketName: string;
  selectionName: string;
  type: 'BACK' | 'LAY';
  odds: string;
  stake: number;
  potentialReturn: number;
  status: 'OPEN' | 'WON' | 'LOST' | 'CANCELLED';
  placedAt: string;
  settledAt?: string;
  profitLoss?: number;
}

export interface AccountStatementEntry {
  id: string;
  date: string;
  description: string;
  type: 'Bet' | 'Win' | 'Loss' | 'Settlement' | 'Adjustment';
  credit?: number;
  debit?: number;
  balance: number;
}

export interface CurrentBetEntry {
  id: string;
  matchName: string;
  marketName: string;
  selectionName: string;
  type: 'BACK' | 'LAY';
  odds: string;
  stake: number;
  exposure: number;
  placedAt: string;
  status: 'OPEN';
  sport: string;
}

export interface DeletedBetEntry {
  id: string;
  matchName: string;
  marketName: string;
  selectionName: string;
  odds: string;
  stake: number;
  deletedBy: string;
  deletedAt: string;
  reason: string;
  status: 'DELETED';
}

export interface GameReportEntry {
  id: string;
  gameName: string;
  sportCategory: string;
  roundId: string;
  betsCount: number;
  stake: number;
  result: string;
  profitLoss: number;
  date: string;
  status: 'SETTLED' | 'CANCELLED';
}

export interface ProfitLossEntry {
  category: string;
  profit: number;
  loss: number;
  netPL: number;
  stake: number;
}

