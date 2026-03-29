"use client";

import { useAppStore } from '@/store/useAppStore';
import { useEffect } from 'react';

export default function ThemeInitializer({ children }: { children: React.ReactNode }) {
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const lang = useAppStore.getState().language;
    document.documentElement.lang = lang === 'ne' ? 'ne' : 'en';
    document.cookie = `app-language=${lang}; path=/; max-age=31536000; samesite=lax`;
  }, []);

  return <>{children}</>;
}
