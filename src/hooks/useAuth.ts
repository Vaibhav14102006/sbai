import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { AuthService } from '../services/authService';

export const useAuth = () => {
  const { login, logout, user, isAuthenticated } = useStore();

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = AuthService.onAuthStateChange((user) => {
      if (user) {
        login(user);
      } else {
        logout();
      }
    });

    return () => unsubscribe();
  }, [login, logout]);

  return {
    user,
    isAuthenticated,
    login,
    logout
  };
};
