export interface Rule {
  name: string;
  description: string;
  multiplier?: string;
}

export const teenpattiRules: Rule[] = [
  { name: 'Trio (Three of a Kind)', description: 'Three cards of the same rank.', multiplier: '1 to 30' },
  { name: 'Straight Flush (Pure Sequence)', description: 'Three consecutive cards of the same suit.', multiplier: '1 to 40' },
  { name: 'Straight (Sequence)', description: 'Three consecutive cards of mixed suits.', multiplier: '1 to 6' },
  { name: 'Flush (Color)', description: 'Three cards of the same suit that are not in sequence.', multiplier: '1 to 4' },
  { name: 'Pair (Double)', description: 'Two cards of the same rank.', multiplier: '1 to 1' }
];

export const rouletteRules: Rule[] = [
  { name: 'Straight Up', description: 'Single number bet placed directly on a number.', multiplier: '35 to 1' },
  { name: 'Split Bet', description: 'Placed on the line between two adjacent numbers.', multiplier: '17 to 1' },
  { name: 'Street Bet', description: 'Placed at the end of a row of three numbers.', multiplier: '11 to 1' },
  { name: 'Corner Bet', description: 'Placed at the intersection of four numbers.', multiplier: '8 to 1' },
  { name: 'Red/Black or Odd/Even', description: 'High-probability outside bets.', multiplier: '1 to 1' }
];

export const baccaratRules: Rule[] = [
  { name: 'Player Win', description: 'Betting that the Player hand will be closest to 9.', multiplier: '1 to 1' },
  { name: 'Banker Win', description: 'Betting that the Banker hand will be closest to 9.', multiplier: '0.95 to 1' },
  { name: 'Tie Bet', description: 'Betting that both hands will end in an equal score.', multiplier: '8 to 1' }
];
