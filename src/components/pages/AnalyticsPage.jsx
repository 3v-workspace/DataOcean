import React, { useEffect } from 'react';
import ReactRouterPropTypes from 'utils/react-router-prop-types';

const AnalyticsPage = ({ match }) => {
  useEffect(() => {
    document.body.classList.add('analytics');
    return () => {
      document.body.classList.remove('analytics');
    };
  }, []);

  return (
    <div>
      Analytics Page
    </div>
  );
};

AnalyticsPage.propTypes = {
  ...ReactRouterPropTypes,
};

export default AnalyticsPage;
