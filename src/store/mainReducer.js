import userReducer from 'store/user/reducer';
import tablesSlice from 'store/tables/reducer';

const mainReducer = {
  user: userReducer,
  tables: tablesSlice.reducer,
};

export default mainReducer;
