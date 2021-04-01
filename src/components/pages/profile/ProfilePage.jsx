import React, { useEffect, useState } from 'react';
import Api from 'api';
import { ReactRouterPropTypes } from 'utils/prop-types';
import {
  Mail, Settings, User, Clipboard, File, Download,
} from 'react-feather';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ProjectsPage from '../payment/ProjectsPage';
import InvoicesTable from '../payment/InvoicesTable';
import ProfileSettings from './ProfileSettings';


const ProfilePage = ({ match }) => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({ api_requests: '---', endpoints: '---' });

  const user = useSelector((store) => store.user);
  useEffect(() => {
    Api.get('stats/profile/')
      .then((resp) => {
        setStats(resp.data);
      });
  }, []);

  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">
          {t('profile')}
        </h2>
      </div>
      <div className="intro-y box px-5 pt-5 mt-5">
        <div className="flex flex-col lg:flex-row border-b border-gray-200 pb-5 -mx-5">
          <div className="flex flex-1 px-5 items-center justify-center lg:justify-start">
            <div className="w-20 h-20 sm:w-24 sm:h-24 flex-none lg:w-32 lg:h-32 image-fit relative">
              <div className="rounded-full overflow-hidden shadow-lg">
                <User width="100%" height="100%" />
              </div>
            </div>
            <div className="ml-5">
              <div className="sm:w-40 truncate sm:whitespace-normal font-medium text-lg">
                {user.first_name} {user.last_name}
              </div>
              <div className="truncate sm:whitespace-normal flex items-center">
                <Mail className="w-4 h-4 mr-2" /> {user.email}
              </div>
              {user.organization && <div className="text-gray-600">{user.organization}</div>}
              {user.position && <div className="text-gray-600">{user.position}</div>}
            </div>
          </div>
          <div
            className={
              'flex mt-6 lg:mt-0 items-center lg:items-center flex-1 flex-col justify-center ' +
              'text-gray-600 px-5 border-l border-r border-gray-200 border-t lg:border-t-0 pt-5 lg:pt-0'
            }
          >
            <a
              className="sm:whitespace-normal flex items-center mr-2 inline-flex text-theme-1"
              href="/docs/Contract.docx"
              target="_blank"
              download
            >
              <Download className="mr-2" />
              {t('downloadContract')}
            </a>
          </div>
          <div
            className={
              'mt-6 lg:mt-0 flex-1 flex items-center justify-center px-5 ' +
              'border-t lg:border-0 border-gray-200 pt-5 lg:pt-0'
            }
          >
            <div className="text-center rounded-md w-20 py-3">
              <div className="font-semibold text-theme-1 text-lg">{stats.endpoints}</div>
              <div className="text-gray-600">{t('endpoints')}</div>
            </div>
            <div className="text-center rounded-md w-20 py-3">
              <div className="font-semibold text-theme-1 text-lg">{stats.api_requests}</div>
              <div className="text-gray-600">{t('requests')}</div>
            </div>
            <div className="text-center rounded-md w-20 py-3">
              <div className="font-semibold text-theme-1 text-lg">0</div>
              <div className="text-gray-600">{t('reports')}</div>
            </div>
          </div>
        </div>
        <div className="nav-tabs flex flex-col sm:flex-row justify-center lg:justify-start">
          {/*<NavLink*/}
          {/*  exact*/}
          {/*  to="/system/profile/"*/}
          {/*  data-toggle="tab"*/}
          {/*  className="py-4 sm:mr-8 flex items-center"*/}
          {/*  activeClassName="active"*/}
          {/*>*/}
          {/*  <User className="w-4 h-4 mr-2" /> {t('profile')}*/}
          {/*</NavLink>*/}
          <NavLink
            to="/system/profile/projects/"
            data-toggle="tab"
            className="py-4 sm:mr-8 flex items-center"
            activeClassName="active"
          >
            <Clipboard className="w-4 h-4 mr-2" /> {t('projects')}
          </NavLink>
          <NavLink
            exact
            to="/system/profile/settings/"
            data-toggle="tab"
            className="py-4 sm:mr-8 flex items-center"
            activeClassName="active"
          >
            <Settings className="w-4 h-4 mr-2" /> {t('settings')}
          </NavLink>
          <NavLink
            exact
            to="/system/profile/my-payments/"
            data-toggle="tab"
            className="py-4 sm:mr-8 flex items-center"
            activeClassName="active"
          >
            <File className="w-4 h-4 mr-2" /> {t('myPayments')}
          </NavLink>
        </div>
      </div>
      <Switch>
        <Route
          exact
          path={`${match.path}projects/:projectId/my-payments/:subscriptionId/`}
          component={InvoicesTable}
        />
        <Route
          exact
          path={`${match.path}my-payments/`}
          component={InvoicesTable}
        />
        <Route
          exact
          path={`${match.path}settings/`}
          component={ProfileSettings}
        />
        <Route
          path={`${match.path}projects/`}
          component={ProjectsPage}
        />
        <Route
          exact
          path={match.path}
          // component={ProfileInfo}
          render={() => <Redirect to={`${match.url}projects/`} />}
        />
      </Switch>
    </>
  );
};

ProfilePage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default ProfilePage;
