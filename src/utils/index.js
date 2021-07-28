import moment from 'moment';
import { i18n } from 'i18next';
import { DATE_FORMAT, DATETIME_FORMAT } from '../const/const';

export { default as toggleFullScreen } from './fullscreen';
export { default as setLanguage } from './setLanguage';
export { default as toast } from './toast';

export const upFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const dateFormat = (iso) => moment(iso).format(DATE_FORMAT);

export const dateFormatISO = (iso) => moment(iso).format(DATE_FORMAT);

export const datetimeFormat = (iso) => moment(iso).format(DATETIME_FORMAT);

export function DateFormatIndefinitely(date, lang) {
  let checkIndefinitely = false;
  if (date !== dateFormat('01.01.3000')) {
    checkIndefinitely = true;
  }
  if (checkIndefinitely !== false) {
    if (lang === 'uk') {
      return 'Безстроково';
    }
    return 'Indefinitely';
  }
  return dateFormat(date);
}
