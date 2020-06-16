import React from 'react';
// import PropTypes from 'prop-types';
import {
  ChevronRight, Search, Inbox, Users, CreditCard, Bell,
  User, Shield, HelpCircle, Lock, ToggleRight,
} from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from 'store/user/actionCreators';

// TODO: finish this
const TopBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const logout = () => {
    dispatch(userLogout());
  };

  return (
    <div className="top-bar">
      <div className="-intro-x breadcrumb mr-auto hidden sm:flex">
        <a href="#?" className="">System</a>
        <ChevronRight className="breadcrumb__icon" />
        <a href="#?" className="breadcrumb--active">Dashboard</a>
      </div>

      {/* SEARCH */}
      <div className="intro-x relative mr-3 sm:mr-6">
        <div className="search hidden sm:block">
          <input type="text" className="search__input input placeholder-theme-13" placeholder="Search..." />
          <Search className="search__icon" />
        </div>
        <a className="notification sm:hidden" href="#?">
          <Search className="notification__icon" />
        </a>
        <div className="search-result">
          <div className="search-result__content">
            <div className="search-result__content__title">Pages</div>
            <div className="mb-5">
              <a href="#?" className="flex items-center">
                <div className="w-8 h-8 bg-theme-18 text-theme-9 flex items-center justify-center rounded-full">
                  <Inbox className="w-4 h-4" />
                </div>
                <div className="ml-3">Mail Settings</div>
              </a>
              <a href="#?" className="flex items-center mt-2">
                <div className="w-8 h-8 bg-theme-17 text-theme-11 flex items-center justify-center rounded-full">
                  <Users className="w-4 h-4" />
                </div>
                <div className="ml-3">Users & Permissions</div>
              </a>
              <a href="#?" className="flex items-center mt-2">
                <div className="w-8 h-8 bg-theme-14 text-theme-10 flex items-center justify-center rounded-full">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div className="ml-3">Transactions Report</div>
              </a>
            </div>
            <div className="search-result__content__title">Users</div>
            <div className="mb-5">
              <a href="#?" className="flex items-center mt-2">
                <div className="w-8 h-8 image-fit">
                  <img
                    alt="Midone Tailwind HTML Admin Template"
                    className="rounded-full"
                    src="/images/profile-2.jpg"
                  />
                </div>
                <div className="ml-3">Denzel Washington</div>
                <div className="ml-auto w-48 truncate text-gray-600 text-xs text-right">denzelwashington@left4code.com
                </div>
              </a>
              <a href="#?" className="flex items-center mt-2">
                <div className="w-8 h-8 image-fit">
                  <img
                    alt="Midone Tailwind HTML Admin Template"
                    className="rounded-full"
                    src="/images/profile-3.jpg"
                  />
                </div>
                <div className="ml-3">Kate Winslet</div>
                <div className="ml-auto w-48 truncate text-gray-600 text-xs text-right">katewinslet@left4code.com</div>
              </a>
              <a href="#?" className="flex items-center mt-2">
                <div className="w-8 h-8 image-fit">
                  <img
                    alt="Midone Tailwind HTML Admin Template"
                    className="rounded-full"
                    src="/images/profile-11.jpg"
                  />
                </div>
                <div className="ml-3">Robert De Niro</div>
                <div className="ml-auto w-48 truncate text-gray-600 text-xs text-right">robertdeniro@left4code.com</div>
              </a>
              <a href="#?" className="flex items-center mt-2">
                <div className="w-8 h-8 image-fit">
                  <img
                    alt="Midone Tailwind HTML Admin Template"
                    className="rounded-full"
                    src="/images/profile-6.jpg"
                  />
                </div>
                <div className="ml-3">Al Pacino</div>
                <div className="ml-auto w-48 truncate text-gray-600 text-xs text-right">alpacino@left4code.com</div>
              </a>
            </div>
            <div className="search-result__content__title">Products</div>
            <a href="#?" className="flex items-center mt-2">
              <div className="w-8 h-8 image-fit">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="rounded-full"
                  src="/images/preview-12.jpg"
                />
              </div>
              <div className="ml-3">Samsung Galaxy S20 Ultra</div>
              <div className="ml-auto w-48 truncate text-gray-600 text-xs text-right">Smartphone &amp; Tablet</div>
            </a>
            <a href="#?" className="flex items-center mt-2">
              <div className="w-8 h-8 image-fit">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="rounded-full"
                  src="/images/preview-14.jpg"
                />
              </div>
              <div className="ml-3">Nikon Z6</div>
              <div className="ml-auto w-48 truncate text-gray-600 text-xs text-right">Photography</div>
            </a>
            <a href="#?" className="flex items-center mt-2">
              <div className="w-8 h-8 image-fit">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="rounded-full"
                  src="/images/preview-3.jpg"
                />
              </div>
              <div className="ml-3">Samsung Galaxy S20 Ultra</div>
              <div className="ml-auto w-48 truncate text-gray-600 text-xs text-right">Smartphone &amp; Tablet</div>
            </a>
            <a href="#?" className="flex items-center mt-2">
              <div className="w-8 h-8 image-fit">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="rounded-full"
                  src="/images/preview-7.jpg"
                />
              </div>
              <div className="ml-3">Oppo Find X2 Pro</div>
              <div className="ml-auto w-48 truncate text-gray-600 text-xs text-right">Smartphone &amp; Tablet</div>
            </a>
          </div>
        </div>
      </div>

      <div className="intro-x dropdown relative mr-auto sm:mr-6">
        <div className="dropdown-toggle notification notification--bullet cursor-pointer">
          <Bell className="notification__icon" />
        </div>
        <div
          className="notification-content dropdown-box mt-8 absolute top-0 left-0 sm:left-auto sm:right-0 z-20 -ml-10 sm:ml-0"
        >
          <div className="notification-content__box dropdown-box__content box">
            <div className="notification-content__title">Notifications</div>
            <div className="cursor-pointer relative flex items-center ">
              <div className="w-12 h-12 flex-none image-fit mr-1">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="rounded-full"
                  src="/images/profile-2.jpg"
                />
                <div className="w-3 h-3 bg-theme-9 absolute right-0 bottom-0 rounded-full border-2 border-white" />
              </div>
              <div className="ml-2 overflow-hidden">
                <div className="flex items-center">
                  <a href="#?" className="font-medium truncate mr-5">Denzel Washington</a>
                  <div className="text-xs text-gray-500 ml-auto whitespace-no-wrap">01:10 PM</div>
                </div>
                <div className="w-full truncate text-gray-600">
                  It is a long established fact that a reader will be distracted by the
                  readable content of a page when looking at its layout. The point of using Lorem
                </div>
              </div>
            </div>
            <div className="cursor-pointer relative flex items-center mt-5">
              <div className="w-12 h-12 flex-none image-fit mr-1">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="rounded-full"
                  src="/images/profile-3.jpg"
                />
                <div className="w-3 h-3 bg-theme-9 absolute right-0 bottom-0 rounded-full border-2 border-white" />
              </div>
              <div className="ml-2 overflow-hidden">
                <div className="flex items-center">
                  <a href="#?" className="font-medium truncate mr-5">Kate Winslet</a>
                  <div className="text-xs text-gray-500 ml-auto whitespace-no-wrap">01:10 PM</div>
                </div>
                <div className="w-full truncate text-gray-600">
                  It is a long established fact that a reader will be
                  distracted by the readable content of a page when looking
                  at its layout. The point of using Lorem
                </div>
              </div>
            </div>
            <div className="cursor-pointer relative flex items-center mt-5">
              <div className="w-12 h-12 flex-none image-fit mr-1">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="rounded-full"
                  src="/images/profile-11.jpg"
                />
                <div className="w-3 h-3 bg-theme-9 absolute right-0 bottom-0 rounded-full border-2 border-white" />
              </div>
              <div className="ml-2 overflow-hidden">
                <div className="flex items-center">
                  <a href="#?" className="font-medium truncate mr-5">Robert De Niro</a>
                  <div className="text-xs text-gray-500 ml-auto whitespace-no-wrap">06:05 AM</div>
                </div>
                <div className="w-full truncate text-gray-600">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration
                  in some form, by injected humour, or randomi
                </div>
              </div>
            </div>
            <div className="cursor-pointer relative flex items-center mt-5">
              <div className="w-12 h-12 flex-none image-fit mr-1">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="rounded-full"
                  src="/images/profile-6.jpg"
                />
                <div className="w-3 h-3 bg-theme-9 absolute right-0 bottom-0 rounded-full border-2 border-white" />
              </div>
              <div className="ml-2 overflow-hidden">
                <div className="flex items-center">
                  <a href="#?" className="font-medium truncate mr-5">Al Pacino</a>
                  <div className="text-xs text-gray-500 ml-auto whitespace-no-wrap">01:10 PM</div>
                </div>
                <div className="w-full truncate text-gray-600">
                  Contrary to popular belief, Lorem Ipsum is not simply
                  random text. It has roots in a piece of classical Latin
                  literature from 45 BC, making it over 20
                </div>
              </div>
            </div>
            <div className="cursor-pointer relative flex items-center mt-5">
              <div className="w-12 h-12 flex-none image-fit mr-1">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="rounded-full"
                  src="/images/profile-6.jpg"
                />
                <div className="w-3 h-3 bg-theme-9 absolute right-0 bottom-0 rounded-full border-2 border-white" />
              </div>
              <div className="ml-2 overflow-hidden">
                <div className="flex items-center">
                  <a href="#?" className="font-medium truncate mr-5">Kevin Spacey</a>
                  <div className="text-xs text-gray-500 ml-auto whitespace-no-wrap">01:10 PM</div>
                </div>
                <div className="w-full truncate text-gray-600">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration
                  in some form, by injected humour, or randomi
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="intro-x dropdown w-8 h-8 relative">
        <div className="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in">
          <User width="100%" height="100%" />
        </div>
        <div className="dropdown-box mt-10 absolute w-56 top-0 right-0 z-20">
          <div className="dropdown-box__content box bg-theme-38 text-white">
            <div className="p-4 border-b border-theme-40">
              <div className="font-medium">
                {user.first_name} {user.last_name}
              </div>
              <div className="text-xs text-theme-41">{user.company_name}</div>
            </div>
            <div className="p-2">
              <Link
                to="/system/profile/edit"
                className="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 rounded-md"
              >
                <User className="w-4 h-4 mr-2" /> Профіль
              </Link>
              <Link
                to="/system/profile/subscription"
                className="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 rounded-md"
              >
                <Shield className="w-4 h-4 mr-2" /> Підписка
              </Link>
              <Link
                to="/system/profile/change-pass"
                className="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 rounded-md"
              >
                <Lock className="w-4 h-4 mr-2" /> Змінити пароль
              </Link>
              <a
                href="#?"
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

TopBar.propTypes = {};

export default TopBar;
