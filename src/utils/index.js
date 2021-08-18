import moment from 'moment';
import i18n from 'i18next';

export { default as toggleFullScreen } from './fullscreen';
export { default as setLanguage } from './setLanguage';
export { default as toast } from './toast';


export function upFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


export function stringFormat(string, data) {
  let newString = string;
  Object.entries(data).forEach(([key, value]) => {
    newString = newString.replace(`{${key}}`, value);
  });
  return newString;
}


function baseDateFormat(isoString, format_uk, format_en) {
  const lang = i18n.language;
  const moment_date = moment(isoString);
  if (!moment_date.isValid()) {
    return '---';
  }
  if (moment_date.format('YYYY-MM-DD') === '3000-01-01') {
    return i18n.t('indefinitely');
  }
  if (lang === 'uk') {
    return moment_date.format(format_uk);
  }
  return moment_date.format(format_en);
}


export function dateFormat(isoString) {
  if (/^\d{4}$/.test(isoString)) {
    return baseDateFormat(isoString, 'YYYY р.', 'YYYY');
  }
  if (/^\d{4}-\d{2}$/.test(isoString)) {
    return baseDateFormat(isoString, 'MMMM YYYY р.', 'MMMM YYYY');
  }
  return baseDateFormat(isoString, 'DD MMMM YYYY р.', 'MMM DD, YYYY');
}

export function dateTimeFormat(isoString) {
  return baseDateFormat(isoString, 'DD MMMM YYYY р. HH:ss', 'MMM DD, YYYY HH:ss');
}

export const isEqualArray = (array1, array2) => {
  if (array1.length !== array2.length) {
    return false;
  }
  if (array1.length === 0) {
    return true;
  }
  const result = array1.find((item) => !array2.includes(item));
  return result === undefined;
};
