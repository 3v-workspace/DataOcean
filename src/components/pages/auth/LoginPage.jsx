import React, { useEffect } from 'react';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { Route, Switch } from 'react-router-dom';
import SignInForm from 'components/pages/auth/SignInForm';
import SignUpForm from 'components/pages/auth/SignUpForm';
import Route404 from 'components/pages/Route404';
import RestorePassword from 'components/pages/auth/RestorePassword';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SignUpConfirm from 'components/pages/auth/SignUpConfirm';
import surfer from 'images/surfer.png';
import logo from 'images/whitelogo.png';
import english from 'images/english.png';
import ukrainian from 'images/ukrainian.png';
import { setYupLanguage } from 'utils/setLanguage';


const LoginPage = ({ match, history, location }) => {
  const user = useSelector((state) => state.user);
  const { from } = location.state || { from: { pathname: '/system/' } };

  useEffect(() => {
    if (user.isLoggedIn) {
      history.replace(from);
    }
  }, [user.isLoggedIn]);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.body.classList.add('login');
    return () => {
      document.body.classList.remove('login');
    };
  }, []);

  const switchLanguage = () => {
    if (i18n.language === 'uk') {
      i18n.changeLanguage('en');
      setYupLanguage('en');
    } else {
      i18n.changeLanguage('uk');
      setYupLanguage('uk');
    }
  };

  return (
    <div className="container sm:px-10">
      <div className="block xl:grid grid-cols-2 gap-4">
        <div className="hidden xl:flex flex-col min-h-screen">
          <div className="-intro-x flex items-center pt-8">
            <img alt="Data Ocean Logo" className="w-12 -mt-3" src={logo} />
            <div className="text-white text-lg ml-3">
              <div className="font-medium">Data Ocean</div>
              <div className="intro-x text-white text-sm">
                Platform
              </div>
            </div>
          </div>
          <div className="my-auto">
            <img
              alt="Data Ocean surfer"
              className="-intro-x w-1/2 -mt-16"
              src={surfer}
            />
            <div className="-intro-x whitespace-pre-line text-white font-medium text-4xl leading-tight mt-10">
              {t('fewMoreSteps')}
            </div>
            {/* <div className="-intro-x mt-5 text-lg text-white hidden"> */}
            {/*  Manage all your e-commerce accounts in one place */}
            {/* </div> */}
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
                path={`${match.path}sign-up/confirmation/:uid/:token/`}
                component={SignUpConfirm}
              />
              <Route
                exact
                path={`${match.path}sign-up/`}
                component={SignUpForm}
              />
              <Route
                exact
                path={`${match.path}restore-pass/confirmation/:uid/:token/`}
                component={RestorePassword}
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
      <button
        type="button"
        className="dark-mode-switcher shadow-md fixed bottom-0 right-0 box dark:bg-dark-2 border rounded-full px-4 py-2 flex items-center justify-center z-50 mb-10 mr-10"
        onClick={switchLanguage}
      >
        <img
          src={i18n.language === 'en' ? ukrainian : english}
          alt="English"
          className="w-6 h-6 mr-2"
        />
        <div className="text-gray-700 dark:text-gray-300">
          {i18n.language === 'en' ? 'Українська' : 'English'}
        </div>
        {/*<input className="input input--switch border" type="checkbox" value="1" />*/}
      </button>
    </div>
  );
};

LoginPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

export default LoginPage;
