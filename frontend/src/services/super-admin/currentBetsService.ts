import { mockCurrentBets } from '../../mock/super-admin/currentBets';
import type { CurrentBet } from '../../mock/super-admin/currentBets';
import { getVisibleUsernames } from '../../utils/hierarchy';

export interface CurrentBetsFilters {
  user?: string;
  searchByName?: string;
  sport?: string;
  startDateTime?: string;
  endDateTime?: string;
}

// Track active records in-memory to support real mock deletions
let activeBets = [...mockCurrentBets];

export const currentBetsService = {
  /**
   * Retrieves unsettled bets with dynamic filters and latency.
   */
  getCurrentBets(filters: CurrentBetsFilters): Promise<CurrentBet[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let results = [...activeBets];

        // Enforce role-based hierarchy data isolation
        const visibleUsernames = getVisibleUsernames();
        if (visibleUsernames !== null) {
          results = results.filter((item) =>
            visibleUsernames.includes(item.username.toLowerCase())
          );
        }

        // 1. User Filter
        if (filters.user && filters.user.trim() !== '') {
          const userQuery = filters.user.trim().toLowerCase();
          results = results.filter((bet) => bet.username.toLowerCase().includes(userQuery));
        }

        // 2. Search By Name Filter
        if (filters.searchByName && filters.searchByName.trim() !== '') {
          const nameQuery = filters.searchByName.trim().toLowerCase();
          results = results.filter((bet) => bet.eventName.toLowerCase().includes(nameQuery));
        }

        // 3. Sport Filter
        if (filters.sport && filters.sport !== 'All') {
          results = results.filter((bet) => bet.sport === filters.sport);
        }

        // 4. Start DateTime Filter
        if (filters.startDateTime) {
          const start = new Date(filters.startDateTime).getTime();
          results = results.filter((bet) => new Date(bet.placeDate).getTime() >= start);
        }

        // 5. End DateTime Filter
        if (filters.endDateTime) {
          const end = new Date(filters.endDateTime).getTime();
          results = results.filter((bet) => new Date(bet.placeDate).getTime() <= end);
        }

        resolve(results);
      }, 300);
    });
  },

  /**
   * Simulates data deletion locally in memory.
   */
  deleteCurrentBets(ids: string[]): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        activeBets = activeBets.filter((bet) => !ids.includes(bet.id));
        resolve(true);
      }, 200);
    });
  },

  /**
   * Restores the default mock dataset.
   */
  resetDatabase(): void {
    activeBets = [...mockCurrentBets];
  }
};
