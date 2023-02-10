import { createSlice } from '@reduxjs/toolkit';

const timeTrackerSlice = createSlice({
  name: 'timeTrackerSlice',
  initialState: {
    isTimerOn: false,
    timerId: '',
    totalTime: 0,
    timerTitle: '',
    previousTimeStamp: 0,
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
  },
});

export const { setIsTimerOn, setTimerData, setPreviousTimeStamp } =
  timeTrackerSlice.actions;
export default timeTrackerSlice.reducer;
