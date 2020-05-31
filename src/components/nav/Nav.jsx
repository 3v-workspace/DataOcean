import React from 'react';
import ReactRouterPropTypes from 'utils/react-router-prop-types';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import menuItems from 'static/mock/menuItems';
import NavItem from 'components/nav/NavItem';
import NavDropdown from 'components/nav/NavDropdown';

import AnalyticsPage from 'components/pages/AnalyticsPage';
import ConstructorPage from 'components/pages/ConstructorPage';
import ContactsPage from 'components/pages/ContactsPage';
import DocumentsPage from 'components/pages/DocumentsPage';

import paths from 'const/paths';

const Nav = ({ match }) => (
  <div className="flex">
    <nav className="side-nav">
      <Link to="/home" className="intro-x flex items-center pl-5 pt-4">
        <img alt="Data Ocean Logo" className="w-6" src="/images/logo.svg" />
        <span className="hidden xl:block text-white font-medium text-lg ml-3 ">Data Ocean</span>
      </Link>
      <div className="side-nav__devider my-6" />
      <ul>
        {
            menuItems.map((item) => (
              item.items ?
                <NavDropdown item={item} /> :
                <NavItem item={item} />))
          }
      </ul>
    </nav>
    <div className="content">
      <Switch>
        <Route exact path={paths.CONSTRUCTOR} component={ConstructorPage} />
        <Route exact path={paths.DOCUMENTS} component={DocumentsPage} />
        <Route exact path={paths.CONTACTS} component={ContactsPage} />
        <Route exact path={paths.ANALYTICS} component={AnalyticsPage} />
        <Route path={paths.LOGIN} render={() => <Redirect to="/auth/sign-in/" />} />
        <Route path="*" component={() => null} />
      </Switch>
    </div>
  </div>
);

Nav.propTypes = {
  ...ReactRouterPropTypes,
};

export default Nav;
