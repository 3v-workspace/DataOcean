import i18next from 'i18next';

const toast = (type, text, heading = '', hideAfter = 5000) => {
  if (!['info', 'warning', 'success', 'error'].includes(type)) {
    throw new Error(`${type} is wrong type. You can write correct type : 'info', 'warning', 'success', 'error'`);
  }
  const headings = {
    info: i18next.t('informationMessage'),
    error: i18next.t('error'),
    success: i18next.t('success'),
    warning: i18next.t('warning'),
  };
  let title = heading;
  if (!title) {
    title = headings[type];
  }
  $.toast({
    heading: title,
    text,
    hideAfter,
    icon: type,
  });
};

export default toast;
