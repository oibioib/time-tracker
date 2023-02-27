import { createSlice } from '@reduxjs/toolkit';

import { DEFAULT_COLOR } from '../constants/appConstants';
import { DEFAULT_PROJECT_ID } from '../constants/serverConstants';

const timeTrackerSlice = createSlice({
  name: 'timeTrackerSlice',
  initialState: {
    isTimerOn: false,
    timerId: '',
    totalTime: 0,
    timerTitle: '',
    previousTimeStamp: 0,
    projectId: DEFAULT_PROJECT_ID,
    projectTitle: '',
    projectColor: DEFAULT_COLOR,
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
      state.projectColor = action.payload.projectColor;
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
