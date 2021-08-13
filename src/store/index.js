import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'store/user/reducer';
import tablesSlice from 'store/tables/reducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    tables: tablesSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
