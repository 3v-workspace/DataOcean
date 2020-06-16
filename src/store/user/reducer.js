import {
  SET_USER_DATA,
  USER_LOGIN,
  USER_LOGOUT,
} from 'store/user/actions';

const initialState = {
  // base
  id: null,
  email: '',
  first_name: '',
  last_name: '',
  company_name: '',

  // system
  isLoggedIn: false,
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
