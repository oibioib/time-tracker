import { createSlice } from '@reduxjs/toolkit';

import { PaletteMode } from '@mui/material';

import { LOCAL_THEME_MOD } from '../constants';
import { THEME_MODE } from '../constants/appConstants';

const localTheme = localStorage.getItem(LOCAL_THEME_MOD);
const theme: PaletteMode = (
  localTheme === THEME_MODE.LIGHT || localTheme === THEME_MODE.DARK
    ? localTheme
    : THEME_MODE.LIGHT
) as PaletteMode;

const initialState = {
  themeColor: theme,
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
