'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SITE_CONTENT, SiteContent } from '@/lib/content';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  content: SiteContent;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'es',
  setLanguage: () => {},
  content: SITE_CONTENT.es,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    const saved = localStorage.getItem('rcb_lang') as Language;
    if (saved === 'es' || saved === 'en') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('rcb_lang', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, content: SITE_CONTENT[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
