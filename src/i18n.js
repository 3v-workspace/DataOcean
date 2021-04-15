import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import uk from 'locales/uk/translation.json';
import en from 'locales/en/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  // .use(HttpApi)
  .init({
    resources: {
      uk: { translation: uk },
      en: { translation: en },
    },
    // backend: {
    //   loadPath: '/locales/{{lng}}/{{ns}}.json?v=2',
    // },
    detection: {
      order: [
        'localStorage', 'querystring', 'cookie', 'sessionStorage',
        'navigator', 'htmlTag', 'path', 'subdomain',
      ],
      lookupLocalStorage: 'i18nextLng',
      lookupCookie: 'lang',
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
        if (format === 'upper') {
          return value.toUpperCase();
        }
        if (format === 'lower') {
          return value.toLowerCase();
        }
        return value;
      },
      formatSeparator: ',',
    },
  });


export default i18n;
