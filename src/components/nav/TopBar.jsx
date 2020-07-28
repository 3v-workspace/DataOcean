import React, { useRef } from 'react';
// import PropTypes from 'prop-types';
import {
  ChevronRight, User, Settings, HelpCircle, ToggleRight,
} from 'react-feather';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from 'store/user/actionCreators';
import TopBarSearch from 'components/nav/TopBarSearch';
import breadcrumbsName from 'const/breadcrumbsname';


// TODO: finish this
const TopBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const { pathname: breadcrumbsPath } = useLocation();

  let patharray = breadcrumbsPath.split('/');
  patharray = patharray.filter((path) => path !== '');

  const breadcrumbList = [];
  const paths = [];

  for (let i = 0; i < breadcrumbsPath.length; i += 1) {
    if (breadcrumbsPath[i] === '/') {
      if (i !== 0) {
        paths.push(breadcrumbsPath.slice(0, i));
      }
    }
  }

  for (let i = 0; i < patharray.length - 1; i += 1) {
    if (patharray[i] !== '') {
      if (breadcrumbsName[paths[i]] === undefined) {
        breadcrumbList.push(<Link to={`${paths[i]}/`} className="">{patharray[i]}</Link>);
      } else {
        breadcrumbList.push(<Link to={`${paths[i]}/`} className="">{breadcrumbsName[paths[i]]}</Link>);
      }
      breadcrumbList.push(<ChevronRight className="breadcrumb__icon" />);
    }
  }
  if (breadcrumbsName[paths[paths.length - 1]] === undefined) {
    breadcrumbList.push(<Link to={`${paths[paths.length - 1]}/`} className="breadcrumb--active">{patharray[patharray.length - 1]}</Link>);
  } else {
    breadcrumbList.push(<Link to={`${paths[paths.length - 1]}/`} className="breadcrumb--active">{breadcrumbsName[paths[paths.length - 1]]}</Link>);
  }

  const userDropdownRef = useRef();

  const logout = () => {
    dispatch(userLogout());
  };

  const closeDropdown = () => {
    userDropdownRef.current.classList.remove('show');
  };

  return (
    <div className="top-bar">
      <div className="-intro-x breadcrumb mr-auto hidden sm:flex">
        {breadcrumbList}
      </div>

      {/* SEARCH */}
      <div className="intro-x relative mr-3 sm:mr-6">
        <TopBarSearch />
      </div>

      {/* PROFILE */}
      <div className="intro-x dropdown w-8 h-8 relative">
        <div className="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in">
          <User width="100%" height="100%" />
        </div>
        <div ref={userDropdownRef} className="dropdown-box mt-10 absolute w-56 top-0 right-0 z-20">
          <div className="dropdown-box__content box bg-theme-38 text-white">
            <div className="p-4 border-b border-theme-40">
              <div className="font-medium">
                {user.first_name} {user.last_name}
              </div>
              {user.organization && (
                <div className="text-xs text-theme-41">{user.organization}</div>
              )}
              {user.position && (
                <div className="text-xs text-theme-41">{user.position}</div>
              )}
            </div>
            <div className="p-2">
              <Link
                onClick={closeDropdown}
                to="/system/profile/"
                className="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 rounded-md"
              >
                <User className="w-4 h-4 mr-2" /> Профіль
              </Link>
              <Link
                onClick={closeDropdown}
                to="/system/profile/settings/"
                className="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 rounded-md"
              >
                <Settings className="w-4 h-4 mr-2" /> Налаштування
              </Link>
              <a
                href="#?"
                onClick={closeDropdown}
                className="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 rounded-md"
              >
                <HelpCircle className="w-4 h-4 mr-2" /> Допомога
              </a>
            </div>
            <div className="p-2 border-t border-theme-40">
              <a
                href="#?"
                onClick={logout}
                className="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 rounded-md"
              >
                <ToggleRight className="w-4 h-4 mr-2" /> Вийти
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
