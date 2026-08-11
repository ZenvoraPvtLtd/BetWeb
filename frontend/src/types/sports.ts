export interface DemoParticipant {
  name: string;
  score?: string | number;
  subScore?: string | number; // e.g. wickets, sets, points, frames, holes, positions
}

export interface DemoScore {
  status: string; // e.g. 'Upcoming' | 'Live' | 'Completed'
  detail?: string; // e.g. "Overs: 12.3", "Half: 1st", "Sets: 1-0"
  scoreDisplay?: string; // e.g. "120/4 vs 98/2", "2 - 1", "30 - 15"
}

export interface DemoSelection {
  id: string; // e.g. 'team-a' | 'team-b' | 'draw'
  name: string; // e.g. 'India' | 'Australia' | 'Draw'
  rate: number; // e.g. 1.85, 2.10
}

export interface SportEvent {
  id: string;
  name: string;
  status: 'Upcoming' | 'Live' | 'Completed';
  startTime: string;
  participants: {
    home: DemoParticipant;
    away: DemoParticipant;
  };
  score?: DemoScore;
  selections: DemoSelection[];
  sportType: string; // e.g. "cricket" | "soccer" | etc.
  meta?: Record<string, any>; // sport-specific extra properties
}

export interface SportConfig {
  sportId: string;
  title: string;
  initialEvents: SportEvent[];
}
