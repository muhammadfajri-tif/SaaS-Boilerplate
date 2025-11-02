// Utility functions for axios client authentication
export const setUserId = (userId: string): void => {
  localStorage.setItem('userId', userId);
};

export const getUserId = (): string | null => {
  return localStorage.getItem('userId');
};

export const clearUserId = (): void => {
  localStorage.removeItem('userId');
};

// Helper to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('userId');
};
