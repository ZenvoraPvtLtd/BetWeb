import { casinoListConfig } from '../../config/superAdmin/casinoList';
import type { CasinoListItem } from '../../config/superAdmin/casinoList';

// Keep local in-memory storage of casinos to persist changes across routes
let casinosInMemory: CasinoListItem[] = [...casinoListConfig];

export const casinoListService = {
  /**
   * Retrieves current system casino games lists.
   */
  getCasinos(): Promise<CasinoListItem[]> {
    return Promise.resolve([...casinosInMemory]);
  },

  /**
   * Mutates active state of a specific casino game.
   */
  updateCasinoEnabled(id: string, enabled: boolean): Promise<void> {
    casinosInMemory = casinosInMemory.map((casino) =>
      casino.id === id ? { ...casino, enabled } : casino
    );
    return Promise.resolve();
  },
};
