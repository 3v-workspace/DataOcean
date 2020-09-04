import React from 'react';
import { useTranslation } from 'react-i18next';

const DataConstructorPage = () => {
  const { t } = useTranslation();
  return (
    <h2 className="intro-y text-lg font-medium mt-10">
      {t('dataConstructor')}
    </h2>
  );
};

// DocumentsPage.propTypes = {};

export default DataConstructorPage;
