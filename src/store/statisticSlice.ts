import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import getAlltimers from '../api/getTimers';
import { createProjectUserData } from '../api/projectUserData';

export interface timerData {
  id: string;
  isActive: number;
  startTime: string;
  title: string;
  totalTime: string;
}

export interface statisticsState {
  createProjectUserData: {
    githubId: number;
    githubName: string;
    id: string;
    name: string;
  };
  createProjectUserStatus: string;
  createProjectUserError: string;
  timersStatus: string;
  timersError: string;
  timersData: timerData[];
}

const initialState: statisticsState = {
  createProjectUserData: { githubId: 0, githubName: '', id: '', name: '' },
  createProjectUserStatus: '',
  createProjectUserError: '',
  timersStatus: '',
  timersError: '',
  timersData: [],
};

export const createProjectUser = createAsyncThunk(
  'tokenOfUser/fetchSignUp',
  createProjectUserData
);

export const getAllTime = createAsyncThunk(
  'timeAll/fetchGetAllTimers',
  getAlltimers
);

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProjectUser.pending, (state) => {
        state.createProjectUserStatus = 'loading';
      })
      .addCase(createProjectUser.fulfilled, (state, { payload }) => {
        state.createProjectUserStatus = 'fulfilled';
        if (payload) {
          console.log(payload);
          state.createProjectUserData = payload;
        }
      })
      .addCase(createProjectUser.rejected, (state, { error }) => {
        if (error.message) {
          state.createProjectUserError = error.message;
        }
        state.createProjectUserStatus = 'rejected';
      });

    builder
      .addCase(getAllTime.pending, (state) => {
        state.timersStatus = 'loading';
      })
      .addCase(getAllTime.fulfilled, (state, { payload }) => {
        state.timersStatus = 'fulfilled';
        if (payload) {
          console.log(payload);
          state.timersData = payload;
        }
      })
      .addCase(getAllTime.rejected, (state, { error }) => {
        if (error.message) {
          state.timersError = error.message;
        }
        state.timersStatus = 'rejected';
      });
  },
});

export default statisticsSlice.reducer;
