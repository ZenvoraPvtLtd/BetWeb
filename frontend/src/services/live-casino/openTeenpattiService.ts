import { openTeenpattiConfig } from '../../config/liveCasino/openTeenpatti';
import type { TeenpattiRule } from '../../config/liveCasino/teenpatti20x20';
import type { MyBet } from './teenpatti20x20Service';

export interface OpenTeenpattiGameState {
  roundId: string | null;
  minBet: number | null;
  maxBet: number | null;
  status: 'loading' | 'waiting' | 'running' | 'suspended' | 'closed';
}

export const openTeenpattiService = {
  /**
   * Retrieves default placeholder game parameters.
   */
  getGameState(): Promise<OpenTeenpattiGameState> {
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
   * Retrieves specific Open Teenpatti payout rules.
   */
  getRules(): Promise<TeenpattiRule[]> {
    return Promise.resolve(openTeenpattiConfig.rules);
  },
};
