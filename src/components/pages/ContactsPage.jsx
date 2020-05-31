import React, { useEffect } from 'react';
import ReactRouterPropTypes from 'utils/react-router-prop-types';

const ContactsPage = ({ match }) => {
  useEffect(() => {
    document.body.classList.add('documents');
    return () => {
      document.body.classList.remove('documents');
    };
  }, []);

  return (
    <div>
      Contacts Page
    </div>
  );
};

ContactsPage.propTypes = {
  ...ReactRouterPropTypes,
};

export default ContactsPage;
