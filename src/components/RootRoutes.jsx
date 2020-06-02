import React from 'react';
// import PropTypes from 'prop-types';
import Route404, { Page404 } from 'components/pages/Route404';
import { Switch, Route, Redirect } from 'react-router-dom';
import SystemPage from 'components/pages/SystemPage';
import useIsLogin from 'hooks/loginHooks';
import LoginPage from './pages/auth/LoginPage';


const RootRoutes = () => {
  const isLogin = useIsLogin();

  return (
    <Switch>
      <Route
        path="/auth/"
        component={LoginPage}
      />
      <Route
        path="/system/"
        component={SystemPage}
      />
      <Route
        exact
        path="/404/"
        component={Page404}
      />
      <Route
        exact
        path="/"
        render={() => {
          const redirectTo = isLogin ? '/system/' : '/auth/sign-in/';
          return <Redirect to={redirectTo} />;
        }}
      />
      <Route404 />
    </Switch>
  );
};

RootRoutes.propTypes = {};

export default RootRoutes;
