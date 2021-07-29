import moment from 'moment';
import i18n from 'i18next';
import { DATE_FORMAT, DATETIME_FORMAT, DATE_FORMAT_ENG, DATETIME_FORMAT_ENG } from '../const/const';

export { default as toggleFullScreen } from './fullscreen';
export { default as setLanguage } from './setLanguage';
export { default as toast } from './toast';

export const upFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export function dateFormat(date) {
  const lang = i18n.language;
  const moment_date = moment(date);
  if (moment_date.format('YYYY-MM-DD') === '3000-01-01') {
    return i18n.t('indefinitely');
  }
  if (!moment_date.isValid()) {
    return '---';
  }
  if (lang === 'uk') {
    return moment_date.format(DATE_FORMAT);
  }
  return moment_date.format(DATE_FORMAT_ENG);
}

export function dateTimeFormat(date) {
  const lang = i18n.language;
  const moment_date = moment(date);
  if (!moment_date.isValid()) {
    return '---';
  }
  if (lang === 'uk') {
    return moment_date.format(DATETIME_FORMAT);
  }
  return moment_date.format(DATETIME_FORMAT_ENG);
}
