import {
  SET_USER_DATA,
  USER_LOGIN,
  USER_LOGOUT,
} from 'store/user/actions';

import { Cookies } from 'react-cookie';

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
  const cookies = new Cookies(['token', 'firstname', 'lastname', 'email']);
  cookies.remove('token', { path: '/', domain: process.env.REACT_APP_COOKIE_DOMAIN });
  cookies.remove('firstname', { path: '/', domain: process.env.REACT_APP_COOKIE_DOMAIN });
  cookies.remove('lastname', { path: '/', domain: process.env.REACT_APP_COOKIE_DOMAIN });
  cookies.remove('email', { path: '/', domain: process.env.REACT_APP_COOKIE_DOMAIN });
  return {
    type: USER_LOGOUT,
  };
};
