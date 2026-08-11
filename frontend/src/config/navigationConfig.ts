import { BarChart3, Users, ReceiptText, Dices, Settings2, type LucideIcon } from 'lucide-react';

export interface NavigationItem {
  label: string;
  icon: LucideIcon;
  to?: string;
  permission?: string;
  dropdownItems?: { label: string; to: string; permission?: string }[] | null;
}

export const navigationConfig: NavigationItem[] = [
  {
    label: 'Market Analysis',
    icon: BarChart3,
    to: '/admin/market-analysis',
    permission: 'market.view',
  },
  {
    label: 'List Of Clients',
    icon: Users,
    to: '/admin/clients',
    permission: 'clients.view',
  },
  {
    label: 'Reports',
    icon: ReceiptText,
    permission: 'reports.view',
    dropdownItems: [
      { label: "Account's Statement", to: '/admin/reports/account-statement' },
      { label: 'Current Bets', to: '/admin/reports/current-bets' },
      { label: 'Deleted Bets', to: '/admin/reports/deleted-bets' },
      { label: 'Game Reports', to: '/admin/reports/game-reports' },
      { label: 'Profit And Loss', to: '/admin/reports/profit-loss' },
    ],
  },
  {
    label: 'Live Casino',
    icon: Dices,
    permission: 'casino.view',
    dropdownItems: [
      { label: '20-20 Teenpatti', to: '/admin/live-casino/20-20-teenpatti' },
      { label: '1 Day Teenpatti', to: '/admin/live-casino/1-day-teenpatti' },
      { label: 'Open Teenpatti', to: '/admin/live-casino/open-teenpatti' },
    ],
  },
  {
    label: 'Settings',
    icon: Settings2,
    permission: 'settings.view',
    dropdownItems: [
      { label: 'Block Markets', to: '/admin/settings/block-markets' },
      { label: 'Messages', to: '/admin/settings/messages' },
      { label: 'Add Match List', to: '/admin/settings/add-match-list' },
      { label: 'Casino List', to: '/admin/settings/casino-list' },
      { label: 'Payment Method', to: '/admin/settings/payment-method' },
    ],
  },
];
