import { createSlice } from '@reduxjs/toolkit';

const timeTrackerSlice = createSlice({
  name: 'timeTrackerSlice',
  initialState: {
    isTimerOn: false,
    timerId: '',
    totalTime: 0,
    timerTitle: '',
    previousTimeStamp: 0,
    projectId: '',
    projectTitle: '',
  },
  reducers: {
    setIsTimerOn(state, action) {
      state.isTimerOn = action.payload;
    },
    setTimerData(state, action) {
      state.timerId = action.payload.timerId;
      state.totalTime = action.payload.totalTime;
      state.timerTitle = action.payload.timerTitle;
    },
    setPreviousTimeStamp(state, action) {
      state.previousTimeStamp = action.payload;
    },
    setProjectToTimer(state, action) {
      state.projectId = action.payload.projectId;
      state.projectTitle = action.payload.projectTitle;
    },
  },
});

export const {
  setIsTimerOn,
  setTimerData,
  setPreviousTimeStamp,
  setProjectToTimer,
} = timeTrackerSlice.actions;
export default timeTrackerSlice.reducer;
