import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language, Theme } from '../types';

interface AppState {
  language: Language;
  theme: Theme;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  toggleLanguage: () => void;
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'en',
      theme: 'dark',
      setLanguage: (language) => set({ language }),
      setTheme: (theme) => set({ theme }),
      toggleLanguage: () => set((state) => ({ language: state.language === 'en' ? 'ne' : 'en' })),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
    }),
    {
      name: 'app-preferences',
    }
  )
);
