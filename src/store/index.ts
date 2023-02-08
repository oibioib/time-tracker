import { configureStore } from '@reduxjs/toolkit';

import flyUserDataSlice from './flyUserDataSlice';
import gitHubFetchReducer from './gitHubFetchSlice';
import themeModeReducer from './themeModeSlice';
import timeTrackerSlice from './timeTrackerSlice';

const store = configureStore({
  reducer: {
    gitHubFetch: gitHubFetchReducer,
    themeMode: themeModeReducer,
    timeTracker: timeTrackerSlice,
    flyUserData: flyUserDataSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
