import type { Match } from '../../types/settings';

export const mockAvailableMatches: Match[] = [
  {
    id: 'am-001',
    sport: 'Cricket',
    sportIcon: 'Trophy',
    competition: 'International T20',
    matchName: 'India v Australia',
    date: 'Today',
    time: '07:30 PM',
    status: 'ADD'
  },
  {
    id: 'am-002',
    sport: 'Cricket',
    sportIcon: 'Trophy',
    competition: 'The Hundred Men',
    matchName: 'London Spirit v Oval Invincibles',
    date: 'Today',
    time: '11:00 PM',
    status: 'ADDED'
  },
  {
    id: 'am-003',
    sport: 'Tennis',
    sportIcon: 'Play',
    competition: 'Cincinnati Open',
    matchName: 'Carlos Alcaraz v Jannik Sinner',
    date: 'Tomorrow',
    time: '08:00 PM',
    status: 'ADD'
  },
  {
    id: 'am-004',
    sport: 'Soccer',
    sportIcon: 'Sparkles',
    competition: 'La Liga Santander',
    matchName: 'Real Madrid v Barcelona',
    date: '2026-08-15',
    time: '10:00 PM',
    status: 'ADD'
  },
  {
    id: 'am-005',
    sport: 'Horse Racing',
    sportIcon: 'Trophy',
    competition: 'Ascot Derby Stakes',
    matchName: 'Race 3: Royal Ascot',
    date: 'Tomorrow',
    time: '04:15 PM',
    status: 'ADD'
  }
];
