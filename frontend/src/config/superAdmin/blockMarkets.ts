export interface SportMarketItem {
  id: string;
  name: string;
  slug: string;
  path: string;
}

export const sportMarketConfig: SportMarketItem[] = [
  {
    id: 'golf',
    name: 'Golf',
    slug: 'golf',
    path: '/admin/settings/block-markets/golf',
  },
  {
    id: 'kabaddi',
    name: 'Kabaddi',
    slug: 'kabaddi',
    path: '/admin/settings/block-markets/kabaddi',
  },
  {
    id: 'e-games',
    name: 'E Games',
    slug: 'e-games',
    path: '/admin/settings/block-markets/e-games',
  },
  {
    id: 'soccer',
    name: 'Soccer',
    slug: 'soccer',
    path: '/admin/settings/block-markets/soccer',
  },
  {
    id: 'horse-racing',
    name: 'Horse Racing',
    slug: 'horse-racing',
    path: '/admin/settings/block-markets/horse-racing',
  },
  {
    id: 'tennis',
    name: 'Tennis',
    slug: 'tennis',
    path: '/admin/settings/block-markets/tennis',
  },
  {
    id: 'basketball',
    name: 'Basketball',
    slug: 'basketball',
    path: '/admin/settings/block-markets/basketball',
  },
  {
    id: 'futsal',
    name: 'Futsal',
    slug: 'futsal',
    path: '/admin/settings/block-markets/futsal',
  },
  {
    id: 'cricket',
    name: 'Cricket',
    slug: 'cricket',
    path: '/admin/settings/block-markets/cricket',
  },
  {
    id: 'table-tennis',
    name: 'Table Tennis',
    slug: 'table-tennis',
    path: '/admin/settings/block-markets/table-tennis',
  },
  {
    id: 'volleyball',
    name: 'Volleyball',
    slug: 'volleyball',
    path: '/admin/settings/block-markets/volleyball',
  },
  {
    id: 'snooker',
    name: 'Snooker',
    slug: 'snooker',
    path: '/admin/settings/block-markets/snooker',
  },
  {
    id: 'greyhound-racing',
    name: 'Greyhound Racing',
    slug: 'greyhound-racing',
    path: '/admin/settings/block-markets/greyhound-racing',
  },
];
