export interface ReportDefinition {
  id: string;
  label: string;
  slug: string;
  path: string;
  description: string;
  placeholderText: string;
}

export const reportsConfig: ReportDefinition[] = [
  {
    id: 'account-statement',
    label: "Account's Statement",
    slug: 'account-statement',
    path: '/admin/reports/account-statement',
    description: 'Detailed logs of ledger statement and transaction references.',
    placeholderText: "Account's Statement report content will be implemented here.",
  },
  {
    id: 'current-bets',
    label: 'Current Bets',
    slug: 'current-bets',
    path: '/admin/reports/current-bets',
    description: 'Active client slips and live matched bets tracker.',
    placeholderText: 'Current bets report content will be implemented here.',
  },
  {
    id: 'deleted-bets',
    label: 'Deleted Bets',
    slug: 'deleted-bets',
    path: '/admin/reports/deleted-bets',
    description: 'History logs of cancelled or voided matched bets.',
    placeholderText: 'Deleted bets report content will be implemented here.',
  },
  {
    id: 'game-reports',
    label: 'Game Reports',
    slug: 'game-reports',
    path: '/admin/reports/game-reports',
    description: 'Comprehensive analysis reports of exchange game providers.',
    placeholderText: 'Game reports content will be implemented here.',
  },
  {
    id: 'profit-loss',
    label: 'Profit And Loss',
    slug: 'profit-loss',
    path: '/admin/reports/profit-loss',
    description: 'Consolidated profit and loss statements for clients and games.',
    placeholderText: 'Profit and loss report content will be implemented here.',
  },
];
