import { createStore } from 'redux';
import mainReducer from './store/mainReducer';

const tools = (
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  !(process.env.NODE_ENV === 'production') ?
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__() :
    undefined
);
const store = createStore(mainReducer, tools);

export default store;
