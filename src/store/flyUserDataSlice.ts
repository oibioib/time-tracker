import { createSlice } from '@reduxjs/toolkit';

const flyUserLoginSlice = createSlice({
  name: 'flyUserLoginSlice',
  initialState: {
    id: '',
  },
  reducers: {
    setFlyUserLogin(state, action) {
      state.id = action.payload;
    },
  },
});

export const { setFlyUserLogin } = flyUserLoginSlice.actions;
export default flyUserLoginSlice.reducer;
