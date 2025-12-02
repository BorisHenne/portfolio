import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import fr from './locales/fr';
import en from './locales/en';

// Ressources de traduction
const resources = {
  fr: { translation: fr },
  en: { translation: en },
};

// Configuration i18next
void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en'],
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'boris-portfolio-lang',
    },
    
    interpolation: {
      escapeValue: false, // React fait déjà l'échappement
    },
    
    react: {
      useSuspense: true,
    },
    
    // Debug uniquement en dev
    debug: import.meta.env.DEV,
  });

export default i18n;
