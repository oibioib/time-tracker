import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import errorHandlerSlice from './errorHandler';
import gitHubFetchReducer from './gitHubFetchSlice';
import serverUserDataSlice from './serverUserDataSlice';
import statisticsReducer from './statisticSlice';
import themeModeReducer from './themeModeSlice';
import timeTrackerSlice from './timeTrackerSlice';

const store = configureStore({
  reducer: {
    gitHubFetch: gitHubFetchReducer,
    themeMode: themeModeReducer,
    timeTracker: timeTrackerSlice,
    statistics: statisticsReducer,
    serverUserData: serverUserDataSlice,
    errorHandler: errorHandlerSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
