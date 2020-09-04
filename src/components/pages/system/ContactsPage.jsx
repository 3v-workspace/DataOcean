import React from 'react';
import { useTranslation } from 'react-i18next';

const ContactsPage = () => {
  const { t } = useTranslation();
  return (
    <h2 className="intro-y text-lg font-medium mt-10">
      {t('contacts')}
    </h2>
  );
};

// ContactsPage.propTypes = {};

export default ContactsPage;
