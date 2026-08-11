import { mockAccountStatements } from '../../mock/super-admin/accountStatements';
import type { AccountStatement } from '../../mock/super-admin/accountStatements';
import { getVisibleUsernames } from '../../utils/hierarchy';

export interface AccountStatementFilters {
  user?: string;
  startDate?: string;
  endDate?: string;
  type?: string;
}

export const accountStatementService = {
  /**
   * Filter ledger statements dynamically using search terms, type categories, and date intervals.
   */
  getAccountStatements(filters: AccountStatementFilters): Promise<AccountStatement[]> {
    return new Promise((resolve) => {
      // Simulate brief network response lag (300ms)
      setTimeout(() => {
        let results = [...mockAccountStatements];

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
          results = results.filter((item) =>
            item.username.toLowerCase().includes(userQuery)
          );
        }

        // 2. Date Range Filters (Normalized to start and end of day)
        if (filters.startDate) {
          const start = new Date(filters.startDate);
          start.setHours(0, 0, 0, 0);
          results = results.filter((item) => new Date(item.date) >= start);
        }

        if (filters.endDate) {
          const end = new Date(filters.endDate);
          end.setHours(23, 59, 59, 999);
          results = results.filter((item) => new Date(item.date) <= end);
        }

        // 3. Transaction Type Filter
        if (filters.type && filters.type !== 'All') {
          results = results.filter((item) => item.type === filters.type);
        }

        resolve(results);
      }, 300);
    });
  },
};
