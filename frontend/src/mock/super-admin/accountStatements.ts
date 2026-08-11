export interface AccountStatement {
  id: string;
  date: string; // ISO DateTime string
  credit: number;
  debit: number;
  balance: number;
  from: string;
  remark: string;
  username: string;
  type: string;
}

export const mockAccountStatements: AccountStatement[] = [
  {
    id: '1',
    date: '2026-08-04T09:15:00.000Z',
    credit: 0,
    debit: 500.00,
    balance: 99500.00,
    from: 'SUPERADMIN',
    remark: 'Limit adjustment debit charge',
    username: 'SUPERADMIN',
    type: 'Debit',
  },
  {
    id: '2',
    date: '2026-08-05T11:30:00.000Z',
    credit: 1250.00,
    debit: 0,
    balance: 100750.00,
    from: 'SUPERADMIN',
    remark: 'Deposit receipt reference #981273',
    username: 'SUPERADMIN',
    type: 'Credit',
  },
  {
    id: '3',
    date: '2026-08-06T14:45:00.000Z',
    credit: 0,
    debit: 131719.40,
    balance: -30969.40,
    from: 'SUPERADMIN',
    remark: 'Weekly settlement exchange book loss charge',
    username: 'SUPERADMIN',
    type: 'Debit',
  },
  {
    id: '4',
    date: '2026-08-07T16:20:00.000Z',
    credit: 50000.00,
    debit: 0,
    balance: 19030.60,
    from: 'SUPERADMIN',
    remark: 'Credit deposit token refund',
    username: 'SUPERADMIN',
    type: 'Credit',
  },
  {
    id: '5',
    date: '2026-08-08T10:10:00.000Z',
    credit: 0,
    debit: 150000.00,
    balance: -130969.40,
    from: 'SUPERADMIN',
    remark: 'Casino book P/L liability deduction',
    username: 'SUPERADMIN',
    type: 'Debit',
  },
  {
    id: '6',
    date: '2026-08-09T12:05:00.000Z',
    credit: 25000.00,
    debit: 0,
    balance: -105969.40,
    from: 'SUPERADMIN',
    remark: 'Settlement cash inward transfer',
    username: 'SUPERADMIN',
    type: 'Credit',
  },
  {
    id: '7',
    date: '2026-08-10T14:50:00.000Z',
    credit: 0,
    debit: 25750.00,
    balance: -131719.40,
    from: 'SUPERADMIN',
    remark: 'Premium client book settlement commission fee',
    username: 'SUPERADMIN',
    type: 'Debit',
  },
  {
    id: '8',
    date: '2026-08-05T10:00:00.000Z',
    credit: 15000.00,
    debit: 0,
    balance: 15000.00,
    from: 'ALEX_EXCHANGE',
    remark: 'Initial account credit loading',
    username: 'ALEX_EXCHANGE',
    type: 'Credit',
  },
  {
    id: '9',
    date: '2026-08-06T15:30:00.000Z',
    credit: 0,
    debit: 3400.00,
    balance: 11600.00,
    from: 'ALEX_EXCHANGE',
    remark: 'Settlement balance cash payment',
    username: 'ALEX_EXCHANGE',
    type: 'Debit',
  },
  {
    id: '10',
    date: '2026-08-08T09:12:00.000Z',
    credit: 8000.00,
    debit: 0,
    balance: 19600.00,
    from: 'ALEX_EXCHANGE',
    remark: 'Commission settlement profit transfer',
    username: 'ALEX_EXCHANGE',
    type: 'Credit',
  },
];
