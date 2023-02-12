import { configureStore } from '@reduxjs/toolkit';

import gitHubFetchReducer from './gitHubFetchSlice';
import serverUserDataSlice from './serverUserDataSlice';
import themeModeReducer from './themeModeSlice';
import timeTrackerSlice from './timeTrackerSlice';

const store = configureStore({
  reducer: {
    gitHubFetch: gitHubFetchReducer,
    themeMode: themeModeReducer,
    timeTracker: timeTrackerSlice,
    serverUserData: serverUserDataSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
