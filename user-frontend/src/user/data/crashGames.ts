export interface CrashGame {
  id: string;
  name: string;
  slug: string;
  image: string;
  provider: string;
  route?: string;
}

export const crashGames: CrashGame[] = [
  {
    id: "crash-1",
    name: "Aviator",
    slug: "aviator",
    image: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60",
    provider: "Spribe"
  },
  {
    id: "crash-2",
    name: "Dice",
    slug: "dice",
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60",
    provider: "Spribe"
  },
  {
    id: "crash-3",
    name: "Plinko",
    slug: "plinko",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=300&auto=format&fit=crop&q=60",
    provider: "Spribe"
  },
  {
    id: "crash-4",
    name: "Goal",
    slug: "goal",
    image: "https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60",
    provider: "Spribe"
  },
  {
    id: "crash-5",
    name: "Hilo",
    slug: "hilo",
    image: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=300&auto=format&fit=crop&q=60",
    provider: "Spribe"
  },
  {
    id: "crash-6",
    name: "Mines",
    slug: "mines",
    image: "", // Empty to trigger fallback verification
    provider: "Spribe"
  },
  {
    id: "crash-7",
    name: "Keno",
    slug: "keno",
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60",
    provider: "Spribe"
  },
  {
    id: "crash-8",
    name: "Mini Roulette",
    slug: "mini-roulette",
    image: "https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60",
    provider: "Spribe"
  },
  {
    id: "crash-9",
    name: "Hotline",
    slug: "hotline",
    image: "", // Empty to trigger fallback verification
    provider: "Spribe"
  }
];
