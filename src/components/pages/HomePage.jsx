import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ReactRouterPropTypes from 'utils/react-router-prop-types';
import useIsLogin from 'hooks/loginHooks';
// import PropTypes from 'prop-types';
import menuItems from 'static/mock/menuItems';
import Nav from 'components/nav/Nav';
import NavDropdown from 'components/nav/NavDropdown';
import NavItem from 'components/nav/NavItem';
import NavMobile from 'components/nav/NavMobile';
import NavMobileDropdown from 'components/nav/NavMobileDropdown';
import NavMobileItem from 'components/nav/NavMobileItem';

import AnalyticsPage from 'components/pages/AnalyticsPage';
import ConstructorPage from 'components/pages/ConstructorPage';
import ContactsPage from 'components/pages/ContactsPage';
import DocumentsPage from 'components/pages/DocumentsPage';

import paths from 'const/paths';

const HomePage = ({ location }) => {
  const isLogin = useIsLogin();
  if (!isLogin) {
    return (
      <Redirect
        to={{
          pathname: '/auth/sign-in/',
          state: { from: location },
        }}
      />
    );
  }

  return (
    <>
      <NavMobile>
        {
            menuItems.map((item) => (
              item.items ? (
                <NavMobileDropdown item={item}>
                  {
                    item.items.map((i) => (
                      <NavMobileItem item={i} />
                    ))
                  }
                </NavMobileDropdown>
              ) :
                <NavMobileItem item={item} />))
          }
      </NavMobile>
      <div className="flex">
        <Nav>
          {
            menuItems.map((item) => (
              item.items ? (
                <NavDropdown item={item}>
                  {
                    item.items.map((i) => (
                      <NavItem item={i} />
                    ))
                  }
                </NavDropdown>
              ) :
                <NavItem item={item} />))
          }
        </Nav>
        <div className="content">
          <Switch>
            <Route exact path={paths.CONSTRUCTOR} component={ConstructorPage} />
            <Route exact path={paths.DOCUMENTS} component={DocumentsPage} />
            <Route exact path={paths.CONTACTS} component={ContactsPage} />
            <Route exact path={paths.ANALYTICS} component={AnalyticsPage} />
            <Route path={paths.LOGIN} render={() => <Redirect to="/auth/sign-in/" />} />
            <Route path="*" component={() => <div>Home Page </div>} />
          </Switch>
        </div>
      </div>
    </>
  );
};

HomePage.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
};

export default HomePage;
