import { mockDeletedBets } from '../../mock/super-admin/deletedBets';
import type { DeletedBet } from '../../mock/super-admin/deletedBets';
import { getVisibleUsernames } from '../../utils/hierarchy';

export interface DeletedBetsFilters {
  user?: string;
  searchByName?: string;
  sport?: string;
  startDateTime?: string;
  endDateTime?: string;
}

// Track active records in memory to support mock deletion processes
let activeDeletedBets = [...mockDeletedBets];

export const deletedBetsService = {
  /**
   * Retrieves deleted bets list based on filters.
   */
  getDeletedBets(filters: DeletedBetsFilters): Promise<DeletedBet[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let results = [...activeDeletedBets];

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
   * Mock deletion method to clear items in-memory.
   */
  deleteDeletedBets(ids: string[]): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        activeDeletedBets = activeDeletedBets.filter((bet) => !ids.includes(bet.id));
        resolve(true);
      }, 200);
    });
  },

  /**
   * Restores the default mock database list.
   */
  resetDatabase(): void {
    activeDeletedBets = [...mockDeletedBets];
  }
};
