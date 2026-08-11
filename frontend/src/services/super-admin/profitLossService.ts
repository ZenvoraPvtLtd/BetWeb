import { mockProfitLossRecords } from '../../mock/super-admin/profitLoss';
import type { ProfitLossRecord } from '../../mock/super-admin/profitLoss';
import { getVisibleUsernames } from '../../utils/hierarchy';

export interface ProfitLossFilters {
  user?: string;
  startDate?: string;
  endDate?: string;
}

export const profitLossService = {
  /**
   * Retrieves profit/loss ledgers filtered by query parameters.
   */
  getProfitLoss(filters: ProfitLossFilters): Promise<ProfitLossRecord[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let results = [...mockProfitLossRecords];

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
          results = results.filter((record) =>
            record.username.toLowerCase().includes(userQuery)
          );
        }

        // 2. Start Date (normalized to start of day)
        if (filters.startDate) {
          const start = new Date(filters.startDate);
          start.setHours(0, 0, 0, 0);
          results = results.filter((record) => {
            const recordDate = new Date(record.date);
            recordDate.setHours(0, 0, 0, 0);
            return recordDate >= start;
          });
        }

        // 3. End Date (normalized to end of day)
        if (filters.endDate) {
          const end = new Date(filters.endDate);
          end.setHours(23, 59, 59, 999);
          results = results.filter((record) => {
            const recordDate = new Date(record.date);
            recordDate.setHours(0, 0, 0, 0);
            return recordDate <= end;
          });
        }

        resolve(results);
      }, 300);
    });
  },
};
