export interface PromotionSlide {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  gradientFrom: string;
  gradientTo: string;
  actionText: string;
}

export const userPromotions: PromotionSlide[] = [
  {
    id: 'p1',
    title: 'VIP TEENPATTI',
    subtitle: 'Premium Live Gaming Experience',
    badge: 'VIP Club',
    gradientFrom: '#311042',
    gradientTo: '#0B1728',
    actionText: 'Explore Now'
  },
  {
    id: 'p2',
    title: '100% SPORTS BONUS',
    subtitle: 'Mock play-money matching rewards daily',
    badge: 'Sports Promo',
    gradientFrom: '#0B3B60',
    gradientTo: '#07111F',
    actionText: 'Claim Bonus'
  },
  {
    id: 'p3',
    title: 'WEEKLY DRAW JACKPOT',
    subtitle: 'Get lucky lottery ticket tokens automatically',
    badge: 'Lottery Draw',
    gradientFrom: '#5A1B29',
    gradientTo: '#07111F',
    actionText: 'Enter Draw'
  }
];
export default userPromotions;
