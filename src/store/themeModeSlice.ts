import { createSlice } from '@reduxjs/toolkit';

import { THEME_MODE } from '../constants/appConstants';

const initialState = {
  themeColor: THEME_MODE.LIGHT,
};

export const themeModeSlice = createSlice({
  name: 'themeMode',
  initialState,
  reducers: {
    changeTheme(state, action) {
      state.themeColor = action.payload;
    },
  },
});

export const { changeTheme } = themeModeSlice.actions;
export default themeModeSlice.reducer;
