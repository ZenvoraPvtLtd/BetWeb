import type { MyBet } from './teenpatti20x20Service';

export interface OneDayTeenpattiGameState {
  roundId: string | null;
  minBet: number | null;
  maxBet: number | null;
  status: 'loading' | 'waiting' | 'running' | 'suspended' | 'closed';
}

export const oneDayTeenpattiService = {
  /**
   * Retrieves default placeholder game parameters.
   */
  getGameState(): Promise<OneDayTeenpattiGameState> {
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
};
