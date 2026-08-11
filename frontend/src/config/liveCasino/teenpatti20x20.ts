export interface TeenpattiRule {
  id: string;
  name: string;
  payout: string;
}

export interface TeenpattiGameConfig {
  id: string;
  name: string;
  category: string;
  roundId: string | null;
  minBet: number | null;
  maxBet: number | null;
  rules: TeenpattiRule[];
}

export const teenpatti20x20Config: TeenpattiGameConfig = {
  id: '20-20-teenpatti',
  name: '20-20 Teenpatti',
  category: 'Live Casino',
  roundId: null,
  minBet: null,
  maxBet: null,
  rules: [
    { id: 'r1', name: 'Pair (Double)', payout: '1 To 1' },
    { id: 'r2', name: 'Flush (Color)', payout: '1 To 4' },
    { id: 'r3', name: 'Straight (Rown)', payout: '1 To 6' },
    { id: 'r4', name: 'Trio (Teen)', payout: '1 To 35' },
    { id: 'r5', name: 'Straight Flush (Pakki Rown)', payout: '1 To 45' },
  ],
};
