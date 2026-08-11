import { mockAccounts } from '../mock/super-admin/accounts';
import { getHierarchyVisibleRoles } from '../services/api';

/**
 * Returns list of usernames visible to the currently authenticated user session.
 * Returns null if the user has full global visibility (SUPER_ADMIN or ADMIN).
 */
export const getVisibleUsernames = (): string[] | null => {
  const storedUser = sessionStorage.getItem('auth_user');
  if (!storedUser) return [];

  try {
    const user = JSON.parse(storedUser);
    if (user.role === 'SUPER_ADMIN' || user.role === 'ADMIN') {
      return null; // Full visibility
    }

    const visibleTypes = getHierarchyVisibleRoles(user.role);
    const visibleUsernames = mockAccounts
      .filter((acc) => visibleTypes.includes(acc.accountType))
      .map((acc) => acc.username.toLowerCase());

    // Make sure they can see their own data
    const selfUsername = user.username.toLowerCase();
    if (!visibleUsernames.includes(selfUsername)) {
      visibleUsernames.push(selfUsername);
    }

    return visibleUsernames;
  } catch (e) {
    return [];
  }
};
