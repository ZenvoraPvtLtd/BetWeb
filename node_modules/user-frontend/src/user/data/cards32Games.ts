export interface Cards32Game {
  id: string;
  name: string;
  slug: string;
  image: string;
  category: 'ALL' | 'CRASH' | 'SLOTS' | 'MINES' | 'CARDS' | 'CASINO';
  route: string;
  enabled: boolean;
}

export const cards32Games: Cards32Game[] = [
  {
    id: "32g-1",
    name: "Penalty Unlimited",
    slug: "penalty-unlimited",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=300&auto=format&fit=crop&q=60",
    category: "SLOTS",
    route: "/game/penalty-unlimited",
    enabled: true
  },
  {
    id: "32g-2",
    name: "Chicken Road 2",
    slug: "chicken-road-2",
    image: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60",
    category: "CRASH",
    route: "/game/chicken-road-2",
    enabled: true
  },
  {
    id: "32g-3",
    name: "Forest Arrow",
    slug: "forest-arrow",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&auto=format&fit=crop&q=60",
    category: "CARDS",
    route: "/game/forest-arrow",
    enabled: true
  },
  {
    id: "32g-4",
    name: "Hamster Run",
    slug: "hamster-run",
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60",
    category: "CRASH",
    route: "/game/hamster-run",
    enabled: true
  },
  {
    id: "32g-5",
    name: "Aztec Plinko 1000",
    slug: "aztec-plinko-1000",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=300&auto=format&fit=crop&q=60",
    category: "SLOTS",
    route: "/game/aztec-plinko-1000",
    enabled: true
  },
  {
    id: "32g-6",
    name: "Sugar Daddy",
    slug: "sugar-daddy",
    image: "https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60",
    category: "SLOTS",
    route: "/game/sugar-daddy",
    enabled: true
  },
  {
    id: "32g-7",
    name: "Chicken Road",
    slug: "chicken-road",
    image: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=300&auto=format&fit=crop&q=60",
    category: "CRASH",
    route: "/game/chicken-road",
    enabled: true
  },
  {
    id: "32g-8",
    name: "Joker Poker",
    slug: "joker-poker",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=300&auto=format&fit=crop&q=60",
    category: "CARDS",
    route: "/game/joker-poker",
    enabled: true
  },
  {
    id: "32g-9",
    name: "Stairs",
    slug: "stairs",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=300&auto=format&fit=crop&q=60",
    category: "SLOTS",
    route: "/game/stairs",
    enabled: true
  },
  {
    id: "32g-10",
    name: "Triple",
    slug: "triple",
    image: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60",
    category: "CARDS",
    route: "/game/triple",
    enabled: true
  },
  {
    id: "32g-11",
    name: "Jogo do Bicho",
    slug: "jogo-do-bicho",
    image: "https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60",
    category: "SLOTS",
    route: "/game/jogo-do-bicho",
    enabled: true
  },
  {
    id: "32g-12",
    name: "Limbo",
    slug: "limbo",
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60",
    category: "CRASH",
    route: "/game/limbo",
    enabled: true
  },
  {
    id: "32g-13",
    name: "Avia Fly",
    slug: "avia-fly",
    image: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=300&auto=format&fit=crop&q=60",
    category: "CRASH",
    route: "/game/avia-fly",
    enabled: true
  },
  {
    id: "32g-14",
    name: "Lucky Mines",
    slug: "lucky-mines",
    image: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60",
    category: "MINES",
    route: "/game/lucky-mines",
    enabled: true
  },
  {
    id: "32g-15",
    name: "Coin Flip",
    slug: "coin-flip",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=300&auto=format&fit=crop&q=60",
    category: "CARDS",
    route: "/game/coin-flip",
    enabled: true
  },
  {
    id: "32g-16",
    name: "Roulette",
    slug: "roulette",
    image: "https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60",
    category: "CASINO",
    route: "/game/roulette",
    enabled: true
  },
  {
    id: "32g-17",
    name: "Bubbles",
    slug: "bubbles",
    image: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=300&auto=format&fit=crop&q=60",
    category: "SLOTS",
    route: "/game/bubbles",
    enabled: true
  },
  {
    id: "32g-18",
    name: "Mines",
    slug: "mines",
    image: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60",
    category: "MINES",
    route: "/game/mines",
    enabled: true
  },
  {
    id: "32g-19",
    name: "Sweet Keno",
    slug: "sweet-keno",
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60",
    category: "SLOTS",
    route: "/game/sweet-keno",
    enabled: true
  },
  {
    id: "32g-20",
    name: "Hot Mines",
    slug: "hot-mines",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=300&auto=format&fit=crop&q=60",
    category: "MINES",
    route: "/game/hot-mines",
    enabled: true
  },
  {
    id: "32g-21",
    name: "Plinko 1000",
    slug: "plinko-1000",
    image: "https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60",
    category: "SLOTS",
    route: "/game/plinko-1000",
    enabled: true
  },
  {
    id: "32g-22",
    name: "Goblin Tower",
    slug: "goblin-tower",
    image: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=300&auto=format&fit=crop&q=60",
    category: "SLOTS",
    route: "/game/goblin-tower",
    enabled: true
  },
  {
    id: "32g-23",
    name: "Robo Dice",
    slug: "robo-dice",
    image: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60",
    category: "CARDS",
    route: "/game/robo-dice",
    enabled: true
  },
  {
    id: "32g-24",
    name: "Hilo Joker",
    slug: "hilo-joker",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=300&auto=format&fit=crop&q=60",
    category: "CARDS",
    route: "/game/hilo-joker",
    enabled: true
  },
  {
    id: "32g-25",
    name: "Double",
    slug: "double",
    image: "https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60",
    category: "CARDS",
    route: "/game/double",
    enabled: true
  },
  {
    id: "32g-26",
    name: "Diver",
    slug: "diver",
    image: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=300&auto=format&fit=crop&q=60",
    category: "CRASH",
    route: "/game/diver",
    enabled: true
  },
  {
    id: "32g-27",
    name: "Cryptos",
    slug: "cryptos",
    image: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60",
    category: "SLOTS",
    route: "/game/cryptos",
    enabled: true
  },
  {
    id: "32g-28",
    name: "Tower",
    slug: "tower",
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60",
    category: "SLOTS",
    route: "/game/tower",
    enabled: true
  },
  {
    id: "32g-29",
    name: "Wheel",
    slug: "wheel",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=300&auto=format&fit=crop&q=60",
    category: "CASINO",
    route: "/game/wheel",
    enabled: true
  },
  {
    id: "32g-30",
    name: "Crash",
    slug: "crash",
    image: "https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60",
    category: "CRASH",
    route: "/game/crash",
    enabled: true
  }
];
