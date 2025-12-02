import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '../types';

// ========================================
// AUTH STORE
// ========================================
interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  setAuthenticated: (authenticated: boolean, user?: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setAuthenticated: (authenticated, user = null) =>
        set({ isAuthenticated: authenticated, user }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: 'boris-portfolio-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);

// ========================================
// UI STORE
// ========================================
interface UIStore {
  isMenuOpen: boolean;
  activeSection: string;
  isScrolled: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  setActiveSection: (section: string) => void;
  setIsScrolled: (scrolled: boolean) => void;
}

export const useUIStore = create<UIStore>()((set) => ({
  isMenuOpen: false,
  activeSection: 'home',
  isScrolled: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
  setActiveSection: (section) => set({ activeSection: section }),
  setIsScrolled: (scrolled) => set({ isScrolled: scrolled }),
}));

// ========================================
// LANGUAGE STORE
// ========================================
interface LanguageStore {
  language: 'fr' | 'en';
  setLanguage: (lang: 'fr' | 'en') => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'fr',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'boris-portfolio-lang',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// ========================================
// THEME STORE (pour future dark/light mode)
// ========================================
interface ThemeStore {
  theme: 'dark' | 'light' | 'system';
  setTheme: (theme: 'dark' | 'light' | 'system') => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'boris-portfolio-theme',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
