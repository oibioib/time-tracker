import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const gitHubFetchSlice = createSlice({
  name: 'gitHubFetchSlice',
  initialState: {
    login: 'login',
    avatar_url: 'url',
    id: 0,
    newName: '',
    gitHubName: '',
  },
  reducers: {
    setGitHubUserData(state, action) {
      state.login = action.payload.login;
      state.avatar_url = action.payload.avatar_url;
      state.id = action.payload.id;
    },
    setNewName(state, action: PayloadAction<string>) {
      state.newName = action.payload;
    },
    setGitHubName(state, action: PayloadAction<string>) {
      state.gitHubName = action.payload;
    },
  },
});

export const { setGitHubName, setGitHubUserData, setNewName } =
  gitHubFetchSlice.actions;
export default gitHubFetchSlice.reducer;
