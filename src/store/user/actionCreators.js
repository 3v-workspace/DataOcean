import {
  SET_USER_DATA,
  USER_LOGIN,
  USER_LOGOUT,
} from 'store/user/actions';

import { Cookies } from 'react-cookie';
import { REMOVE_COOKIE_OPTIONS } from 'hooks/useDOCookies';

export const setUserData = (user) => ({
  type: SET_USER_DATA,
  payload: {
    ...user,
  },
});

export const userLogin = (user) => ({
  type: USER_LOGIN,
  payload: {
    ...user,
  },
});

export const userLogout = () => {
  const cookies = new Cookies(['token', 'pt', 'firstname', 'lastname', 'email', 'lang']);
  cookies.remove('pt', REMOVE_COOKIE_OPTIONS);
  cookies.remove('token', REMOVE_COOKIE_OPTIONS);
  cookies.remove('firstname', REMOVE_COOKIE_OPTIONS);
  cookies.remove('lastname', REMOVE_COOKIE_OPTIONS);
  cookies.remove('email', REMOVE_COOKIE_OPTIONS);
  cookies.remove('lang', REMOVE_COOKIE_OPTIONS);
  return {
    type: USER_LOGOUT,
  };
};
