export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'SUPERMASTER' | 'MASTER' | 'AGENT' | 'USER';

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  SUPER_ADMIN: ['*'],
  ADMIN: [
    'clients.view',
    'clients.manage',
    'market.view',
    'reports.view',
    'casino.view',
    'settings.view',
    'sports.view',
  ],
  SUPERMASTER: [
    'clients.view',
    'clients.manage',
    'market.view',
    'reports.view',
    'casino.view',
    'sports.view',
  ],
  MASTER: [
    'clients.view',
    'clients.manage',
    'market.view',
    'reports.view',
    'casino.view',
    'sports.view',
  ],
  AGENT: [
    'clients.view',
    'reports.view',
    'market.view',
    'sports.view',
  ],
  USER: [
    'user.dashboard',
    'user.games',
  ],
};

export const hasPermission = (userRole: Role, permission: string): boolean => {
  const perms = ROLE_PERMISSIONS[userRole] || [];
  if (perms.includes('*')) return true;
  return perms.includes(permission);
};
