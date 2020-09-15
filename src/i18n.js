import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';


i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json?v=1',
    },
    detection: {
      order: [
        'localStorage', 'querystring', 'cookie', 'sessionStorage',
        'navigator', 'htmlTag', 'path', 'subdomain',
      ],
      lookupLocalStorage: 'i18nextLng',
    },
    // resources: {
    //   en,
    //   uk,
    // },
    react: {
      useSuspense: false,
    },
    // languages: ['uk', 'en'],
    // lng: 'uk',
    fallbackLng: ['uk', 'en'],
    debug: process.env.NODE_ENV === 'development',

    // keySeparator: false,

    interpolation: {
      escapeValue: false,
      format: (value, format) => {
        if (format === 'uppercase') {
          return value.toUpperCase();
        }
        return value;
      },
      formatSeparator: ',',
    },
  });


export default i18n;
