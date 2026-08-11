export interface BlockedMarket {
  id: string;
  marketName: string;
  sport: string;
  competition: string;
  status: 'AVAILABLE' | 'BLOCKED';
}

export interface Message {
  id: string;
  title: string;
  description: string;
  body: string;
  date: string;
  time: string;
  status: 'READ' | 'UNREAD';
  type: 'SYSTEM' | 'PROMO' | 'ALERT';
}

export interface Match {
  id: string;
  sport: string;
  sportIcon: string;
  competition: string;
  matchName: string;
  date: string;
  time: string;
  status: 'ADD' | 'ADDED';
}

export interface CasinoGameSetting {
  id: string;
  gameName: string;
  category: string;
  status: 'ENABLED' | 'DISABLED';
  image: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  status: 'AVAILABLE' | 'SELECTED';
  icon: string;
}

export interface SettingSection {
  title: string;
  description: string;
  to: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}
