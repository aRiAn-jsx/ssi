import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Translations, TRANSLATIONS } from '../utils/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isRtl: boolean;
  dir: 'rtl' | 'ltr';
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('saramad_holding_lang') as Language;
      if (saved === 'fa' || saved === 'en') {
        return saved;
      }
    }
    return 'fa';
  });

  const isRtl = language === 'fa';
  const dir = isRtl ? 'rtl' : 'ltr';
  const t = TRANSLATIONS[language];

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('saramad_holding_lang', lang);
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'fa' ? 'en' : 'fa';
    setLanguage(nextLang);
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = dir;
      if (language === 'en') {
        document.body.classList.add('font-english');
        document.body.classList.remove('font-persian');
      } else {
        document.body.classList.add('font-persian');
        document.body.classList.remove('font-english');
      }
    }
  }, [language, dir]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isRtl,
        dir,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
