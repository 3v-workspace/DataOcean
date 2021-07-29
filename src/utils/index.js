import moment from 'moment';
import i18n from 'i18next';
import { DATE_FORMAT, DATE_FORMAT_ENG, DATETIME_FORMAT } from '../const/const';

export { default as toggleFullScreen } from './fullscreen';
export { default as setLanguage } from './setLanguage';
export { default as toast } from './toast';

export const upFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export function dateFormat(date, checkIndefinitely = false) {
  const lang = i18n.language;
  if (checkIndefinitely) {
    if (moment(date).format('YYYY-MM-DD') === '3000-01-01') {
      return i18n.t('indefinitely');
    }
  }
  const moment_date = moment(date);
  if (!moment_date.isValid()) {
    return '---';
  }
  if (lang === 'uk') {
    return moment_date.format(DATE_FORMAT);
  }
  return moment_date.format(DATE_FORMAT_ENG);
}

export const dateFormatISO = (iso) => moment(iso).format(DATE_FORMAT);

export const datetimeFormat = (iso) => moment(iso).format(DATETIME_FORMAT);
