import { SET_USER_DATA } from 'store/user/actions';

const initialState = {
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
    default:
      return state;
  }
};

export default userReducer;
