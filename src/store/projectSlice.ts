import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
  name: 'projectSlice',
  initialState: {
    projectsArr: [],
  },
  reducers: {
    setProjectArr(state, action) {
      state.projectsArr = action.payload;
    },
  },
});

export const { setProjectArr } = projectSlice.actions;
export default projectSlice.reducer;
