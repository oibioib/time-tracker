import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUserTimers } from '../api/serverApi';
import getUserTimersInterval from '../api/statisticsApi';

export interface timerData {
  id: string;
  isActive: number;
  startTime: string;
  title: string;
  totalTime: string;
}

export interface statisticsState {
  timePeriod: [number, number];
  getDataIntervalStatus: string;
  getDataIntervalError: string;
  timersStatus: string;
  timersError: string;
  timersData: timerData[];
  dataInterval: timerData[];
}

const initialState: statisticsState = {
  getDataIntervalStatus: '',
  getDataIntervalError: '',
  timersStatus: '',
  timersError: '',
  timersData: [],
  timePeriod: [new Date().getTime(), new Date().getTime() + 86399000],
  dataInterval: [],
};

export const getAllTimers = createAsyncThunk(
  'timeAll/fetchGetAllTimers',
  getUserTimers
);

export const getDataInterval = createAsyncThunk(
  'statistics/fetchTimersInterval',
  getUserTimersInterval
);

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    addTimePeriod: (state, action: PayloadAction<[number, number]>) => {
      state.timePeriod = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataInterval.pending, (state) => {
        state.getDataIntervalStatus = 'loading';
      })
      .addCase(getDataInterval.fulfilled, (state, { payload }) => {
        state.getDataIntervalStatus = 'fulfilled';
        if (payload) {
          console.log(payload);
          state.dataInterval = payload;
        }
      })
      .addCase(getDataInterval.rejected, (state, { error }) => {
        if (error.message) {
          state.getDataIntervalError = error.message;
        }
        state.getDataIntervalStatus = 'rejected';
      });
    builder
      .addCase(getAllTimers.pending, (state) => {
        state.timersStatus = 'loading';
      })
      .addCase(getAllTimers.fulfilled, (state, { payload }) => {
        state.timersStatus = 'fulfilled';
        if (payload) {
          // console.log(payload);
          state.timersData = payload;
        }
      })
      .addCase(getAllTimers.rejected, (state, { error }) => {
        if (error.message) {
          state.timersError = error.message;
        }
        state.timersStatus = 'rejected';
      });
  },
});

export const { addTimePeriod } = statisticsSlice.actions;

export default statisticsSlice.reducer;
