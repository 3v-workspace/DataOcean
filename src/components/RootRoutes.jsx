import React from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import ReactLogo from './ReactLogo';
import LoginPage from './auth/LoginPage';
import SignUp from './sign_up/SignUp';


const RootRoutes = () => (
  <Switch>
    <Route
      exact
      path="/"
      component={ReactLogo}
    />
    <Route
      exact
      path="/login/"
      component={LoginPage}
    />
    <Route
      exact
      path="/sign_up/"
      component={SignUp}
    />
  </Switch>
);

RootRoutes.propTypes = {};

export default RootRoutes;
