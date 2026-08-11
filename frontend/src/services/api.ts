import type { LoginCredentials, AuthResponse, User } from '../types/auth';
import { mockAccounts, type Account } from '../mock/super-admin/accounts';

const mockHash = (password: string): string => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return `hash_${hash}`;
};

export const getHierarchyVisibleRoles = (role: string): string[] => {
  switch (role) {
    case 'SUPER_ADMIN':
    case 'ADMIN':
      return ['Super Admin', 'Admin', 'Supermaster', 'Master', 'Agent'];
    case 'SUPERMASTER':
      return ['Supermaster', 'Master', 'Agent'];
    case 'MASTER':
      return ['Master', 'Agent'];
    case 'AGENT':
      return ['Agent'];
    default:
      return [];
  }
};

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || '';
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Simulates credentials authentication locally with hashed verification.
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    console.log(`[Mock API] Authenticating ${credentials.username} with base URL: ${this.baseUrl}`);
    await this.delay(800);

    if (!credentials.username.trim() || !credentials.password.trim()) {
      throw new Error('Username and password are required');
    }

    const usernameClean = credentials.username.trim().toUpperCase();
    const passwordClean = credentials.password.trim();

    const staticAccounts: Record<string, { role: string; name: string; id: string }> = {
      SUPERADMIN: { role: 'SUPER_ADMIN', name: 'Super Admin', id: 'static-sa' },
      ADMIN: { role: 'ADMIN', name: 'Admin Manager', id: 'static-admin' },
      SUPERMASTER: { role: 'SUPERMASTER', name: 'Super Master User', id: 'static-sm' },
      MASTER: { role: 'MASTER', name: 'Master User', id: 'static-m' },
      AGENT: { role: 'AGENT', name: 'Agent User', id: 'static-a' },
      USER: { role: 'USER', name: 'User Client', id: 'static-u' },
    };

    let authenticatedUser: User | null = null;

    if (staticAccounts[usernameClean]) {
      let expectedPass = `${usernameClean.toLowerCase()}123`;
      if (usernameClean === 'MASTER') {
        expectedPass = 'Master123';
      } else if (usernameClean === 'AGENT') {
        expectedPass = 'Agent123';
      }

      if (mockHash(passwordClean) === mockHash(expectedPass)) {
        const info = staticAccounts[usernameClean];
        authenticatedUser = {
          id: info.id,
          username: credentials.username.trim(),
          role: info.role,
          name: info.name,
        };
      }
    } else {
      const matchedAccount = mockAccounts.find(
        (acc) => acc.username.toUpperCase() === usernameClean
      );
      if (matchedAccount) {
        let expectedPass = `${matchedAccount.username.toLowerCase()}123`;
        if (matchedAccount.accountType === 'Master') {
          if (mockHash(passwordClean) === mockHash('Master123')) {
            expectedPass = 'Master123';
          }
        } else if (matchedAccount.accountType === 'Agent') {
          if (mockHash(passwordClean) === mockHash('Agent123')) {
            expectedPass = 'Agent123';
          }
        }

        if (mockHash(passwordClean) === mockHash(expectedPass)) {
          let role = 'USER';
          if (matchedAccount.accountType === 'Super Admin') role = 'SUPER_ADMIN';
          else if (matchedAccount.accountType === 'Admin') role = 'ADMIN';
          else if (matchedAccount.accountType === 'Supermaster') role = 'SUPERMASTER';
          else if (matchedAccount.accountType === 'Master') role = 'MASTER';
          else if (matchedAccount.accountType === 'Agent') role = 'AGENT';

          authenticatedUser = {
            id: matchedAccount.id,
            username: matchedAccount.username,
            role: role,
            name: matchedAccount.username,
          };
        }
      }
    }

    if (!authenticatedUser) {
      throw new Error('Invalid username or password.');
    }

    return {
      token: `mock-jwt-token-${authenticatedUser.role.toLowerCase()}-${authenticatedUser.id}`,
      user: authenticatedUser,
    };
  }

  /**
   * Fetches user accounts, filtering by active user's permissions and scope hierarchy.
   */
  async getClients(userRole: string): Promise<Account[]> {
    await this.delay(200);
    const visibleTypes = getHierarchyVisibleRoles(userRole);
    return mockAccounts.filter((acc) => visibleTypes.includes(acc.accountType));
  }
}

export const api = new ApiClient();
