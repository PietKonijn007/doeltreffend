import { translations, type Language } from './translations';

// Get browser language or stored preference
export function getPreferredLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  
  // Check localStorage first
  const stored = localStorage.getItem('language') as Language | null;
  if (stored && (stored === 'en' || stored === 'nl' || stored === 'ko')) {
    return stored;
  }
  
  // Detect browser language
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('nl')) {
    return 'nl';
  }
  if (browserLang.startsWith('ko')) {
    return 'ko';
  }
  
  return 'en'; // Default to English
}

// Set language preference
export function setLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('language', lang);
  
  // Dispatch custom event for components to react
  window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: lang } }));
}

// Get translated text
export function t(key: string, lang: Language = getPreferredLanguage()): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English if translation not found
      value = translations.en;
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return key; // Return key if nothing found
        }
      }
      return value as string;
    }
  }
  
  return value as string;
}
