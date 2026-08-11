import type { DeletedBetEntry } from '../../types/reports';

export const mockDeletedBets: DeletedBetEntry[] = [
  {
    id: 'db-001',
    matchName: 'Melbourne Stars v Sydney Sixers',
    marketName: 'Match Odds',
    selectionName: 'Melbourne Stars',
    odds: '2.05',
    stake: 1200,
    deletedBy: 'Moderator',
    deletedAt: '2026-08-10 12:00',
    reason: 'Match Abandoned due to Persistent Rain',
    status: 'DELETED'
  },
  {
    id: 'db-002',
    matchName: '20-20 Teenpatti',
    marketName: 'Main Board',
    selectionName: 'Straight Flush',
    odds: '40.0',
    stake: 500,
    deletedBy: 'System',
    deletedAt: '2026-08-08 14:15',
    reason: 'Invalid session state / Feed error',
    status: 'DELETED'
  }
];
