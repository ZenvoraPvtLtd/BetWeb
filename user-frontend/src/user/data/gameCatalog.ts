export interface CatalogGame {
  id: string;
  name: string;
  slug: string;
  image: string;
  category: string;
  route: string;
  enabled: boolean;
}

export const gameCatalog: CatalogGame[] = [
  { id: 'g1', name: 'Matka', slug: 'matka', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60', category: 'lottery', route: '/games/matka', enabled: true },
  { id: 'g2', name: 'V VIP Teenpatti 1-Day', slug: 'v-vip-teenpatti-1-day', image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60', category: 'teenpatti', route: '/games/teenpatti', enabled: true },
  { id: 'g3', name: 'Dolidana', slug: 'dolidana', image: '/R.jpg', category: 'casino', route: '/games/dolidana', enabled: true },
  { id: 'g4', name: 'Mogambo', slug: 'mogambo', image: 'https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60', category: 'casino', route: '/games/mogambo', enabled: true },
  { id: 'g5', name: '20-20 Teenpatti VIP1', slug: '20-20-teenpatti-vip1', image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=300&auto=format&fit=crop&q=60', category: 'teenpatti', route: '/games/teenpatti', enabled: true },
  { id: 'g6', name: 'Lucky 6', slug: 'lucky-6', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60', category: 'lottery', route: '/games/lucky-6', enabled: true },
  { id: 'g7', name: 'Beach Roulette', slug: 'beach-roulette', image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60', category: 'casino', route: '/casino/live', enabled: true },
  { id: 'g8', name: 'Roulette', slug: 'roulette', image: '/R.jpg', category: 'casino', route: '/casino/live', enabled: true },
  { id: 'g9', name: 'Golden Roulette', slug: 'golden-roulette', image: 'https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60', category: 'casino', route: '/casino/live', enabled: true },
  { id: 'g10', name: 'Teenpatti Poison One Day', slug: 'teenpatti-poison-one-day', image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=300&auto=format&fit=crop&q=60', category: 'teenpatti', route: '/games/teenpatti', enabled: true },
  { id: 'g11', name: 'Unique Teenpatti', slug: 'unique-teenpatti', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60', category: 'teenpatti', route: '/games/teenpatti', enabled: true },
  { id: 'g12', name: 'Teenpatti Poison 20-20', slug: 'teenpatti-poison-20-20', image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60', category: 'teenpatti', route: '/games/teenpatti', enabled: true },
  { id: 'g13', name: 'Unlimited Joker 20-20', slug: 'unlimited-joker-20-20', image: '/R.jpg', category: 'teenpatti', route: '/games/teenpatti', enabled: true },
  { id: 'g14', name: 'Teenpatti Joker 20-20', slug: 'teenpatti-joker-20-20', image: 'https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60', category: 'teenpatti', route: '/games/teenpatti', enabled: true },
  { id: 'g15', name: 'Unlimited Joker Oneday', slug: 'unlimited-joker-oneday', image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=300&auto=format&fit=crop&q=60', category: 'teenpatti', route: '/games/teenpatti', enabled: true },
  { id: 'g16', name: '20-20 Teenpatti C', slug: '20-20-teenpatti-c', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60', category: 'teenpatti', route: '/games/teenpatti', enabled: true },
  { id: 'g17', name: 'Bollywood Casino 2', slug: 'bollywood-casino-2', image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60', category: 'casino', route: '/casino/live', enabled: true },
  { id: 'g18', name: 'Unique Roulette', slug: 'unique-roulette', image: '/R.jpg', category: 'casino', route: '/casino/live', enabled: true },
  { id: 'g19', name: 'Mini Superover', slug: 'mini-superover', image: 'https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60', category: 'mini', route: '/casino/mini', enabled: true },
  { id: 'g20', name: 'Goal', slug: 'goal', image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=300&auto=format&fit=crop&q=60', category: 'mini', route: '/casino/crash', enabled: true },
  { id: 'g21', name: 'Andar Bahar 150 Cards', slug: 'andar-bahar-150-cards', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60', category: 'casino', route: '/games/andar-bahar', enabled: true },
  { id: 'g22', name: 'Lucky 15', slug: 'lucky-15', image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60', category: 'lottery', route: '/games/lucky-15', enabled: true },
  { id: 'g23', name: 'Super Over 2', slug: 'super-over-2', image: '/R.jpg', category: 'mini', route: '/casino/mini', enabled: true },
  { id: 'g24', name: 'Queen Top Open Teenpatti', slug: 'queen-top-open-teenpatti', image: 'https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60', category: 'teenpatti', route: '/games/teenpatti', enabled: true },
  { id: 'g25', name: 'Jack Top Open Teenpatti', slug: 'jack-top-open-teenpatti', image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=300&auto=format&fit=crop&q=60', category: 'teenpatti', route: '/games/teenpatti', enabled: true }
];
