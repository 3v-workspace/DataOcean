import { createSlice } from '@reduxjs/toolkit';

const interfaceSlice = createSlice({
  name: 'interface',
  initialState: { topBarShow: true },
  reducers: {
    setTopBarShow(state, action) {
      state.topBarShow = action.payload;
    },
  },
});

export default interfaceSlice;
