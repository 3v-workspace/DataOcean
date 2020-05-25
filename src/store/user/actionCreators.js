import { SET_USER_DATA } from 'store/user/actions';

export const setUserData = (user) => ({
  type: SET_USER_DATA,
  payload: {
    ...user,
  },
});
