import { createSlice } from '@reduxjs/toolkit';

const errorHandlerSlice = createSlice({
  name: 'errorHandlerSlice',
  initialState: {
    errorMessage: '',
  },
  reducers: {
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
  },
});

export const { setErrorMessage } = errorHandlerSlice.actions;
export default errorHandlerSlice.reducer;
