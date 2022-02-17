import i18next from 'i18next';

const breadcrumbsNames = {
  kved: 'КВЕД',
  // 'report-constructor': 'Конструктор звітів',
  // 'data-constructor': 'Конструктор даних',
  // system: 'Система',
  // home: 'Домівка',
  // datasets: 'Набори даних',
  // contacts: 'Контакти',
  // help: 'Допомога',
  // settings: 'Налаштування',
  // profile: 'Профіль',
  // companies: 'Компанії',
  // streets: 'Вулиці',
};

const translations = {
  'report-constructor': 'reportConstructor',
  'data-constructor': 'dataConstructor',
  'pep-scheme': 'pepScheme',
  'my-payments': 'myPayments',
  'my-logs': 'myLogs',
};

const getBreadcrumbName = (key) => {
  if (i18next.exists(key)) {
    return i18next.t(key);
  }
  if (key in translations) {
    return i18next.t(translations[key]);
  }
  return breadcrumbsNames[key];
};

export default getBreadcrumbName;
