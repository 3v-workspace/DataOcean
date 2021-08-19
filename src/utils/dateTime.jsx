import i18n from 'i18next';
import moment from 'moment';
import React from 'react';

function baseDateRender(isoString, format_uk, format_en) {
  const lang = i18n.language;
  const moment_date = moment(isoString);
  if (!moment_date.isValid()) {
    return '---';
  }
  if (moment_date.format('YYYY-MM-DD') === '3000-01-01') {
    return i18n.t('indefinitely');
  }
  let result;
  if (lang === 'uk') {
    result = moment_date.format(format_uk);
  } else {
    result = moment_date.format(format_en);
  }
  return <span className="whitespace-no-wrap">{result}</span>;
}


export function renderDate(isoString) {
  if (/^\d{4}$/.test(isoString)) {
    return baseDateRender(isoString, 'YYYY р.', 'YYYY');
  }
  if (/^\d{4}-\d{2}$/.test(isoString)) {
    return baseDateRender(isoString, 'MMMM YYYY р.', 'MMMM YYYY');
  }
  return baseDateRender(isoString, 'DD MMMM YYYY р.', 'MMM DD, YYYY');
}

export function renderDateTime(isoString) {
  return baseDateRender(isoString, 'DD MMMM YYYY р. HH:ss', 'MMM DD, YYYY HH:ss');
}
