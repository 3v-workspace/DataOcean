import React, { useEffect } from 'react';
import ReactRouterPropTypes from 'utils/react-router-prop-types';
import { Route, Switch } from 'react-router-dom';
import SignInForm from 'components/pages/auth/SignInForm';
import SignUpForm from 'components/pages/auth/SignUpForm';
import Route404 from 'components/pages/Route404';
import RestorePassword from 'components/pages/auth/RestorePassword';
import { useSelector } from 'react-redux';


const LoginPage = ({ match, history, location }) => {
  const user = useSelector((state) => state.user);
  const { from } = location.state || { from: { pathname: '/system/' } };

  useEffect(() => {
    if (user.isLoggedIn) {
      history.replace(from);
    }
  }, [user.isLoggedIn]);

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
        <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
          <div
            className="my-auto mx-auto xl:ml-20 bg-white xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
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
              <Route
                exact
                path={`${match.path}restore-pass/`}
                component={RestorePassword}
              />
              <Route404 />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

export default LoginPage;
