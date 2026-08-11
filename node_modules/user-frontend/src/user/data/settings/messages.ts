import type { Message } from '../../types/settings';

export const mockMessages: Message[] = [
  {
    id: 'msg-001',
    title: 'Scheduled System Upgrade',
    description: 'Exchange services will undergo brief technical maintenance tonight from 02:00 AM to 03:00 AM.',
    body: 'Dear user, our database streams and exchange servers will be upgraded to support faster odds processing. During this one-hour window, logging in, bet placement, and wallet balances calculations will be temporarily offline. Please ensure your open exposure is managed. Thank you for your patience.',
    date: '2026-08-11',
    time: '21:00',
    status: 'UNREAD',
    type: 'SYSTEM'
  },
  {
    id: 'msg-002',
    title: 'VIP Weekend Deposit Offer',
    description: 'Get an extra 5% virtual credit on bank transfers this Saturday. Promo code: VIPEXTRA.',
    body: 'Get a boost on your mock exchange portfolio! Deposit with your preferred UPI method this weekend and claim an extra 5% virtual points instantly. Code VIPEXTRA can be used up to three times per account. Terms and conditions apply.',
    date: '2026-08-11',
    time: '18:15',
    status: 'UNREAD',
    type: 'PROMO'
  },
  {
    id: 'msg-003',
    title: 'Match Void Alert: Melbourne Stars',
    description: 'The fixture Melbourne Stars v Sydney Sixers has been abandoned. All bets are voided.',
    body: 'Due to persistent rain, the match officials have cancelled the Melbourne Stars v Sydney Sixers cricket match. As per tournament guidelines, all matched back and lay slots are voided and fully refunded to your available balance. Check your account statement for transactions log.',
    date: '2026-08-10',
    time: '12:05',
    status: 'READ',
    type: 'ALERT'
  }
];
