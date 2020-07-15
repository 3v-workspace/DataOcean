import {
  SET_USER_DATA,
  USER_LOGIN,
  USER_LOGOUT,
} from 'store/user/actions';

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
  window.localStorage.removeItem('token');
  return {
    type: USER_LOGOUT,
  };
};
