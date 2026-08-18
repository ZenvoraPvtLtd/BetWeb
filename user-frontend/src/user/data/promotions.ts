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
    gradientTo: '#0B0F19',
    actionText: 'Explore Now'
  },
  {
    id: 'p2',
    title: '100% SPORTS BONUS',
    subtitle: 'Mock play-money matching rewards daily',
    badge: 'Sports Promo',
    gradientFrom: '#1E293B',
    gradientTo: '#0B0F19',
    actionText: 'Claim Bonus'
  },
  {
    id: 'p3',
    title: 'WEEKLY DRAW JACKPOT',
    subtitle: 'Get lucky lottery ticket tokens automatically',
    badge: 'Lottery Draw',
    gradientFrom: '#4A1D24',
    gradientTo: '#0B0F19',
    actionText: 'Enter Draw'
  }
];
export default userPromotions;
