import type { Match } from '../types/matches';

export const golfMatches: Match[] = [
  {
    id: "golf-001",
    sport: "Golf",
    competition: "PGA Championship",
    teams: "Scottie Scheffler v Rory McIlroy",
    date: "Today",
    time: "4:30 PM",
    isLive: true,
    marketsCount: 12,
    markets: [
      {
        name: "Winner Odds",
        selections: [
          { name: "Scottie Scheffler", backPrice: "2.10", layPrice: "2.20" },
          { name: "Draw", backPrice: "15.0", layPrice: "20.0" },
          { name: "Rory McIlroy", backPrice: "1.95", layPrice: "2.05" }
        ]
      }
    ]
  },
  {
    id: "golf-002",
    sport: "Golf",
    competition: "The Masters 2026",
    teams: "Jon Rahm v Brooks Koepka",
    date: "Tomorrow",
    time: "10:00 AM",
    isLive: false,
    marketsCount: 8,
    markets: [
      {
        name: "Winner Odds",
        selections: [
          { name: "Jon Rahm", backPrice: "1.80", layPrice: "1.90" },
          { name: "Draw", backPrice: "---", layPrice: "---" },
          { name: "Brooks Koepka", backPrice: "2.30", layPrice: "2.40" }
        ]
      }
    ]
  }
];

export const kabaddiMatches: Match[] = [
  {
    id: "kabaddi-001",
    sport: "Kabaddi",
    competition: "Pro Kabaddi League",
    teams: "Patna Pirates v Jaipur Pink Panthers",
    date: "Today",
    time: "7:30 PM",
    isLive: true,
    marketsCount: 6,
    markets: [
      {
        name: "Match Odds",
        selections: [
          { name: "Patna Pirates", backPrice: "1.65", layPrice: "1.75" },
          { name: "Draw", backPrice: "5.50", layPrice: "6.50" },
          { name: "Jaipur Pink Panthers", backPrice: "2.10", layPrice: "2.20" }
        ]
      }
    ]
  }
];

export const egamesMatches: Match[] = [
  {
    id: "egames-001",
    sport: "E Games",
    competition: "Intel Extreme Masters",
    teams: "Natus Vincere v FaZe Clan",
    date: "Today",
    time: "8:00 PM",
    isLive: true,
    marketsCount: 14,
    markets: [
      {
        name: "Match Odds",
        selections: [
          { name: "Natus Vincere", backPrice: "1.85", layPrice: "1.95" },
          { name: "Draw", backPrice: "---", layPrice: "---" },
          { name: "FaZe Clan", backPrice: "1.90", layPrice: "2.00" }
        ]
      }
    ]
  }
];

export const soccerMatches: Match[] = [
  {
    id: "soccer-001",
    sport: "Soccer",
    competition: "Premier League",
    teams: "Arsenal v Chelsea",
    date: "Today",
    time: "9:45 PM",
    isLive: true,
    marketsCount: 45,
    markets: [
      {
        name: "Match Odds",
        selections: [
          { name: "Arsenal", backPrice: "1.80", layPrice: "1.85" },
          { name: "Draw", backPrice: "3.40", layPrice: "3.60" },
          { name: "Chelsea", backPrice: "3.80", layPrice: "4.00" }
        ]
      }
    ]
  }
];

export const horseMatches: Match[] = [
  {
    id: "horse-001",
    sport: "Horse Racing",
    competition: "Ascot Gold Cup",
    teams: "Red Rum v Shergar",
    date: "Today",
    time: "2:30 PM",
    isLive: true,
    marketsCount: 3,
    markets: [
      {
        name: "Winner Odds",
        selections: [
          { name: "Red Rum", backPrice: "2.50", layPrice: "2.70" },
          { name: "Draw", backPrice: "---", layPrice: "---" },
          { name: "Shergar", backPrice: "1.80", layPrice: "1.95" }
        ]
      }
    ]
  }
];

export const tennisMatches: Match[] = [
  {
    id: "tennis-001",
    sport: "Tennis",
    competition: "US Open Men",
    teams: "Carlos Alcaraz v Jannik Sinner",
    date: "Tomorrow",
    time: "11:30 PM",
    isLive: false,
    marketsCount: 28,
    markets: [
      {
        name: "Match Odds",
        selections: [
          { name: "Carlos Alcaraz", backPrice: "1.75", layPrice: "1.85" },
          { name: "Draw", backPrice: "---", layPrice: "---" },
          { name: "Jannik Sinner", backPrice: "2.10", layPrice: "2.20" }
        ]
      }
    ]
  }
];

