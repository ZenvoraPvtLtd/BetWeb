export interface MarketEvent {
  id: string;
  eventName: string;
  team: string;
  sport: string;
  status: 'Live' | 'Upcoming' | 'Suspended';
  marketCount: number;
}

export const mockMarketEvents: MarketEvent[] = [
  {
    id: '1',
    eventName: 'AUSTRALIA V INDIA (1)',
    team: 'Cricket',
    sport: 'Cricket',
    status: 'Live',
    marketCount: 5,
  },
  {
    id: '2',
    eventName: 'ENGLAND V SOUTH AFRICA',
    team: 'Cricket',
    sport: 'Cricket',
    status: 'Upcoming',
    marketCount: 3,
  },
  {
    id: '3',
    eventName: 'REAL MADRID V BARCELONA',
    team: 'Soccer',
    sport: 'Soccer',
    status: 'Live',
    marketCount: 12,
  },
  {
    id: '4',
    eventName: 'LOS ANGELES LAKERS V BOSTON CELTICS',
    team: 'Basketball',
    sport: 'Basketball',
    status: 'Live',
    marketCount: 8,
  },
];
