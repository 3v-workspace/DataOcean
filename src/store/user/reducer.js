import {
  SET_USER_DATA,
  USER_LOGIN,
  USER_LOGOUT,
} from 'store/user/actions';
import setLanguage from 'utils/setLanguage';

const initialState = {
  // base
  id: null,
  email: '',
  first_name: '',
  last_name: '',
  organization: '',
  position: '',
  date_of_birth: '',
  language: 'uk',
  person_status: '',
  iban: '',
  company_name: '',
  company_address: '',
  identification_code: '',
  mfo: '',

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
      setLanguage();
      return {
        ...initialState,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default userReducer;
