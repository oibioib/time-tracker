import { configureStore } from '@reduxjs/toolkit';

import gitHubFetchReducer from './gitHubFetchSlice';

const store = configureStore({
  reducer: {
    gitHubFetch: gitHubFetchReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
