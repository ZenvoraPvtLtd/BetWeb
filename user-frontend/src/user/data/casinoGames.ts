import type { Game } from '../types/games';

export const casinoGames: Game[] = [
  // 1. Roulette
  { id: 'cas-1', title: 'Speed Roulette A', category: 'Roulette', gradientFrom: '#1c1c28', gradientTo: '#0B1728', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-2', title: 'Auto Roulette B', category: 'Roulette', gradientFrom: '#18382b', gradientTo: '#0c1f17', image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-3', title: 'VIP Roulette Live', category: 'Roulette', gradientFrom: '#421016', gradientTo: '#24080d', image: '' }, // Fallback
  { id: 'cas-4', title: 'French Roulette', category: 'Roulette', gradientFrom: '#311042', gradientTo: '#160824', image: 'https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-5', title: 'Hindi Roulette Live', category: 'Roulette', gradientFrom: '#251b2e', gradientTo: '#140e1b', image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-6', title: 'Lightning Roulette', category: 'Roulette', gradientFrom: '#101642', gradientTo: '#080d24', image: '' }, // Fallback

  // 2. Teenpatti
  { id: 'cas-7', title: '20-20 Teenpatti', category: 'Teenpatti', gradientFrom: '#2d1c18', gradientTo: '#1a0f0d', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-8', title: '1 Day Teenpatti', category: 'Teenpatti', gradientFrom: '#182d2a', gradientTo: '#0e1a18', image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-9', title: 'Open Teenpatti', category: 'Teenpatti', gradientFrom: '#1f2d18', gradientTo: '#111a0e', image: '' }, // Fallback
  { id: 'cas-10', title: 'Teenpatti Pro 2.0', category: 'Teenpatti', gradientFrom: '#2d182b', gradientTo: '#1a0e19', image: 'https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-11', title: 'Classic Teenpatti', category: 'Teenpatti', gradientFrom: '#181e2d', gradientTo: '#0e1a1a', image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-12', title: 'Muflis Teenpatti', category: 'Teenpatti', gradientFrom: '#2a182d', gradientTo: '#190e1a', image: '' }, // Fallback

  // 3. Poker
  { id: 'cas-13', title: '6 Player Poker', category: 'Poker', gradientFrom: '#20182d', gradientTo: '#120e1a', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-14', title: '1 Day Poker Live', category: 'Poker', gradientFrom: '#182a2d', gradientTo: '#0e191a', image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-15', title: 'Texas Holdem Live', category: 'Poker', gradientFrom: '#2d2718', gradientTo: '#1a170e', image: '' }, // Fallback
  { id: 'cas-16', title: 'Casino Stud Poker', category: 'Poker', gradientFrom: '#222d18', gradientTo: '#141a0e', image: 'https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-17', title: 'Omaha Poker A', category: 'Poker', gradientFrom: '#2d1818', gradientTo: '#1a0e0e', image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-18', title: 'Teenpatti Poker B', category: 'Poker', gradientFrom: '#182d20', gradientTo: '#0e1a12', image: '' }, // Fallback

  // 4. Baccarat
  { id: 'cas-19', title: 'Baccarat Squeeze', category: 'Baccarat', gradientFrom: '#1d182d', gradientTo: '#110e1a', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-20', title: 'Speed Baccarat C', category: 'Baccarat', gradientFrom: '#281c1c', gradientTo: '#181010', image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-21', title: 'Controlled Squeeze', category: 'Baccarat', gradientFrom: '#1e222a', gradientTo: '#0f1115', image: '' }, // Fallback
  { id: 'cas-22', title: 'Salon Prive Baccarat', category: 'Baccarat', gradientFrom: '#191f24', gradientTo: '#0d1012', image: 'https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-23', title: 'Korean Speed Baccarat', category: 'Baccarat', gradientFrom: '#202419', gradientTo: '#10120d', image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-24', title: 'Lightning Baccarat', category: 'Baccarat', gradientFrom: '#241919', gradientTo: '#120d0d', image: '' }, // Fallback

  // 5. Dragon Tiger
  { id: 'cas-25', title: '20-20 Dragon Tiger', category: 'Dragon Tiger', gradientFrom: '#1c2419', gradientTo: '#0e120d', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-26', title: '1 Day Dragon Tiger', category: 'Dragon Tiger', gradientFrom: '#191924', gradientTo: '#0d0d12', image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-27', title: 'Live DTL Speed', category: 'Dragon Tiger', gradientFrom: '#241922', gradientTo: '#120d11', image: '' }, // Fallback
  { id: 'cas-28', title: 'Classic Dragon Tiger', category: 'Dragon Tiger', gradientFrom: '#192420', gradientTo: '#0d1210', image: 'https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-29', title: 'Super Dragon Tiger', category: 'Dragon Tiger', gradientFrom: '#242219', gradientTo: '#12110d', image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-30', title: 'Mega Dragon Tiger', category: 'Dragon Tiger', gradientFrom: '#241c19', gradientTo: '#120e0d', image: '' }, // Fallback

  // 6. 32 Cards
  { id: 'cas-31', title: '32 Cards Pro A', category: '32 Cards', gradientFrom: '#1c1924', gradientTo: '#0e0d12', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-32', title: '32 Cards Classic B', category: '32 Cards', gradientFrom: '#192024', gradientTo: '#0d1012', image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-33', title: '32 Cards Live 3.0', category: '32 Cards', gradientFrom: '#202419', gradientTo: '#10120d', image: '' }, // Fallback
  { id: 'cas-34', title: '32 Cards VIP Gold', category: '32 Cards', gradientFrom: '#241924', gradientTo: '#120d12', image: 'https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-35', title: '32 Cards Ultimate', category: '32 Cards', gradientFrom: '#192419', gradientTo: '#0d120d', image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-36', title: '32 Cards Extreme', category: '32 Cards', gradientFrom: '#242419', gradientTo: '#12120d', image: '' }, // Fallback

  // 7. Andar Bahar
  { id: 'cas-37', title: 'Classic Andar Bahar', category: 'Andar Bahar', gradientFrom: '#3a2012', gradientTo: '#21120a', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-38', title: 'Andar Bahar Speed', category: 'Andar Bahar', gradientFrom: '#12253a', gradientTo: '#0a1521', image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-39', title: 'Andar Bahar Pro Live', category: 'Andar Bahar', gradientFrom: '#3a1235', gradientTo: '#210a1e', image: '' }, // Fallback
  { id: 'cas-40', title: 'Instant Andar Bahar', category: 'Andar Bahar', gradientFrom: '#123a31', gradientTo: '#0a211c', image: 'https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-41', title: 'Super Andar Bahar', category: 'Andar Bahar', gradientFrom: '#2c3a12', gradientTo: '#19210a', image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-42', title: 'Andar Bahar Live 88', category: 'Andar Bahar', gradientFrom: '#303030', gradientTo: '#181818', image: '' }, // Fallback

  // 8. Lucky 7
  { id: 'cas-43', title: 'Lucky 7 A Live', category: 'Lucky 7', gradientFrom: '#15303a', gradientTo: '#0b1b21', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-44', title: 'Lucky 7 B Live', category: 'Lucky 7', gradientFrom: '#3a1515', gradientTo: '#210b0b', image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-45', title: 'Lucky 7 Speed Play', category: 'Lucky 7', gradientFrom: '#1c1c28', gradientTo: '#0B1728', image: '' }, // Fallback
  { id: 'cas-46', title: 'Classic Lucky 7', category: 'Lucky 7', gradientFrom: '#18382b', gradientTo: '#0c1f17', image: 'https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-47', title: 'Lucky 7 Extreme', category: 'Lucky 7', gradientFrom: '#421016', gradientTo: '#24080d', image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-48', title: 'Mega Lucky 7', category: 'Lucky 7', gradientFrom: '#311042', gradientTo: '#160824', image: '' }, // Fallback

  // 9. 3 Cards Judgement
  { id: 'cas-49', title: '3 Cards Judgement Pro', category: '3 Cards Judgement', gradientFrom: '#251b2e', gradientTo: '#140e1b', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-50', title: '3 Cards Judgement Live', category: '3 Cards Judgement', gradientFrom: '#101642', gradientTo: '#080d24', image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-51', title: 'Judgement Live Deck', category: '3 Cards Judgement', gradientFrom: '#2f1220', gradientTo: '#1b0a12', image: '' }, // Fallback
  { id: 'cas-52', title: 'Super Judgement', category: '3 Cards Judgement', gradientFrom: '#1a3a4b', gradientTo: '#0f222e', image: 'https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-53', title: 'Extreme Judgement', category: '3 Cards Judgement', gradientFrom: '#3b2f12', gradientTo: '#211a09', image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-54', title: 'Ultimate Judgement', category: '3 Cards Judgement', gradientFrom: '#2d1c18', gradientTo: '#1a0f0d', image: '' }, // Fallback

  // 10. Casino War
  { id: 'cas-55', title: 'Casino War Live', category: 'Casino War', gradientFrom: '#421016', gradientTo: '#24080d', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-56', title: 'Casino War Speed', category: 'Casino War', gradientFrom: '#18382b', gradientTo: '#0c1f17', image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-57', title: 'War of Dragons Live', category: 'Casino War', gradientFrom: '#1c1c28', gradientTo: '#0B1728', image: '' }, // Fallback
  { id: 'cas-58', title: 'Casino War Pro A', category: 'Casino War', gradientFrom: '#311042', gradientTo: '#160824', image: 'https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-59', title: 'Casino War Classic', category: 'Casino War', gradientFrom: '#251b2e', gradientTo: '#140e1b', image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-60', title: 'Casino War Unlimited', category: 'Casino War', gradientFrom: '#101642', gradientTo: '#080d24', image: '' }, // Fallback

  // 11. Worli
  { id: 'cas-61', title: 'Instant Worli Live', category: 'Worli', gradientFrom: '#2f1220', gradientTo: '#1b0a12', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-62', title: 'Matka Worli Special', category: 'Worli', gradientFrom: '#1a3a4b', gradientTo: '#0f222e', image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-63', title: 'Worli King Matka', category: 'Worli', gradientFrom: '#3b2f12', gradientTo: '#211a09', image: '' }, // Fallback
  { id: 'cas-64', title: 'Kalyan Worli Live', category: 'Worli', gradientFrom: '#2d1c18', gradientTo: '#1a0f0d', image: 'https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-65', title: 'Main Mumbai Worli', category: 'Worli', gradientFrom: '#421016', gradientTo: '#24080d', image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-66', title: 'Super Worli Matka', category: 'Worli', gradientFrom: '#18382b', gradientTo: '#0c1f17', image: '' }, // Fallback

  // 12. Sports
  { id: 'cas-67', title: 'Super Over Cricket Mat', category: 'Sports', gradientFrom: '#1c1c28', gradientTo: '#0B1728', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-68', title: '5Five Cricket Match', category: 'Sports', gradientFrom: '#311042', gradientTo: '#160824', image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-69', title: 'Ball By Ball Live', category: 'Sports', gradientFrom: '#251b2e', gradientTo: '#140e1b', image: '' }, // Fallback
  { id: 'cas-70', title: 'Superover Live Stream', category: 'Sports', gradientFrom: '#101642', gradientTo: '#080d24', image: 'https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-71', title: 'Virtual Sports League', category: 'Sports', gradientFrom: '#2f1220', gradientTo: '#1b0a12', image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-72', title: 'Mini Superover Match', category: 'Sports', gradientFrom: '#1a3a4b', gradientTo: '#0f222e', image: '' }, // Fallback

  // 13. Bollywood
  { id: 'cas-73', title: 'Bollywood Table Live', category: 'Bollywood', gradientFrom: '#3b2f12', gradientTo: '#211a09', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-74', title: 'Amar Akbar Anthony L', category: 'Bollywood', gradientFrom: '#2d1c18', gradientTo: '#1a0f0d', image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-75', title: 'Bollywood VIP Table', category: 'Bollywood', gradientFrom: '#421016', gradientTo: '#24080d', image: '' }, // Fallback
  { id: 'cas-76', title: 'Namaste India Live', category: 'Bollywood', gradientFrom: '#18382b', gradientTo: '#0c1f17', image: 'https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-77', title: 'Bollywood Nights VIP', category: 'Bollywood', gradientFrom: '#1c1c28', gradientTo: '#0B1728', image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-78', title: 'Bollywood Roulette', category: 'Bollywood', gradientFrom: '#311042', gradientTo: '#160824', image: '' }, // Fallback

  // 14. Lottery
  { id: 'cas-79', title: 'Lucky 15 Lottery', category: 'Lottery', gradientFrom: '#251b2e', gradientTo: '#140e1b', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-80', title: 'Worli Matka Lottery', category: 'Lottery', gradientFrom: '#101642', gradientTo: '#080d24', image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-81', title: 'Mega Draw Lottery', category: 'Lottery', gradientFrom: '#2f1220', gradientTo: '#1b0a12', image: '' }, // Fallback
  { id: 'cas-82', title: 'Jili Lottery Win', category: 'Lottery', gradientFrom: '#1a3a4b', gradientTo: '#0f222e', image: 'https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-83', title: 'Ezugi Lottery Wheel', category: 'Lottery', gradientFrom: '#3b2f12', gradientTo: '#211a09', image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-84', title: 'Golden Draw Lottery', category: 'Lottery', gradientFrom: '#2d1c18', gradientTo: '#1a0f0d', image: '' }, // Fallback

  // 15. Queen
  { id: 'cas-85', title: 'Casino Queen Live', category: 'Queen', gradientFrom: '#421016', gradientTo: '#24080d', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-86', title: 'Queen of Hearts Win', category: 'Queen', gradientFrom: '#18382b', gradientTo: '#0c1f17', image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-87', title: 'Golden Queen Slots', category: 'Queen', gradientFrom: '#1c1c28', gradientTo: '#0B1728', image: '' }, // Fallback
  { id: 'cas-88', title: 'Royal Queen Baccarat', category: 'Queen', gradientFrom: '#311042', gradientTo: '#160824', image: 'https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-89', title: 'Queen Table Deluxe', category: 'Queen', gradientFrom: '#251b2e', gradientTo: '#140e1b', image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-90', title: 'Egypt Queen Deluxe', category: 'Queen', gradientFrom: '#101642', gradientTo: '#080d24', image: '' }, // Fallback

  // 16. Race
  { id: 'cas-91', title: 'Race 20-20 Live', category: 'Race', gradientFrom: '#2f1220', gradientTo: '#1b0a12', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-92', title: 'Race to 2nd Live', category: 'Race', gradientFrom: '#1a3a4b', gradientTo: '#0f222e', image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-93', title: 'Virtual Horse Race', category: 'Race', gradientFrom: '#3b2f12', gradientTo: '#211a09', image: '' }, // Fallback
  { id: 'cas-94', title: 'Greyhound Race Live', category: 'Race', gradientFrom: '#2d1c18', gradientTo: '#1a0f0d', image: 'https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-95', title: 'Live Harness Racing', category: 'Race', gradientFrom: '#421016', gradientTo: '#24080d', image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-96', title: 'Virtual Speed Racing', category: 'Race', gradientFrom: '#18382b', gradientTo: '#0c1f17', image: '' }, // Fallback

  // 17. Others
  { id: 'cas-97', title: 'Sic Bo Table Play', category: 'Others', gradientFrom: '#1c1c28', gradientTo: '#0B1728', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-98', title: 'The Trap Deluxe', category: 'Others', gradientFrom: '#311042', gradientTo: '#160824', image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-99', title: '1 Card Meter Live', category: 'Others', gradientFrom: '#251b2e', gradientTo: '#140e1b', image: '' }, // Fallback
  { id: 'cas-100', title: 'Dus ka Dum Live', category: 'Others', gradientFrom: '#101642', gradientTo: '#080d24', image: 'https://images.unsplash.com/photo-1595131838555-c49372242145?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-101', title: 'Lucky Blue Table', category: 'Others', gradientFrom: '#2f1220', gradientTo: '#1b0a12', image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-102', title: 'Casino Meter Pro', category: 'Others', gradientFrom: '#1a3a4b', gradientTo: '#0f222e', image: '' }, // Fallback
  { id: 'cas-103', title: 'Royal Matka Play', category: 'Others', gradientFrom: '#3b2f12', gradientTo: '#211a09', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-104', title: 'Jili Matka Deluxe', category: 'Others', gradientFrom: '#2d1c18', gradientTo: '#1a0f0d', image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=60' },
  { id: 'cas-105', title: 'Bollywood Matka', category: 'Others', gradientFrom: '#421016', gradientTo: '#24080d', image: '' } // Fallback
];
