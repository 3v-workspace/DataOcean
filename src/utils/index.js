import moment from 'moment';

export { default as toggleFullScreen } from './fullscreen';
export { default as setLanguage } from './setLanguage';
export { default as toast } from './toast';


export const upFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const dateFormat = (iso) => moment(iso).format('MMMM D, YYYY');

export const datetimeFormat = (iso) => moment(iso).format('MMMM D, YYYY HH:mm');
