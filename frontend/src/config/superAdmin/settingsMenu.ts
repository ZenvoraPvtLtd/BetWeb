export interface SettingsMenuItem {
  id: string;
  label: string;
  slug: string;
  path: string;
}

export const settingsMenuConfig: SettingsMenuItem[] = [
  {
    id: 'block-markets',
    label: 'Block Markets',
    slug: 'block-markets',
    path: '/admin/settings/block-markets',
  },
  {
    id: 'messages',
    label: 'Messages',
    slug: 'messages',
    path: '/admin/settings/messages',
  },
  {
    id: 'add-match-list',
    label: 'Add Match List',
    slug: 'add-match-list',
    path: '/admin/settings/add-match-list',
  },
  {
    id: 'casino-list',
    label: 'Casino List',
    slug: 'casino-list',
    path: '/admin/settings/casino-list',
  },
  {
    id: 'payment-method',
    label: 'Payment Method',
    slug: 'payment-method',
    path: '/admin/settings/payment-method',
  },
];
