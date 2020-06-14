import React from 'react';
import ReactRouterPropTypes from 'utils/react-router-prop-types';
import { Instagram, Lock, Mail, Settings, Shield, Twitter, User } from 'react-feather';
import { NavLink, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ChangePassword from './ChangePassword';
import ProfileEdit from './ProfileEdit';
import ProfileSettings from './ProfileSettings';
import Subscription from './Subscription';

const ProfilePage = ({ match }) => {
  const user = useSelector((store) => store.user);
  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">
          Профіль
        </h2>
      </div>
      <div className="intro-y box px-5 pt-5 mt-5">
        <div className="flex flex-col lg:flex-row border-b border-gray-200 pb-5 -mx-5">
          <div className="flex flex-1 px-5 items-center justify-center lg:justify-start">
            <div className="w-18 h-18 sm:w-20 sm:h-20 flex-none lg:w-24 lg:h-24 image-fit relative">
              <div className="rounded-full overflow-hidden shadow-lg">
                <User width="100%" height="100%" />
              </div>
            </div>
            <div className="ml-5">
              <div className="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg">{user.first_name} {user.last_name}</div>
              {user.company_name && <div className="text-gray-600">{user.company_name}</div>}
            </div>
          </div>
          <div className="flex mt-6 lg:mt-0 items-center lg:items-start flex-1 flex-col justify-center text-gray-600 px-5 border-l border-r border-gray-200 border-t lg:border-t-0 pt-5 lg:pt-0">
            <div className="truncate sm:whitespace-normal flex items-center"> <Mail className="w-4 h-4 mr-2" /> {user.email} </div>
            {user.instagram && <div className="truncate sm:whitespace-normal flex items-center mt-3"> <Instagram className="w-4 h-4 mr-2" /> Instagram {user.instagram} </div>}
            {user.twitter && <div className="truncate sm:whitespace-normal flex items-center mt-3"> <Twitter className="w-4 h-4 mr-2" /> Twitter {user.twitter} </div>}
          </div>
          <div className="mt-6 lg:mt-0 flex-1 flex items-center justify-center px-5 border-t lg:border-0 border-gray-200 pt-5 lg:pt-0">
            <div className="text-center rounded-md w-20 py-3">
              <div className="font-semibold text-theme-1 text-lg">150</div>
              <div className="text-gray-600">Ендпоінти</div>
            </div>
            <div className="text-center rounded-md w-20 py-3">
              <div className="font-semibold text-theme-1 text-lg">1 k</div>
              <div className="text-gray-600">Запити</div>
            </div>
            <div className="text-center rounded-md w-20 py-3">
              <div className="font-semibold text-theme-1 text-lg">63</div>
              <div className="text-gray-600">Звіти</div>
            </div>
          </div>
        </div>
        <div className="nav-tabs flex flex-col sm:flex-row justify-center lg:justify-start">
          <NavLink to="/system/profile/edit" data-toggle="tab" className="py-4 sm:mr-8 flex items-center" activeClassName="active"> <User className="w-4 h-4 mr-2" /> Профіль </NavLink>
          <NavLink to="/system/profile/subscription/" data-toggle="tab" className="py-4 sm:mr-8 flex items-center" activeClassName="active"> <Shield className="w-4 h-4 mr-2" /> Підписка </NavLink>
          <NavLink to="/system/profile/change-pass/" data-toggle="tab" className="py-4 sm:mr-8 flex items-center" activeClassName="active"> <Lock className="w-4 h-4 mr-2" /> Змінити пароль </NavLink>
          <NavLink to="/system/profile/settings/" data-toggle="tab" className="py-4 sm:mr-8 flex items-center" activeClassName="active"> <Settings className="w-4 h-4 mr-2" /> Налаштування </NavLink>
        </div>
        <Switch>
          <Route
            exact
            path={`${match.path}edit/`}
            component={ProfileEdit}
          />
          <Route
            exact
            path={`${match.path}subscription/`}
            component={Subscription}
          />
          <Route
            exact
            path={`${match.path}change-pass/`}
            component={ChangePassword}
          />
          <Route
            exact
            path={`${match.path}settings/`}
            component={ProfileSettings}
          />
          <Route
            exact
            component={ProfileEdit}
          />
        </Switch>
      </div>
    </>
  );
};

ProfilePage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default ProfilePage;
