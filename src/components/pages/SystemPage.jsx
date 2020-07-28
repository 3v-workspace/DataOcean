import React from 'react';
import { Redirect } from 'react-router-dom';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { useIsLogin } from 'hooks';
import Nav from 'components/nav/Nav';
import NavItem from 'components/nav/NavItem';
import SystemRoutes from 'components/pages/SystemRoutes';
import {
  Activity, Home, FileText, Trello, BookOpen, HelpCircle,
} from 'react-feather';
import TopBar from 'components/nav/TopBar';

const menu = (
  <>
    <NavItem link="/system/home/" icon={Home}>
      Домівка
    </NavItem>
    <NavItem link="/system/datasets/" icon={Trello}>
      Набори даних
    </NavItem>
    <NavItem link="/system/analytics/" icon={Activity}>
      Конструктор звітів
    </NavItem>
    <NavItem link="/system/documents/" icon={FileText}>
      Конструктор даних
    </NavItem>
    <NavItem link="/system/contacts/" icon={BookOpen}>
      Контакти
    </NavItem>
    <NavItem link="/system/help/" icon={HelpCircle}>
      Допомога
    </NavItem>
  </>
);

const SystemPage = (props) => {
  const { location } = props;
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
      <Nav isMobile>
        {menu}
      </Nav>
      <div className="flex">
        <Nav>
          {menu}
        </Nav>
        <div className="content">
          <TopBar breadcrumbsPath={location.pathname} />
          <SystemRoutes {...props} />
        </div>
      </div>
    </>
  );
};

SystemPage.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
};

export default SystemPage;
