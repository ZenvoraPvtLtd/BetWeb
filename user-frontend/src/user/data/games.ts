import type { Game } from '../types/games';

export const userGames: Game[] = [
  { id: 'g1', title: 'Matka', category: 'LIVE / CASINO', badge: 'Popular', gradientFrom: '#311042', gradientTo: '#160824', isLive: true },
  { id: 'g2', title: 'V VIP Teenpatti 1-Day', category: 'TEENPATTI', badge: 'VIP', gradientFrom: '#421016', gradientTo: '#24080d', isLive: true },
  { id: 'g3', title: 'Dolidana', category: 'OUR VIRTUAL', gradientFrom: '#103e42', gradientTo: '#082124', isLive: false },
  { id: 'g4', title: 'Mogambo', category: 'SLOTS', badge: 'New', gradientFrom: '#422810', gradientTo: '#241608', isLive: false },
  { id: 'g5', title: '20-20 Teenpatti VIP1', category: 'TEENPATTI', gradientFrom: '#101642', gradientTo: '#080d24', isLive: true },
  { id: 'g6', title: 'Lucky 6', category: 'LOTTERY', badge: 'Live', gradientFrom: '#18382b', gradientTo: '#0c1f17', isLive: true },
  { id: 'g7', title: 'Beach Roulette', category: 'CASINO', gradientFrom: '#1a3a4b', gradientTo: '#0f222e', isLive: false },
  { id: 'g8', title: 'Roulette', category: 'CASINO', gradientFrom: '#2f1220', gradientTo: '#1b0a12', isLive: true },
  { id: 'g9', title: 'Golden Roulette', category: 'CASINO', badge: 'Gold', gradientFrom: '#3b2f12', gradientTo: '#211a09', isLive: false },
  { id: 'g10', title: 'Teenpatti Poison One Day', category: 'TEENPATTI', gradientFrom: '#251b2e', gradientTo: '#140e1b', isLive: true }
];
export default userGames;
