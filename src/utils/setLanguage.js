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
        min: 'Число повинно бути менше ніж ${min}',
        max: 'Число повинно бути більше ніж ${max}',
        positive: 'Від\'ємне число заборонено',
        negative: 'Необхідно ввести від\'ємне число',
        integer: 'Необхідно ввести ціле число',
      },
    });
  } else if (language === 'en') {
    Yup.setLocale({
      mixed: {
        required: 'The field can\'t be empty',
      },
      string: {
        email: 'Incorrect email',
        url: 'Incorrect url',
        length: 'The field must contain ${length} characters',
        min: 'Minimum length of ${min} characters',
        max: 'Maximum length of ${max} characters',
      },
      number: {
        min: 'The number must be less than ${min}',
        max: 'The number must be higher than ${max}',
        positive: 'The negative number is forbidden',
        negative: 'Enter a negative number',
        integer: 'Enter an integer number',
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
