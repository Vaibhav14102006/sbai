// Authentication removed. Always return open access.
export const useAuth = () => ({
  user: null,
  isAuthenticated: true,
  login: () => {},
  logout: () => {}
});
