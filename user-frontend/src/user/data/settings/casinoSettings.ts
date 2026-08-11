import { casinoGames } from '../casinoGames';
import type { CasinoGameSetting } from '../../types/settings';

export const mockCasinoSettings: CasinoGameSetting[] = casinoGames.map((game) => ({
  id: game.id,
  gameName: game.title,
  category: game.category,
  status: 'ENABLED',
  image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?q=80&w=400&auto=format&fit=crop'
}));
