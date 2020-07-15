import { combineReducers } from 'redux';
import userReducer from 'store/user/reducer';

const mainReducer = combineReducers({
  user: userReducer,
});

export default mainReducer;
