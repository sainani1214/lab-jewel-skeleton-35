import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, languages, translations } from './translations';

type TranslationValue = string | { [key: string]: TranslationValue };
type TranslationsType = typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationsType;
  dir: 'ltr' | 'rtl';
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved && languages.some(l => l.code === saved) ? saved : 'en';
  });

  const currentLang = languages.find(l => l.code === language) || languages[0];
  const dir = currentLang.dir;
  const isRTL = dir === 'rtl';
  const t = translations[language] as TranslationsType;

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  useEffect(() => {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', language);
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
