import React from 'react';
import { Redirect } from 'react-router-dom';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { useIsLogin } from 'hooks';
import Nav from 'components/nav/Nav';
import NavDropdown from 'components/nav/NavDropdown';
import NavItem from 'components/nav/NavItem';
import SystemRoutes from 'components/pages/SystemRoutes';
import {
  Activity, Edit, Home, FileText, Trello, BookOpen, HelpCircle,
} from 'react-feather';
import TopBar from 'components/nav/TopBar';

const menu = (
  <>
    <NavItem link="/system/home/" icon={Home}>
      Домівка
    </NavItem>
    <NavItem link="/system/dashboard/" icon={Trello}>
      Дашбоард
    </NavItem>
    <NavDropdown label="Конструктори даних" icon={Edit}>
      <NavItem link="/system/constructor/datasets/">
        Набори даних
      </NavItem>
      <NavItem link="/system/constructor/my-data/">
        Мої дані
      </NavItem>
    </NavDropdown>
    <NavItem link="/system/analytics/" icon={Activity}>
      Аналіз даних
    </NavItem>
    <NavItem link="/system/documents/" icon={FileText}>
      Документи
    </NavItem>
    <NavItem link="/system/contacts/" icon={BookOpen}>
      Контакти
    </NavItem>
    <NavItem link="/system/help/" icon={HelpCircle}>
      Нормативно довідкова інформація
    </NavItem>
    <NavItem link="/system/modals/" icon={FileText}>
      Приклад використання
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
          <TopBar />
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
