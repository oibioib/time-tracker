import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { LOCAL_LANGUAGE } from './constants/storageConstants';

const language = localStorage.getItem(LOCAL_LANGUAGE) || 'en';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: language,
    debug: false,
    detection: {
      order: ['queryString', 'cookie'],
      cache: ['cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
