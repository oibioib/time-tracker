import { createSlice } from '@reduxjs/toolkit';

const timeTrackerSlice = createSlice({
  name: 'timeTrackerSlice',
  initialState: {
    startTime: 0,
    totalTime: 0,
  },
  reducers: {
    setStartTime(state, action) {
      state.startTime = action.payload.startTime;
    },
    setTotalTime(state, action) {
      state.totalTime = action.payload;
    },
  },
});

export const { setStartTime, setTotalTime } = timeTrackerSlice.actions;
export default timeTrackerSlice.reducer;
