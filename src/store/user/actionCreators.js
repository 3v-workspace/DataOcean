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
  const cookies = new Cookies(['token', 'firstname', 'lastname']);
  cookies.remove('token', { path: '/' });
  cookies.remove('firstname', { path: '/' });
  cookies.remove('lastname', { path: '/' });
  return {
    type: USER_LOGOUT,
  };
};
