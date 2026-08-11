import type { LucideIcon } from 'lucide-react';

export interface Sport {
  id: string;
  name: string;
  icon: LucideIcon;
  liveCount?: number;
}

