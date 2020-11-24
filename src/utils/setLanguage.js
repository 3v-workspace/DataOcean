/* eslint-disable no-template-curly-in-string */

import i18next from 'i18next';
import Yup from 'utils/yup';
import locale from 'yup/lib/locale';
import moment from 'moment';

export const setYupLanguage = (language) => {
  if (language === 'uk') {
    Yup.setLocale({
      mixed: {
        // default: 'Значення не коректне',
        required: 'Поле не може бути пусте',
      },
      string: {
        email: 'Некоректний email',
        url: 'Некоректний url',
        // eslint-disable-next-line no-template-curly-in-string
        length: 'Поле має містити ${length} символи',
        min: 'Мінімальна довжина ${min} символів',
        max: 'Максимальна довжина ${max} символів',
      },
      number: {
        min: 'Число повинно бути меньше ніж ${min}',
        max: 'Число повинно бути більше ніж ${max}',
        positive: 'Від\'ємне число заборонено',
        negative: 'Необхідно ввести від\'ємне число',
        integer: 'Необхідно ввести ціле число',
      },
    });
  } else {
    Yup.setLocale(locale);
  }
};

const setLanguage = (languageCode) => {
  let lang = languageCode;
  if (!lang) {
    lang = window.localStorage.getItem('i18nextLng');
    if (!lang) {
      lang = navigator.language || navigator.userLanguage;
      lang = i18next.languages.find((item) => lang.includes(item)) || 'uk';
    }
  }
  moment.locale(lang);
  i18next.changeLanguage(lang);
  window.localStorage.setItem('i18nextLng', lang);
  setYupLanguage(lang);
};

export default setLanguage;
