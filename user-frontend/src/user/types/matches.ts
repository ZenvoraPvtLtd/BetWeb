export interface MarketSelection {
  name: string;
  backPrice: string;
  layPrice: string;
}

export interface Market {
  name: string;
  selections: MarketSelection[];
}

export interface Match {
  id: string;
  sport: string;
  competition?: string;
  teams: string;
  date: string;
  time: string;
  isLive: boolean;
  scoreDisplay?: string;
  markets: Market[];
  marketsCount?: number;
}

