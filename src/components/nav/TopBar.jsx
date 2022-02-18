import React, { useEffect, useRef, useState } from 'react';
// import PropTypes from 'prop-types';
import {
  ChevronRight, User, Settings, HelpCircle, ToggleRight, Clipboard, File, Check,
} from 'react-feather';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from 'store/user/actionCreators';
import TopBarSearch from 'components/nav/TopBarSearch';
import getBreadcrumbName from 'const/breadcrumbsNames';
import { useTranslation } from 'react-i18next';
import Notifications from 'components/nav/Notifications';
import Api from '../../api';
import Tooltip from '../Tooltip';


// TODO: finish this
const TopBar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isShown = useSelector((store) => store.interface.topBarShow);
  const user = useSelector((store) => store.user);
  const [projects, setProjects] = useState([]);
  const [verified, setVerified] = useState(false);
  const [link, setLink] = useState('');

  const { pathname } = useLocation();

  const fetchData = () => {
    Api.get('payment/project/')
      .then((resp) => {
        setProjects(resp.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const projectLink = (projects) => {
    let link = '/system/profile/projects/';
    projects.forEach((project) => {
      if (project.is_default) {
        link = link.concat(project.id);
        if (project.verified) { setVerified(true); }
      }
    });
    setLink(link);
  };

  useEffect(() => {
    projectLink(projects);
  }, [projects]);

  const breadcrumbsNodes = pathname.split('/')
    .filter((path) => !!path)
    .map((name, i, array) => {
      const path = `/${array.slice(0, i + 1).join('/')}/`;
      return (
        <Link
          key={path}
          to={path}
          className={i === array.length - 1 ? 'breadcrumb--active pointer-events-none' : undefined}
        >
          {getBreadcrumbName(name) || name}
        </Link>
      );
    })
    .reduce((r, el) => r.concat(
      <ChevronRight key={`${el.props.to}-sep`} className="breadcrumb__icon" />, el,
    ), [])
    .slice(1);

  const userDropdownRef = useRef();

  const logout = () => {
    dispatch(userLogout());
  };

  const closeDropdown = () => {
    userDropdownRef.current.classList.remove('show');
  };

  return (
    <div className={`top-bar ${isShown ? '' : 'hidden'}`}>
      <div className="-intro-x breadcrumb mr-auto hidden sm:flex">
        {breadcrumbsNodes}
      </div>

      {/* SEARCH */}
      <div className="intro-x relative mr-3 sm:mr-6">
        <TopBarSearch />
      </div>

      {/* PROFILE */}
      <div className="intro-x dropdown relative">
        <div
          style={{ height: 36 }}
          className="dropdown-toggle px-8 rounded-full flex justify-stretch cursor-pointer items-center bg-theme-1 text-white font-medium hover:bg-theme-38"
        >
          <User className="w-5 h-5 mr-1" />
          {t('myProfile')}
        </div>
        <div ref={userDropdownRef} className="dropdown-box mt-10 absolute w-56 top-0 right-0 z-20">
          <div className="dropdown-box__content box bg-theme-38 text-white">
            <div className="p-4 border-b border-theme-40">
              <div className="font-medium">
                {user.first_name} {user.last_name}
              </div>
              {user.organization && (
                <div className="truncate whitespace-normal flex items-center">
                  <div className="text-xs text-theme-41">{user.organization}</div>
                  {verified && (
                    <Tooltip content={t('Organization is verified')} noContainer>
                      <Check className="w-2 h-2 ml-2" />
                    </Tooltip>
                  )}
                </div>
              )}
              {user.position && (
                <div className="text-xs text-theme-41">{user.position}</div>
              )}
            </div>
            <div className="p-2">
              <Link
                onClick={closeDropdown}
                to={link}
                className="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 rounded-md"
              >
                <Clipboard className="w-4 h-4 mr-2" /> {t('projects')}
              </Link>
              <Link
                onClick={closeDropdown}
                to="/system/profile/settings/"
                className="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 rounded-md"
              >
                <Settings className="w-4 h-4 mr-2" /> {t('settings')}
              </Link>
              <Link
                onClick={closeDropdown}
                to="/system/profile/my-payments/"
                className="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 rounded-md"
              >
                <File className="w-4 h-4 mr-2" /> {t('myPayments')}
              </Link>
              <Link
                onClick={closeDropdown}
                to="/system/profile/my-logs/"
                className="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 rounded-md"
              >
                <File className="w-4 h-4 mr-2" /> {t('myLogs')}
              </Link>
              <Link
                onClick={closeDropdown}
                to="/system/help/"
                className="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 rounded-md"
              >
                <HelpCircle className="w-4 h-4 mr-2" /> {t('help')}
              </Link>
            </div>
            <div className="p-2 border-t border-theme-40">
              <a
                href="#?"
                onClick={logout}
                className="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 rounded-md"
              >
                <ToggleRight className="w-4 h-4 mr-2" /> {t('logout')}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* NOTIFICATIONS */}
      <div className="intro-x dropdown relative ml-auto sm:ml-6">
        <Notifications />
      </div>
    </div>
  );
};

export default TopBar;
