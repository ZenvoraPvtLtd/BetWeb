import { Trophy, Target, Gamepad2, Tv, Activity, Sparkles, Award, Zap } from 'lucide-react';
import type { Sport } from '../types/sports';

export const userSports: Sport[] = [
  { id: 'all', name: 'All Sports', icon: Activity },
  { id: 'cricket', name: 'Cricket', icon: Trophy, liveCount: 12 },
  { id: 'tennis', name: 'Tennis', icon: Target, liveCount: 4 },
  { id: 'soccer', name: 'Soccer', icon: Gamepad2, liveCount: 8 },
  { id: 'horse-racing', name: 'Horse Racing', icon: Zap, liveCount: 3 },
  { id: 'greyhound-racing', name: 'Greyhound Racing', icon: Tv, liveCount: 2 },
  { id: 'basketball', name: 'Basketball', icon: Activity, liveCount: 5 },
  { id: 'kabaddi', name: 'Kabaddi', icon: Sparkles, liveCount: 0 },
  { id: 'golf', name: 'Golf', icon: Award, liveCount: 1 },
  { id: 'egames', name: 'E Games', icon: Gamepad2, liveCount: 6 },
  { id: 'futsal', name: 'Futsal', icon: Activity, liveCount: 0 },
  { id: 'table-tennis', name: 'Table Tennis', icon: Target, liveCount: 2 },
  { id: 'volleyball', name: 'Volleyball', icon: Activity, liveCount: 1 },
  { id: 'snooker', name: 'Snooker', icon: Award, liveCount: 0 }
];
export default userSports;
