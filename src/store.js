import { createStore } from 'redux';
import mainReducer from './store/mainReducer';

// eslint-disable-next-line no-underscore-dangle
let tools = window.__REDUX_DEVTOOLS_EXTENSION__;
if (tools && !(process.env.NODE_ENV === 'production')) {
  tools = tools();
} else {
  tools = undefined;
}

const store = createStore(mainReducer, tools);

export default store;
