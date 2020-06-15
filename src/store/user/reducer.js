import {
  SET_USER_DATA,
  USER_LOGIN,
  USER_LOGOUT,
} from 'store/user/actions';

const initialState = {
  company_name: '',
  email: '',
  first_name: '',
  id: null,
  isLoggedIn: false,
  last_name: '',
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
