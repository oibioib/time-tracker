import { createSlice } from '@reduxjs/toolkit';

const serverUserLoginSlice = createSlice({
  name: 'serverUserLoginSlice',
  initialState: {
    id: '',
  },
  reducers: {
    setServerUserLogin(state, action) {
      state.id = action.payload;
    },
  },
});

export const { setServerUserLogin } = serverUserLoginSlice.actions;
export default serverUserLoginSlice.reducer;
