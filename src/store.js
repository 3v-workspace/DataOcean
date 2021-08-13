import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './store/mainReducer';

const store = configureStore({
  reducer: mainReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
