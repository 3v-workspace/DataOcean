import React from 'react';
import { Redirect } from 'react-router-dom';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { useIsLogin } from 'hooks';
import Nav from 'components/nav/Nav';
import NavItem from 'components/nav/NavItem';
import SystemRoutes from 'components/pages/SystemRoutes';
import {
  Activity, Home, FileText, Trello, BookOpen,
  HelpCircle, DollarSign, Cloud, Users, Layers,
} from 'react-feather';
import TopBar from 'components/nav/TopBar';
import { useTranslation } from 'react-i18next';
import NavDropdown from 'components/nav/NavDropdown';


const SystemPage = (props) => {
  const { t } = useTranslation();
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

  const menu = (
    <>
      <NavItem link="/system/home/" icon={Home}>
        {t('home')}
      </NavItem>
      {/*<NavItem link="/system/datasets/" icon={Trello}>*/}
      {/*  {t('datasets')}*/}
      {/*</NavItem>*/}
      <NavDropdown label={t('datasets')} icon={Trello} defaultOpen>
        <NavItem link="/system/datasets/" icon={Layers} activeLinkMode="equal">
          {t('all')}
        </NavItem>
        <NavItem link="/system/datasets/pep/" icon={Users}>
          {t('pep')}
        </NavItem>
      </NavDropdown>
      <NavItem link="/system/report-constructor/" icon={Activity}>
        {t('reportConstructor')}
      </NavItem>
      <NavItem link="/system/data-constructor/" icon={FileText}>
        {t('dataConstructor')}
      </NavItem>
      {/*<NavItem link="/system/pep-scheme/" icon={GitBranch}>*/}
      {/*  {t('pepScheme')}*/}
      {/*</NavItem>*/}
      <NavItem link="/system/subscriptions/" icon={DollarSign}>
        {t('subscriptions')}
      </NavItem>
      <NavItem link="/system/api/" icon={Cloud}>
        API
      </NavItem>
      <NavItem link="/system/contacts/" icon={BookOpen}>
        {t('contacts')}
      </NavItem>
      <NavItem link="/system/help/" icon={HelpCircle}>
        {t('help')}
      </NavItem>
    </>
  );

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
      <div className="flex justify-center items-center mt-3 xl:ml-64 lg:ml-32 md:ml-24 text-white">
        ©2020-2021 – Data Ocean. {t('allRightsReserved')}.
      </div>
    </>
  );
};

SystemPage.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
};

export default SystemPage;
