export interface Announcement {
  id: string;
  text: string;
  date: string;
  type: 'info' | 'warning' | 'urgent';
}

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    text: 'System Update: Spot menu cricket card books have been updated. Ensure clients sync limits.',
    date: '2026-08-11',
    type: 'info',
  },
  {
    id: '2',
    text: 'Maintenance Alert: Core exchange databases will undergo optimization on Sunday, 04:00 AM IST.',
    date: '2026-08-10',
    type: 'warning',
  },
];
