import {
  SET_USER_DATA,
  USER_LOGIN,
  USER_LOGOUT,
} from 'store/user/actions';

// initial state for dev
/*
const initialState = {
    company_name: 'Data Ocean',
    isLoggedIn: true,
    id: null,
    email: 'olena.havryliuk@becausewhynot.com',
    first_name: 'Olena',
    last_name: 'Havryliuk',
    instagram: 'heletrix',
    twitter: 'heletricks',
  };
*/

const initialState = {
  company_name: '',
  email: '',
  first_name: '',
  id: null,
  instagram: '',
  isLoggedIn: false,
  last_name: '',
  twitter: '',
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
