import React from 'react';
// import PropTypes from 'prop-types';
import Route404, { Page404 } from 'components/pages/Route404';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';


const RootRoutes = () => (
  <Switch>
    <Route
      path="/auth/"
      component={LoginPage}
    />
    <Route
      path="/404/"
      component={Page404}
    />
    <Route
      exact
      path="/"
      render={() => <Redirect to="/auth/sign-in/" />}
    />
    <Route404 />
  </Switch>
);

RootRoutes.propTypes = {};

export default RootRoutes;
