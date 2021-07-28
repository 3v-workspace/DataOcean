import moment from 'moment';
import { DATE_FORMAT, DATETIME_FORMAT } from '../const/const';

export { default as toggleFullScreen } from './fullscreen';
export { default as setLanguage } from './setLanguage';
export { default as toast } from './toast';

export const upFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const dateFormat = (iso) => moment(iso).format(DATE_FORMAT);

export const dateFormatISO = (iso) => moment(iso).format(DATE_FORMAT);

export const datetimeFormat = (iso) => moment(iso).format(DATETIME_FORMAT);

export function DateIsIndefinitely(date, lang) {
  if (date !== dateFormat('01.01.3000')) {
    return date;
  }
  if (lang === 'uk') {
    return 'Безстроково';
  }
  return 'Indefinitely';
}
