import { teenpatti20x20Config } from '../../config/liveCasino/teenpatti20x20';
import type { TeenpattiRule } from '../../config/liveCasino/teenpatti20x20';

export interface MyBet {
  id: string;
  username: string;
  nation: string;
  amount: number;
  rate: number;
  placeDate: string;
  matchDate: string;
  ip: string;
}

export interface TeenpattiGameState {
  roundId: string | null;
  minBet: number | null;
  maxBet: number | null;
  status: 'loading' | 'waiting' | 'running' | 'suspended' | 'closed';
}

export const teenpatti20x20Service = {
  /**
   * Retrieves default placeholder game parameters.
   */
  getGameState(): Promise<TeenpattiGameState> {
    return Promise.resolve({
      roundId: null,
      minBet: null,
      maxBet: null,
      status: 'closed',
    });
  },

  /**
   * Retrieves placed bets (empty dataset).
   */
  getMyBets(): Promise<MyBet[]> {
    return Promise.resolve([]);
  },

  /**
   * Retrieves Pair Plus payout rules.
   */
  getRules(): Promise<TeenpattiRule[]> {
    return Promise.resolve(teenpatti20x20Config.rules);
  },
};
