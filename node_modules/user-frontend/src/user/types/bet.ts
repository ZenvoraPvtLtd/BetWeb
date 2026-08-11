export interface BetSelection {
  id: string; // Selection unique identifier
  matchId?: string;
  gameId?: string;
  teams?: string; // e.g. "India vs Australia"
  gameTitle?: string; // e.g. "20-20 Teenpatti"
  selectionName: string; // e.g. "India" or "Pair"
  marketName: string; // e.g. "Match Odds"
  odds: string;
  type: 'BACK' | 'LAY';
  minBet?: number;
  maxBet?: number;
}

export interface PlacedBet {
  no: number;
  username: string;
  nation: string;
  amount: number;
  rate: number;
  placeDate: string;
  matchDate: string;
  ipAddress: string;
  selectionName: string;
  marketName: string;
  type: 'BACK' | 'LAY';
}
