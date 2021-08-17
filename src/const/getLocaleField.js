import i18 from 'i18next';

const getLocaleField = (object, fieldName) => {
  if (i18.language === 'uk') {
    return object[fieldName] || '---';
  }
  return object[`${fieldName}_en`] || '---';
};

export default getLocaleField;
