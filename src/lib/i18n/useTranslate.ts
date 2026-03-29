import { useAppStore } from '@/store/useAppStore';
import { translations } from './translations';
import { useCallback } from 'react';

export const useTranslate = () => {
  const language = useAppStore((state) => state.language);
  
  const t = useCallback(
    (keyPath: string) => {
      const keys = keyPath.split('.');
      let current: any = translations[language];
      
      for (const key of keys) {
        if (current[key] === undefined) {
          console.warn(`Translation key not found: ${keyPath}`);
          return keyPath;
        }
        current = current[key];
      }
      
      return current as string;
    },
    [language]
  );

  return { t, language };
};
