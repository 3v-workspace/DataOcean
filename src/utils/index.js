import moment from 'moment';
import i18n from 'i18next';

export { default as toggleFullScreen } from './fullscreen';
export { default as setLanguage } from './setLanguage';
export { default as toast } from './toast';


export const upFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);


// export const dateFormat = (iso) => moment(iso).format('MMMM D, YYYY');


const baseDateFormat = (isoString, format_uk, format_en) => {
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
};


export function dateFormat(isoString) {
  return baseDateFormat(isoString, 'DD MMMM YYYY', 'MMM DD, YYYY');
}
export function datetimeFormat(isoString) {
  return baseDateFormat(isoString, 'DD MMMM YYYY HH:mm', 'MMM DD, YYYY HH:mm');
}


export const dateFormatISO = (iso) => moment(iso).format('YYYY-MM-DD');

export const isEqualArray = (array1, array2) => {
  if (array1.length !== array2.length) {
    return false;
  }
  if (array1.length === 0) {
    return true;
  }
  const result = array1.find((item) => !array2.includes(item));
  if (result === undefined) {
    return true;
  }
  return false;
};
