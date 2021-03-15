/* eslint no-template-curly-in-string: 0 */
import * as Yup from 'yup';
import i18next from 'i18next';

// Yup.setLocale({
//   mixed: {
//     // default: 'Значення не коректне',
//     required: 'Поле не може бути пусте',
//   },
//   string: {
//     email: 'Некоректний email',
//     url: 'Некоректний url',
//     length: 'Поле має містити ${length} символи',
//     min: 'Мінімальна довжина ${min} символів',
//     max: 'Максимальна довжина ${max} символів',
//   },
//   number: {
//     min: 'Число повинно бути меньше ніж ${min}',
//     max: 'Число повинно бути більше ніж ${max}',
//     positive: 'Від\'ємне число заборонено',
//     negative: 'Необхідно ввести від\'ємне число',
//     integer: 'Необхідно ввести ціле число',
//   },
// });

export const getPasswordLevel = (password) => {
  let level = -1;
  if (password.length >= 8) {
    level += 1;
  }
  if (/[A-Z]/.test(password)) {
    level += 1;
  }
  if (/[a-z]/.test(password)) {
    level += 1;
  }
  if (/[0-9]/.test(password)) {
    level += 1;
  }
  if (/[$@!%*#?&._/\\()[\]{}~=+-]/.test(password)) {
    level += 1;
  }
  return level;
};

const validNameRegex = /^\s*[A-Za-zА-Яа-яҐґЄєІіЇї'`.-]+\s*$/;

Yup.addMethod(Yup.string, 'name', function () {
  return this.test('name', i18next.t('onlyLettersAndSpecialSymbols'), (value) => validNameRegex.test(value));
});


export default Yup;
