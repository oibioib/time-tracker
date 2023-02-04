import { createSlice } from '@reduxjs/toolkit';

const gitHubFetchSlice = createSlice({
  name: 'gitHubFetchSlice',
  initialState: {
    login: 'login',
    avatar_url: 'url',
    id: 0,
  },
  reducers: {
    setGitHubUserData(state, action) {
      state.login = action.payload.login;
      state.avatar_url = action.payload.avatar_url;
      state.id = action.payload.id;
    },
  },
});

export const { setGitHubUserData } = gitHubFetchSlice.actions;
export default gitHubFetchSlice.reducer;
