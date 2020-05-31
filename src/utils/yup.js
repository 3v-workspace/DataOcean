/* eslint no-template-curly-in-string: 0 */
import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    // default: 'Значення не коректне',
    required: 'Поле не може бути пусте',
  },
  string: {
    email: 'Некоректний email',
    url: 'Некоректний url',
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

export default Yup;
