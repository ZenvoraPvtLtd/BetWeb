import type { Match } from '../types/matches';
import { allSportsMatches } from './marketData';

export const userMatches: Match[] = [
  {
    id: 'm1',
    sport: 'Tennis',
    competition: 'ATP Tour Adelaide',
    teams: 'Zhukayev v Mi Braswell',
    date: 'Today',
    time: '3:30 PM',
    isLive: true,
    scoreDisplay: '6-4, 2-1 (30-15)',
    marketsCount: 24,
    markets: [
      {
        name: 'Match Odds',
        selections: [
          { name: 'Zhukayev', backPrice: '1.92', layPrice: '2.02' },
          { name: 'Draw', backPrice: '12.0', layPrice: '15.0' },
          { name: 'Mi Braswell', backPrice: '1.85', layPrice: '1.95' }
        ]
      }
    ]
  },
  {
    id: 'm2',
    sport: 'Tennis',
    competition: 'WTA Shenzhen Open',
    teams: 'D Collins v O Jabeur',
    date: 'Today',
    time: '3:45 PM',
    isLive: true,
    scoreDisplay: '4-6, 1-0',
    marketsCount: 18,
    markets: [
      {
        name: 'Match Odds',
        selections: [
          { name: 'D Collins', backPrice: '2.10', layPrice: '2.20' },
          { name: 'Draw', backPrice: '9.5', layPrice: '11.0' },
          { name: 'O Jabeur', backPrice: '1.72', layPrice: '1.82' }
        ]
      }
    ]
  },
  {
    id: 'm3',
    sport: 'Cricket',
    competition: 'Big Bash League',
    teams: 'Sydney Thunder v Hobart Hurricanes',
    date: 'Today',
    time: '4:00 PM',
    isLive: true,
    scoreDisplay: '142/3 (15.4 ov)',
    marketsCount: 32,
    markets: [
      {
        name: 'Match Odds',
        selections: [
          { name: 'Sydney Thunder', backPrice: '1.55', layPrice: '1.65' },
          { name: 'Draw', backPrice: '---', layPrice: '---' },
          { name: 'Hobart Hurricanes', backPrice: '2.40', layPrice: '2.50' }
        ]
      }
    ]
  },
  {
    id: 'm4',
    sport: 'Cricket',
    competition: 'Super Smash Women',
    teams: 'Wellington Blaze Women v Central Hinds Women',
    date: 'Today',
    time: '4:15 PM',
    isLive: true,
    scoreDisplay: '98/1 (11.0 ov)',
    marketsCount: 14,
    markets: [
      {
        name: 'Match Odds',
        selections: [
          { name: 'Wellington Blaze Women', backPrice: '1.25', layPrice: '1.35' },
          { name: 'Draw', backPrice: '---', layPrice: '---' },
          { name: 'Central Hinds Women', backPrice: '4.20', layPrice: '4.50' }
        ]
      }
    ]
  },
  {
    id: 'm5',
    sport: 'Cricket',
    competition: 'Super Smash League',
    teams: 'Wellington Firebirds v Central Stags',
    date: 'Today',
    time: '6:00 PM',
    isLive: true,
    marketsCount: 22,
    markets: [
      {
        name: 'Match Odds',
        selections: [
          { name: 'Wellington Firebirds', backPrice: '1.80', layPrice: '1.90' },
          { name: 'Draw', backPrice: '---', layPrice: '---' },
          { name: 'Central Stags', backPrice: '2.00', layPrice: '2.10' }
        ]
      }
    ]
  },
  {
    id: 'm6',
    sport: 'Cricket',
    competition: 'Ranji Trophy',
    teams: 'Rajasthan v Tamil Nadu',
    date: 'Tomorrow',
    time: '9:30 AM',
    isLive: false,
    marketsCount: 16,
    markets: [
      {
        name: 'Match Odds',
        selections: [
          { name: 'Rajasthan', backPrice: '2.20', layPrice: '2.30' },
          { name: 'Draw', backPrice: '3.4', layPrice: '3.6' },
          { name: 'Tamil Nadu', backPrice: '2.60', layPrice: '2.70' }
        ]
      }
    ]
  },
  {
    id: 'm7',
    sport: 'Cricket',
    competition: 'Ranji Trophy',
    teams: 'Haryana v Bengal',
    date: 'Tomorrow',
    time: '9:30 AM',
    isLive: false,
    marketsCount: 16,
    markets: [
      {
        name: 'Match Odds',
        selections: [
          { name: 'Haryana', backPrice: '1.90', layPrice: '2.00' },
          { name: 'Draw', backPrice: '3.2', layPrice: '3.4' },
          { name: 'Bengal', backPrice: '2.10', layPrice: '2.20' }
        ]
      }
    ]
  },
  {
    id: 'm8',
    sport: 'Cricket',
    competition: 'Big Bash League',
    teams: 'Melbourne Stars v Sydney Sixers',
    date: 'Tomorrow',
    time: '1:45 PM',
    isLive: false,
    marketsCount: 45,
    markets: [
      {
        name: 'Match Odds',
        selections: [
          { name: 'Melbourne Stars', backPrice: '2.05', layPrice: '2.15' },
          { name: 'Draw', backPrice: '---', layPrice: '---' },
          { name: 'Sydney Sixers', backPrice: '1.78', layPrice: '1.88' }
        ]
      }
    ]
  },
  {
    id: 'm9',
    sport: 'Cricket',
    competition: 'Bangladesh Premier League',
    teams: 'Dhaka Capital v Chittagong Kings',
    date: 'Tomorrow',
    time: '3:00 PM',
    isLive: false,
    marketsCount: 28,
    markets: [
      {
        name: 'Match Odds',
        selections: [
          { name: 'Dhaka Capital', backPrice: '1.85', layPrice: '1.95' },
          { name: 'Draw', backPrice: '---', layPrice: '---' },
          { name: 'Chittagong Kings', backPrice: '1.95', layPrice: '2.05' }
        ]
      }
    ]
  },
  {
    id: 'm10',
    sport: 'Cricket',
    competition: 'SA20 League',
    teams: 'Sunrisers Eastern Cape v MI Cape Town',
    date: 'Tomorrow',
    time: '5:30 PM',
    isLive: false,
    marketsCount: 40,
    markets: [
      {
        name: 'Match Odds',
        selections: [
          { name: 'Sunrisers Eastern Cape', backPrice: '1.70', layPrice: '1.80' },
          { name: 'Draw', backPrice: '---', layPrice: '---' },
          { name: 'MI Cape Town', backPrice: '2.15', layPrice: '2.25' }
        ]
      }
    ]
  },
  {
    id: 'm11',
    sport: 'Cricket',
    competition: 'Super Smash League',
    teams: 'Canterbury Kings v Auckland Aces',
    date: 'January 9th 2025',
    time: '11:00 AM',
    isLive: false,
    marketsCount: 20,
    markets: [
      {
        name: 'Match Odds',
        selections: [
          { name: 'Canterbury Kings', backPrice: '1.92', layPrice: '2.02' },
          { name: 'Draw', backPrice: '---', layPrice: '---' },
          { name: 'Auckland Aces', backPrice: '1.88', layPrice: '1.98' }
        ]
      }
    ]
  },
  {
    id: 'm12',
    sport: 'Cricket',
    competition: 'Women International T20',
    teams: 'India Women v Ireland Women',
    date: 'January 9th 2025',
    time: '2:30 PM',
    isLive: false,
    marketsCount: 30,
    markets: [
      {
        name: 'Match Odds',
        selections: [
          { name: 'India Women', backPrice: '1.05', layPrice: '1.15' },
          { name: 'Draw', backPrice: '---', layPrice: '---' },
          { name: 'Ireland Women', backPrice: '15.0', layPrice: '18.0' }
        ]
      }
    ]
  },
  {
    id: 'm13',
    sport: 'Cricket',
    competition: 'Bangladesh Premier League',
    teams: 'Durbar Rajshahi v Khulna Tigers',
    date: 'January 9th 2025',
    time: '3:00 PM',
    isLive: false,
    marketsCount: 22,
    markets: [
      {
        name: 'Match Odds',
        selections: [
          { name: 'Durbar Rajshahi', backPrice: '1.80', layPrice: '1.90' },
          { name: 'Draw', backPrice: '---', layPrice: '---' },
          { name: 'Khulna Tigers', backPrice: '2.02', layPrice: '2.12' }
        ]
      }
    ]
  },
  {
    id: 'm14',
    sport: 'Cricket',
    competition: 'SA20 League',
    teams: 'Durban Super Giants v Pretoria Capitals',
    date: 'January 9th 2025',
    time: '5:30 PM',
    isLive: false,
    marketsCount: 38,
    markets: [
      {
        name: 'Match Odds',
        selections: [
          { name: 'Durban Super Giants', backPrice: '1.65', layPrice: '1.75' },
          { name: 'Draw', backPrice: '---', layPrice: '---' },
          { name: 'Pretoria Capitals', backPrice: '2.25', layPrice: '2.35' }
        ]
      }
    ]
  },
  {
    id: 'm15',
    sport: 'Cricket',
    competition: 'Ranji Trophy',
    teams: 'Maharashtra v Punjab',
    date: 'January 10th 2025',
    time: '9:30 AM',
    isLive: false,
    marketsCount: 16,
    markets: [
      {
        name: 'Match Odds',
        selections: [
          { name: 'Maharashtra', backPrice: '2.50', layPrice: '2.60' },
          { name: 'Draw', backPrice: '3.5', layPrice: '3.7' },
          { name: 'Punjab', backPrice: '2.30', layPrice: '2.40' }
        ]
      }
    ]
  },
  ...allSportsMatches
];
export default userMatches;
