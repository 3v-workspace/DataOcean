import { combineReducers } from 'redux';
import userReducer from 'store/user/reducer';

const mainReducer = combineReducers({
  userReducer,
});

export default mainReducer;
