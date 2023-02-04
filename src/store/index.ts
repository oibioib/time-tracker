import { configureStore } from '@reduxjs/toolkit';

import gitHubFetchReducer from './gitHubFetchSlice';
import themeModeReducer from './themeModeSlice';

const store = configureStore({
  reducer: {
    gitHubFetch: gitHubFetchReducer,
    themeMode: themeModeReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
