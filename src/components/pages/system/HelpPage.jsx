import React from 'react';
import { useTranslation } from 'react-i18next';

const HelpPage = () => {
  const { t } = useTranslation();
  return (
    <h2 className="intro-y text-lg font-medium mt-10">
      {t('help')}
    </h2>
  );
};

// HelpPage.propTypes = {};

export default HelpPage;
