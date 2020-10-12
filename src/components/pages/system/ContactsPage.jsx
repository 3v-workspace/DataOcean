import React from 'react';
import { useTranslation } from 'react-i18next';
import Alert from 'components/Alert';

const ContactsPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">
        {t('contacts')}
      </h2>
      <Alert variant="primary" className="intro-y mt-10">
        {t('inDevelopment')}...
      </Alert>
    </>
  );
};

// ContactsPage.propTypes = {};

export default ContactsPage;
