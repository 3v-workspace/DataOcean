import React, { useEffect } from 'react';
import ReactRouterPropTypes from 'utils/react-router-prop-types';

const ConstructorPage = ({ match }) => {
  useEffect(() => {
    document.body.classList.add('constructor');
    return () => {
      document.body.classList.remove('constructor');
    };
  }, []);

  return (
    <div>
      Constructor Page
    </div>
  );
};

ConstructorPage.propTypes = {
  ...ReactRouterPropTypes,
};

export default ConstructorPage;
