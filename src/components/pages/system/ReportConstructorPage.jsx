import React from 'react';
import { useTranslation } from 'react-i18next';

const ReportConstructorPage = () => {
  const { t } = useTranslation();
  return (
    <h2 className="intro-y text-lg font-medium mt-10">
      {t('reportConstructor')}
    </h2>
  );
};

// AnalyticsPage.propTypes = {};

export default ReportConstructorPage;
