export interface TickerMatch {
  id: string;
  title: string;
  sport: string;
  isLive?: boolean;
}

export const tickerMatches: TickerMatch[] = [
  {
    id: "match-1",
    title: "Zhukayev v Mi Braswell",
    sport: "Tennis",
    isLive: true
  },
  {
    id: "match-2",
    title: "D Collins v O Jabeur",
    sport: "Tennis",
    isLive: true
  },
  {
    id: "match-3",
    title: "Sydney Thunder v Hobart Hurricanes",
    sport: "Cricket",
    isLive: true
  },
  {
    id: "match-4",
    title: "Wellington Blaze Women v Central Hinds Women",
    sport: "Cricket",
    isLive: true
  },
  {
    id: "match-5",
    title: "Wellington Firebirds v Central Stags",
    sport: "Cricket",
    isLive: true
  }
];
