import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, User, Theme } from '../types';
import { AuthService } from '../services/authService';

interface AppStore extends AppState {
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useStore = create<AppStore>()(
  persist(
    (set) => ({
      user: null,
      theme: {
        mode: 'dark',
        primaryColor: '#3b82f6',
        accentColor: '#14b8a6',
      },
      language: 'en',
      isAuthenticated: false,
      loading: false,
      error: null,

      login: (user: User) => {
        set({ user, isAuthenticated: true, error: null });
      },

      logout: async () => {
        try {
          await AuthService.signOut();
          set({ user: null, isAuthenticated: false, error: null });
        } catch (error: any) {
          console.error('Logout error:', error.message);
          set({ error: error.message });
        }
      },

      updateUser: (updates: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },

      setTheme: (theme: Theme) => {
        set({ theme });
        if (theme.mode === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      setLanguage: (language: string) => {
        set({ language });
      },

      setLoading: (loading: boolean) => {
        set({ loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },
    }),
    {
      name: 'invest-ed-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        theme: state.theme,
        language: state.language,
      }),
    }
  )
);