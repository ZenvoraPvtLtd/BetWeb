import {
  Home,
  Ticket,
  Target,
  Trophy,
  Dices,
  Sparkles,
  Layers,
  Coins,
  Tv,
  Zap
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  icon: LucideIcon;
  to: string;
}

export const mainNavItems: NavItem[] = [
  { label: 'Home', icon: Home, to: '/home' },
  { label: 'Lottery', icon: Ticket, to: '#lottery' },
  { label: 'Tennis', icon: Target, to: '#tennis' },
  { label: 'Cricket', icon: Trophy, to: '#cricket' },
  { label: 'Baccarat', icon: Dices, to: '#baccarat' },
  { label: '32 Cards', icon: Sparkles, to: '#32cards' },
  { label: 'Teenpatti', icon: Layers, to: '#teenpatti' },
  { label: 'Poker', icon: Coins, to: '#poker' },
  { label: 'Lucky 7', icon: Tv, to: '#lucky7' },
  { label: 'Crash', icon: Zap, to: '#crash' },
];
export default mainNavItems;
