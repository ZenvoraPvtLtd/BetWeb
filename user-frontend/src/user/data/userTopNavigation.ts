import {
  Home,
  Ticket,
  Trophy,
  Dices,
  Sparkles,
  Gem,
  Zap,
  Flame
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface TopNavItem {
  label: string;
  route: string;
  icon: LucideIcon;
  isSpecial?: boolean;
}

export const topNavItems: TopNavItem[] = [
  { label: 'HOME', route: '/home', icon: Home },
  { label: 'LOTTERY', route: '/sports/cricket', icon: Ticket },
  { label: 'TENNIS', route: '/sports/tennis', icon: Trophy },
  { label: 'CRICKET', route: '/sports/cricket', icon: Trophy },
  { label: 'BACCARAT', route: '/games/baccarat', icon: Dices },
  { label: '32 CARDS', route: '/games/32-cards', icon: Dices },
  { label: 'TEENPATTI', route: '/games/teenpatti', icon: Sparkles },
  { label: 'POKER', route: '/games/poker', icon: Gem },
  { label: 'LUCKY 7', route: '/games/lucky7', icon: Zap },
  { label: 'CRASH', route: '/games/crash', icon: Flame, isSpecial: true }
];
