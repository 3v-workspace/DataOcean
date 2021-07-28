import { combineReducers } from 'redux';
import userReducer from 'store/user/reducer';
import breadcrumbsReducer from 'store/breadcrubms/breadrumbsReducer';

const mainReducer = combineReducers({
  user: userReducer,
  breadcrumbs: breadcrumbsReducer,
});

export default mainReducer;
