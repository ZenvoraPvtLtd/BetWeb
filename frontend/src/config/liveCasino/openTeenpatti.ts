import type { TeenpattiRule } from './teenpatti20x20';

export interface OpenTeenpattiGameConfig {
  id: string;
  name: string;
  category: string;
  roundId: string | null;
  minBet: number | null;
  maxBet: number | null;
  rules: TeenpattiRule[];
}

export const openTeenpattiConfig: OpenTeenpattiGameConfig = {
  id: 'open-teenpatti',
  name: 'Open Teenpatti',
  category: 'Live Casino',
  roundId: null,
  minBet: null,
  maxBet: null,
  rules: [
    { id: 'pair-double', name: 'Pair (Double)', payout: '1 To 1' },
    { id: 'flush-color', name: 'Flush (Color)', payout: '1 To 4' },
    { id: 'straight', name: 'Straight (Rown)', payout: '1 To 6' },
    { id: 'trio-teen', name: 'Trio (Teen)', payout: '1 To 30' },
    { id: 'straight-flush', name: 'Straight Flush (Pakki Rown)', payout: '1 To 40' },
  ],
};
