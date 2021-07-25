import moment from 'moment';
import { DATE_FORMAT, DATETIME_FORMAT, DATE_FORMAT_ENG, DATETIME_FORMAT_ENG } from 'const/const';
import { useTranslation } from 'react-i18next';

export { default as toggleFullScreen } from './fullscreen';
export { default as setLanguage } from './setLanguage';
export { default as toast } from './toast';


export const upFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
const Format = (string) => {
  const { i18n } = useTranslation();
  return (i18n.language !== 'en') ? DATE_FORMAT_ENG : DATE_FORMAT;
};

export const dateFormat = (iso) => moment(iso).format(Format());

export const dateFormatISO = (iso) => moment(iso).format(DATE_FORMAT_ENG);

export const datetimeFormat = (iso) => moment(iso).format(DATETIME_FORMAT_ENG);
