import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { LOCAL_GIT_NAME, LOCAL_USER_NAME } from '../constants';

const localName = localStorage.getItem(LOCAL_USER_NAME);
const localGitName = localStorage.getItem(LOCAL_GIT_NAME);
const gitHubFetchSlice = createSlice({
  name: 'gitHubFetchSlice',
  initialState: {
    login: 'login',
    avatar_url: 'url',
    id: 0,
    newName: localName || '',
    gitHubName: localGitName || '',
  },
  reducers: {
    setGitHubUserData(state, action) {
      state.login = action.payload.login;
      state.avatar_url = action.payload.avatar_url;
      state.id = action.payload.id;
    },
    setNewName(state, action: PayloadAction<string>) {
      state.newName = action.payload;
      localStorage.setItem(LOCAL_USER_NAME, action.payload);
    },
    setGitHubName(state, action: PayloadAction<string>) {
      state.gitHubName = action.payload;
      localStorage.setItem(LOCAL_GIT_NAME, action.payload);
    },
  },
});

export const { setGitHubName, setGitHubUserData, setNewName } =
  gitHubFetchSlice.actions;

export default gitHubFetchSlice.reducer;
