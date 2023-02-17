import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getUserTimersInterval,
  getUserTotalTimeInterval,
} from '../api/statisticsApi';
import { DURATION_OF_DAY } from '../constants/appConstants';

export interface timerData {
  id: string;
  isActive: number;
  startTime: string;
  title: string;
  totalTime: string;
}

export interface timersDataTotal {
  day: number;
  startTime: string;
  totalTime: string;
}

export interface statisticsState {
  timePeriod: [number, number];
  valueX: string;
  isChangeCalendar: boolean;
  getDataIntervalStatus: string;
  getDataIntervalError: string;
  getTimersTimeStatus: string;
  getTimersTimeError: string;
  dataInterval: timerData[];
  dataTotalTime: timersDataTotal[];
}

const initialState: statisticsState = {
  dataInterval: [],
  isChangeCalendar: false,
  valueX: 'tasks',
  getDataIntervalStatus: '',
  getDataIntervalError: '',
  getTimersTimeStatus: '',
  getTimersTimeError: '',
  timePeriod: [new Date().getTime(), new Date().getTime() + DURATION_OF_DAY],
  dataTotalTime: [],
};

export const getDataInterval = createAsyncThunk(
  'statistics/fetchTimersInterval',
  getUserTimersInterval
);

export const getTimersTime = createAsyncThunk(
  'statistics/fetchTimersTime',
  getUserTotalTimeInterval
);

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    addTimePeriod: (state, action: PayloadAction<[number, number]>) => {
      state.timePeriod = action.payload;
    },
    addValueX: (state, action: PayloadAction<string>) => {
      state.valueX = action.payload;
    },
    changeCalendar: (state, action: PayloadAction<boolean>) => {
      state.isChangeCalendar = action.payload;
    },
    deleteTotalData: (state) => {
      state.dataTotalTime = [];
    },
    deleteDataInterval: (state) => {
      state.dataInterval = [];
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
      .addCase(getTimersTime.pending, (state) => {
        state.getTimersTimeStatus = 'loading';
      })
      .addCase(getTimersTime.fulfilled, (state, { payload }) => {
        state.getTimersTimeStatus = 'fulfilled';
        if (payload) {
          state.dataTotalTime = payload;
        }
      })
      .addCase(getTimersTime.rejected, (state, { error }) => {
        if (error.message) {
          state.getTimersTimeError = error.message;
        }
        state.getTimersTimeStatus = 'rejected';
      });
  },
});

export const {
  changeCalendar,
  addTimePeriod,
  addValueX,
  deleteTotalData,
  deleteDataInterval,
} = statisticsSlice.actions;

export default statisticsSlice.reducer;
