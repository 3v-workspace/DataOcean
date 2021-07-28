import moment from 'moment';
import { DATE_FORMAT, DATETIME_FORMAT, DATE_FORMAT_ENG, DATETIME_FORMAT_ENG } from '../const/const';

export { default as toggleFullScreen } from './fullscreen';
export { default as setLanguage } from './setLanguage';
export { default as toast } from './toast';


export const upFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const dateFormat = (iso) => ((moment(iso).format(DATE_FORMAT) !== 'Invalid date') ? moment(iso).format(DATE_FORMAT) : '---');
export const dateFormatEng = (iso) => ((moment(iso).format(DATE_FORMAT_ENG) !== 'Invalid date') ? moment(iso).format(DATE_FORMAT_ENG) : '---');

export const dateFormatISO = (iso) => ((moment(iso).format(DATE_FORMAT) !== 'Invalid date') ? moment(iso).format(DATE_FORMAT) : '---');

export const datetimeFormat = (iso) => ((moment(iso).format(DATETIME_FORMAT) !== 'Invalid date') ? moment(iso).format(DATETIME_FORMAT) : '---');
export const datetimeFormatEng = (iso) => ((moment(iso).format(DATETIME_FORMAT_ENG) !== 'Invalid date') ? moment(iso).format(DATETIME_FORMAT_ENG) : '---');

export function DateFormat(lang) {
  if (lang === 'uk') {
    return DATE_FORMAT;
  }
  return DATE_FORMAT_ENG;
}

export function DateTimeFormat(lang) {
  if (lang === 'uk') {
    return DATETIME_FORMAT;
  }
  return DATETIME_FORMAT_ENG;
}
