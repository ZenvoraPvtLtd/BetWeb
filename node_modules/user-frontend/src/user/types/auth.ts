export type UserRole = 'USER';

export interface AuthUser {
  id: string;
  username: string;
  role: UserRole;
}
