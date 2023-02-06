import { createSlice } from '@reduxjs/toolkit';

const timeTrackerSlice = createSlice({
  name: 'timeTrackerSlice',
  initialState: {
    startTime: 0,
    endTime: 0,
  },
  reducers: {
    setStartTime(state, action) {
      state.startTime = action.payload.startTime;
    },
    setEndTime(state, action) {
      state.endTime = action.payload.endTime;
    },
  },
});

export const { setStartTime, setEndTime } = timeTrackerSlice.actions;
export default timeTrackerSlice.reducer;
