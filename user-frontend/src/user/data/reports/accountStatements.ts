import type { AccountStatementEntry } from '../../types/reports';

export const mockAccountStatements: AccountStatementEntry[] = [
  {
    id: 'tx-001',
    date: '2026-08-11 21:06',
    description: 'Teenpatti 20-20 Trio Win Settlement',
    type: 'Win',
    credit: 5800,
    balance: 50000.00
  },
  {
    id: 'tx-002',
    date: '2026-08-11 21:05',
    description: 'Teenpatti 20-20 Trio Bet Placed',
    type: 'Bet',
    debit: 200,
    balance: 44200.00
  },
  {
    id: 'tx-003',
    date: '2026-08-11 20:00',
    description: 'BBL: Hobart Hurricanes Lay Bet Loss Settlement',
    type: 'Loss',
    debit: 1000,
    balance: 44400.00
  },
  {
    id: 'tx-004',
    date: '2026-08-11 18:00',
    description: 'T20: India Women v Ireland Women Win Settlement',
    type: 'Win',
    credit: 250,
    balance: 45400.00
  },
  {
    id: 'tx-005',
    date: '2026-08-10 13:00',
    description: 'T20: Wellington Blaze Win Settlement',
    type: 'Win',
    credit: 500,
    balance: 45150.00
  },
  {
    id: 'tx-006',
    date: '2026-08-10 12:00',
    description: 'BBL: Melbourne Stars Cancelled Bet Refunded',
    type: 'Adjustment',
    credit: 1200,
    balance: 44650.00
  },
  {
    id: 'tx-007',
    date: '2026-08-10 11:30',
    description: 'BBL: Melbourne Stars Bet Placed',
    type: 'Bet',
    debit: 1200,
    balance: 43450.00
  },
  {
    id: 'tx-008',
    date: '2026-08-09 18:24',
    description: 'Baccarat Banker Win Settlement',
    type: 'Win',
    credit: 950,
    balance: 44650.00
  },
  {
    id: 'tx-009',
    date: '2026-08-09 14:00',
    description: 'BPL: Chittagong Kings Lay Bet Placed',
    type: 'Bet',
    debit: 600,
    balance: 43700.00
  },
  {
    id: 'tx-010',
    date: '2026-08-08 12:00',
    description: 'Welcome Virtual Mock Balance Allocation',
    type: 'Adjustment',
    credit: 44300,
    balance: 44300.00
  }
];
export const openingBalance = 44300.00;
export const currentBalance = 50000.00;
