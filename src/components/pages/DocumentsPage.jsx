import React, { useEffect } from 'react';
import ReactRouterPropTypes from 'utils/react-router-prop-types';

const DocumentsPage = ({ match }) => {
  useEffect(() => {
    document.body.classList.add('documents');
    return () => {
      document.body.classList.remove('documents');
    };
  }, []);

  return (
    <div>
      Documents Page
    </div>
  );
};

DocumentsPage.propTypes = {
  ...ReactRouterPropTypes,
};

export default DocumentsPage;
