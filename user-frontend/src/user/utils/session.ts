import type { AuthUser } from '../types/auth';

const USER_SESSION_KEY = 'user_auth_session';
const TOKEN_SESSION_KEY = 'user_auth_token';

export const saveSession = (user: AuthUser, token: string): void => {
  sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
  sessionStorage.setItem(TOKEN_SESSION_KEY, token);
};

export const getSession = (): { user: AuthUser | null; token: string | null } => {
  try {
    const userStr = sessionStorage.getItem(USER_SESSION_KEY);
    const token = sessionStorage.getItem(TOKEN_SESSION_KEY);
    const user = userStr ? (JSON.parse(userStr) as AuthUser) : null;
    return { user, token };
  } catch (error) {
    console.error('[Session] Error parsing session storage:', error);
    return { user: null, token: null };
  }
};

export const clearSession = (): void => {
  sessionStorage.removeItem(USER_SESSION_KEY);
  sessionStorage.removeItem(TOKEN_SESSION_KEY);
};
