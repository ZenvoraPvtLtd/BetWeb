import type { PaymentMethod } from '../../types/settings';

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'pm-001',
    name: 'UPI Gateway',
    description: 'Fast digital UPI deposits using PhonePe, GPay, or Paytm.',
    status: 'SELECTED',
    icon: 'Smartphone'
  },
  {
    id: 'pm-002',
    name: 'Bank IMPS / NEFT',
    description: 'Direct wire transfer with automated invoice upload receipt.',
    status: 'AVAILABLE',
    icon: 'CreditCard'
  },
  {
    id: 'pm-003',
    name: 'Mock NetBanking',
    description: 'Supports key net banking options for safe portfolio settlements.',
    status: 'AVAILABLE',
    icon: 'ShieldCheck'
  }
];
