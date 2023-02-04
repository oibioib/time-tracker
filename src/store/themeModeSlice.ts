import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { PaletteMode } from '@mui/material';

export interface IThemeMode {
  themeColor: PaletteMode;
}

const initialState: IThemeMode = {
  themeColor: 'light',
};

export const themeModeSlice = createSlice({
  name: 'themeMode',
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<PaletteMode>) {
      state.themeColor = action.payload;
    },
  },
});

export const { changeTheme } = themeModeSlice.actions;
export default themeModeSlice.reducer;
