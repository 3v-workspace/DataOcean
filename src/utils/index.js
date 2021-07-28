import moment from 'moment';
import { i18n } from 'i18next';
import { DATE_FORMAT, DATE_FORMAT_ENG, DATETIME_FORMAT } from '../const/const';

export { default as toggleFullScreen } from './fullscreen';
export { default as setLanguage } from './setLanguage';
export { default as toast } from './toast';

export const upFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export function DateFormat(date, lang = 'uk', checkIndefinitely = false) {
  if (checkIndefinitely === true) {
    if (moment(date).format(DATE_FORMAT) === moment('3000-01-01').format(DATE_FORMAT)) {
      if (lang === 'uk') {
        return 'Безстроково';
      }
      return 'Indefinitely';
    }
  }
  if (lang === 'uk') {
    return moment(date).format(DATE_FORMAT);
  }
  return moment(date).format(DATE_FORMAT_ENG);
}

export const dateFormatISO = (iso) => moment(iso).format(DATE_FORMAT);

export const datetimeFormat = (iso) => moment(iso).format(DATETIME_FORMAT);
