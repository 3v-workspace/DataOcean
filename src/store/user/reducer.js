import {
  SET_USER_DATA,
  USER_LOGIN,
  USER_LOGOUT,
} from 'store/user/actions';

const initialState = {
  isLoggedIn: false,
  email: '',
  firstName: '',
  lastName: '',
  role: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case USER_LOGIN:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
      };
    case USER_LOGOUT:
      return {
        ...initialState,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default userReducer;
