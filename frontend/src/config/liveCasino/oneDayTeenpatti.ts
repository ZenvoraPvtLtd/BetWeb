export interface OneDayTeenpattiGameConfig {
  id: string;
  name: string;
  category: string;
  roundId: string | null;
  minBet: number | null;
  maxBet: number | null;
}

export const oneDayTeenpattiConfig: OneDayTeenpattiGameConfig = {
  id: '1-day-teenpatti',
  name: '1 Day Teenpatti',
  category: 'Live Casino',
  roundId: null,
  minBet: null,
  maxBet: null,
};