export const basketballMatches: Match[] = [
  {
    id: "basketball-001",
    sport: "Basketball",
    competition: "NBA Playoffs",
    teams: "LA Lakers v Boston Celtics",
    date: "Today",
    time: "6:00 AM",
    isLive: false,
    marketsCount: 15,
    markets: [
      {
        name: "Match Odds",
        selections: [
          { name: "LA Lakers", backPrice: "2.15", layPrice: "2.25" },
          { name: "Draw", backPrice: "---", layPrice: "---" },
          { name: "Boston Celtics", backPrice: "1.70", layPrice: "1.80" }
        ]
      }
    ]
  }
];

export const futsalMatches: Match[] = [
  {
    id: "futsal-001",
    sport: "Futsal",
    competition: "LNFS Division",
    teams: "Barcelona Futsal v Inter Movistar",
    date: "Tomorrow",
    time: "5:00 PM",
    isLive: false,
    marketsCount: 4,
    markets: [
      {
        name: "Match Odds",
        selections: [
          { name: "Barcelona Futsal", backPrice: "1.90", layPrice: "2.05" },
          { name: "Draw", backPrice: "4.20", layPrice: "4.60" },
          { name: "Inter Movistar", backPrice: "2.60", layPrice: "2.80" }
        ]
      }
    ]
  }
];

export const cricketMatches: Match[] = [
  {
    id: "cricket-001",
    sport: "Cricket",
    competition: "T20 World Cup",
    teams: "India v Pakistan",
    date: "Today",
    time: "7:00 PM",
    isLive: true,
    marketsCount: 62,
    markets: [
      {
        name: "Match Odds",
        selections: [
          { name: "India", backPrice: "1.60", layPrice: "1.65" },
          { name: "Draw", backPrice: "12.0", layPrice: "15.0" },
          { name: "Pakistan", backPrice: "2.40", layPrice: "2.50" }
        ]
      }
    ]
  }
];

export const tableTennisMatches: Match[] = [
  {
    id: "table-tennis-001",
    sport: "Table Tennis",
    competition: "WTT Champions",
    teams: "Fan Zhendong v Ma Long",
    date: "Today",
    time: "3:00 PM",
    isLive: true,
    marketsCount: 8,
    markets: [
      {
        name: "Match Odds",
        selections: [
          { name: "Fan Zhendong", backPrice: "1.50", layPrice: "1.60" },
          { name: "Draw", backPrice: "---", layPrice: "---" },
          { name: "Ma Long", backPrice: "2.50", layPrice: "2.70" }
        ]
      }
    ]
  }
];

export const volleyballMatches: Match[] = [
  {
    id: "volleyball-001",
    sport: "Volleyball",
    competition: "Nations League",
    teams: "Poland v Brazil",
    date: "Tomorrow",
    time: "8:00 PM",
    isLive: false,
    marketsCount: 11,
    markets: [
      {
        name: "Match Odds",
        selections: [
          { name: "Poland", backPrice: "1.72", layPrice: "1.82" },
          { name: "Draw", backPrice: "---", layPrice: "---" },
          { name: "Brazil", backPrice: "2.00", layPrice: "2.10" }
        ]
      }
    ]
  }
];

export const snookerMatches: Match[] = [
  {
    id: "snooker-001",
    sport: "Snooker",
    competition: "World Championship",
    teams: "Ronnie O'Sullivan v Judd Trump",
    date: "Today",
    time: "1:00 PM",
    isLive: true,
    marketsCount: 18,
    markets: [
      {
        name: "Match Odds",
        selections: [
          { name: "Ronnie O'Sullivan", backPrice: "1.80", layPrice: "1.90" },
          { name: "Draw", backPrice: "---", layPrice: "---" },
          { name: "Judd Trump", backPrice: "2.00", layPrice: "2.10" }
        ]
      }
    ]
  }
];

export const greyhoundMatches: Match[] = [
  {
    id: "greyhound-001",
    sport: "Greyhound Racing",
    competition: "Wimbledon Derby",
    teams: "Swift Cop v Rapid Run",
    date: "Today",
    time: "4:00 PM",
    isLive: true,
    marketsCount: 2,
    markets: [
      {
        name: "Winner Odds",
        selections: [
          { name: "Swift Cop", backPrice: "2.20", layPrice: "2.40" },
          { name: "Draw", backPrice: "---", layPrice: "---" },
          { name: "Rapid Run", backPrice: "1.65", layPrice: "1.80" }
        ]
      }
    ]
  }
];

export const allSportsMatches: Match[] = [
  ...golfMatches,
  ...kabaddiMatches,
  ...egamesMatches,
  ...soccerMatches,
  ...horseMatches,
  ...tennisMatches,
  ...basketballMatches,
  ...futsalMatches,
  ...cricketMatches,
  ...tableTennisMatches,
  ...volleyballMatches,
  ...snookerMatches,
  ...greyhoundMatches
];
