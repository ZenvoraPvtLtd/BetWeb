import type { AuthUser } from '../../types/auth';

export interface LoginResponse {
  user: AuthUser;
  token: string;
}

export const mockAuthService = {
  login(username: string, password: string): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Enforce exact case checks as requested in prompt instructions
        if (username.trim() === 'User' && password.trim() === 'DemoUser123') {
          const user: AuthUser = {
            id: 'mock-user-1',
            username: 'User',
            role: 'USER',
          };
          // Generate a simple mock token
          const token = 'mock-jwt-token-xyz-123456';
          resolve({ user, token });
        } else {
          reject(new Error('Invalid username or password'));
        }
      }, 700);
    });
  },
};
