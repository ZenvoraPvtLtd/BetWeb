export interface Game {
  id: string;
  title: string;
  category: string;
  badge?: string;
  gradientFrom: string;
  gradientTo: string;
  isLive?: boolean;
  image?: string;
  provider?: string;
}

