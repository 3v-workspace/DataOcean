import React from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from 'components/pages/HomePage';
import LoginPage from './auth/LoginPage';


const RootRoutes = () => (
  <Switch>
    <Route
      path="/auth/"
      component={LoginPage}
    />
    <Route
      path="/"
      component={HomePage}
    />
    <Route
      render={() => <Redirect to="/auth/sign-in/" />}
    />
  </Switch>
);

RootRoutes.propTypes = {};

export default RootRoutes;
