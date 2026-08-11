import {
  Target,
  Zap,
  Gamepad2,
  Trophy,
  Award,
  CircleDot,
  Flame,
  Sparkles,
  Activity,
  Tv,
  Compass,
  Disc,
  Wind,
  type LucideIcon,
} from 'lucide-react';

export interface SportDefinition {
  id: string;
  name: string;
  slug: string;
  icon: LucideIcon;
  hasChildren?: boolean;
}

export const sportsConfig: SportDefinition[] = [
  { id: 'golf', name: 'Golf', slug: 'golf', icon: Target },
  { id: 'kabaddi', name: 'Kabaddi', slug: 'kabaddi', icon: Zap },
  { id: 'e-games', name: 'E Games', slug: 'e-games', icon: Gamepad2 },
  { id: 'soccer', name: 'Soccer', slug: 'soccer', icon: Trophy },
  { id: 'horse-racing', name: 'Horse Racing', slug: 'horse-racing', icon: Award },
  { id: 'tennis', name: 'Tennis', slug: 'tennis', icon: CircleDot },
  { id: 'basketball', name: 'Basketball', slug: 'basketball', icon: Flame },
  { id: 'futsal', name: 'Futsal', slug: 'futsal', icon: Sparkles },
  { id: 'cricket', name: 'Cricket', slug: 'cricket', icon: Activity },
  { id: 'table-tennis', name: 'Table Tennis', slug: 'table-tennis', icon: Tv },
  { id: 'volleyball', name: 'Volleyball', slug: 'volleyball', icon: Compass },
  { id: 'snooker', name: 'Snooker', slug: 'snooker', icon: Disc },
  { id: 'greyhound-racing', name: 'Greyhound Racing', slug: 'greyhound-racing', icon: Wind },
];
