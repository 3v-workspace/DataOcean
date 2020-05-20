import React from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import ReactLogo from './ReactLogo';
import LoginPage from './auth/LoginPage';


const RootRoutes = () => (
  <Switch>
    <Route
      exact
      path="/"
      component={ReactLogo}
    />
    <Route
      path="/auth/"
      render={(props) => <LoginPage {...props} type="login" />}
    />
  </Switch>
);

RootRoutes.propTypes = {};

export default RootRoutes;
