import moment from 'moment';
import { useTranslation } from 'react-i18next';

export { default as toggleFullScreen } from './fullscreen';
export { default as setLanguage } from './setLanguage';
export { default as toast } from './toast';

export function Lang() {
  const { i18n } = useTranslation();
  return i18n.language;
}

export function DateIsIndefinitely(date) {
  if (date !== '3000-01-01') {
    return date;
  }
  if (Lang() === 'uk') {
    return 'Безстроково';
  }
  return 'Indefinitely';
}

export const upFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const dateFormat = (iso) => moment(iso).format('MMMM D, YYYY');

export const dateFormatISO = (iso) => moment(iso).format('YYYY-MM-DD');

export const datetimeFormat = (iso) => moment(iso).format('MMMM D, YYYY HH:mm');
