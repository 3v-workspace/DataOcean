import React from 'react';
import { Redirect } from 'react-router-dom';
import ReactRouterPropTypes from 'utils/react-router-prop-types';
import useIsLogin from 'hooks/loginHooks';
// import PropTypes from 'prop-types';

const HomePage = ({ location }) => {
  const isLogin = useIsLogin();
  if (!isLogin) {
    return (
      <Redirect
        to={{
          pathname: '/auth/sign-in/',
          state: { from: location },
        }}
      />
    );
  }

  return (
    <div>
      <h1 className="text-white">Home Page</h1>
    </div>
  );
};


HomePage.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
};

export default HomePage;
