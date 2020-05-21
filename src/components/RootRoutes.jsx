import React from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './auth/LoginPage';


const RootRoutes = () => (
  <Switch>
    <Route
      path="/auth/"
      component={LoginPage}
    />
    <Route
      render={() => <Redirect to="/auth/sign-in/" />}
    />
  </Switch>
);

RootRoutes.propTypes = {};

export default RootRoutes;
