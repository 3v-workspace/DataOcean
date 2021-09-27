import { createSlice } from '@reduxjs/toolkit';

const interfaceSlice = createSlice({
  name: 'interface',
  initialState: {
    topBarShow: true,
    isOverflow: true,
  },
  reducers: {
    setTopBarShow(state, action) {
      state.topBarShow = action.payload;
    },
    setOverflow(state, action) {
      state.isOverflow = action.payload;
    },
  },
});

export default interfaceSlice;
