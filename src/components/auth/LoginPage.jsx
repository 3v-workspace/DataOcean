import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'utils/react-router-prop-types';
import { Route, Switch } from 'react-router-dom';
import SignInForm from 'components/auth/SignInForm';
import SignUpForm from 'components/auth/SignUpForm';


const LoginPage = ({ match }) => {
  useEffect(() => {
    document.body.classList.add('login');
    return () => {
      document.body.classList.remove('login');
    };
  }, []);
  return (
    <div className="container sm:px-10">
      <div className="block xl:grid grid-cols-2 gap-4">
        <div className="hidden xl:flex flex-col min-h-screen">
          <a href="#?" className="-intro-x flex items-center pt-5">
            <img alt="Midone Tailwind HTML Admin Template" className="w-6" src="/images/logo.svg" />
            <span className="text-white text-lg ml-3">
              <span className="font-medium">Data Ocean</span>
            </span>
          </a>
          <div className="my-auto">
            <img
              alt="Midone Tailwind HTML Admin Template"
              className="-intro-x w-1/2 -mt-16"
              src="/images/illustration.svg"
            />
            <div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
              A few more clicks to
              <br />
              sign in to your account.
            </div>
            <div className="-intro-x mt-5 text-lg text-white">Manage all your e-commerce accounts in one place</div>
          </div>
        </div>
        <Switch>
          <Route
            exact
            path={`${match.path}sign-in/`}
            component={SignInForm}
          />
          <Route
            exact
            path={`${match.path}sign-up/`}
            component={SignUpForm}
          />
        </Switch>
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  ...ReactRouterPropTypes,
};

export default LoginPage;
