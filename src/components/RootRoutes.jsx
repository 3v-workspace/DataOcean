import React from 'react';
import Route404, { Page404 } from 'components/pages/Route404';
import { Switch, Route, Redirect } from 'react-router-dom';
import { setLanguage } from 'utils';
import { useIsLogin } from 'hooks';
import SystemPage from 'components/pages/SystemPage';
import LoginPage from './pages/auth/LoginPage';


const RootRoutes = () => {
  const isLogin = useIsLogin();
  const qs = new URLSearchParams(window.location.search);

  let needClear = false;

  const language = qs.get('lang');
  if (['uk', 'en'].includes(language)) {
    if (!isLogin) {
      setLanguage(language);
    }
    needClear = true;
  }

  const subscriptionId = +qs.get('subscription');
  if (subscriptionId) {
    window.localStorage.setItem('subscription', subscriptionId.toString());
    needClear = true;
  }

  if (needClear) {
    window.history.replaceState(null, document.title, window.location.pathname);
  }

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

// RootRoutes.propTypes = {};

export default RootRoutes;
