import { mockGameReports } from '../../mock/super-admin/gameReports';
import type { GameReport } from '../../mock/super-admin/gameReports';
import { getVisibleUsernames } from '../../utils/hierarchy';

export interface GameReportFilters {
  user?: string;
  startDate?: string;
  endDate?: string;
}

export const gameReportsService = {
  /**
   * Retrieves game report ledgers filtered by query parameters.
   */
  getGameReports(filters: GameReportFilters): Promise<GameReport[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let results = [...mockGameReports];

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
          results = results.filter((report) =>
            report.username.toLowerCase().includes(userQuery)
          );
        }

        // 2. Start Date Boundary (date only, normalized to beginning of day)
        if (filters.startDate) {
          const start = new Date(filters.startDate);
          start.setHours(0, 0, 0, 0);
          results = results.filter((report) => {
            const rDate = new Date(report.date);
            rDate.setHours(0, 0, 0, 0);
            return rDate >= start;
          });
        }

        // 3. End Date Boundary (date only, normalized to end of day)
        if (filters.endDate) {
          const end = new Date(filters.endDate);
          end.setHours(23, 59, 59, 999);
          results = results.filter((report) => {
            const rDate = new Date(report.date);
            rDate.setHours(0, 0, 0, 0);
            return rDate <= end;
          });
        }

        resolve(results);
      }, 300);
    });
  },
};
