import { createSlice } from '@reduxjs/toolkit';

// import { GITHUB_AUTH, LOCAL_STORAGE_KEY } from '../constants';

const gitHubFetchSlice = createSlice({
  name: 'gitHubFetchSlice',
  initialState: {
    login: 'login',
    avatar_url: 'url',
    id: 0,
  },
  reducers: {
    setToken(state, action) {
      state.login = action.payload.login;
      state.avatar_url = action.payload.avatar_url;
      state.id = action.payload.id;
    },
  },
});

export const { setToken } = gitHubFetchSlice.actions;
export default gitHubFetchSlice.reducer;
// const sendGitHubCode = (code: string) => {
//   return async (dispatch: Function) => {
//     const localStorageToken = localStorage.getItem(LOCAL_STORAGE_KEY);
//     if (code && !localStorageToken) {
//       dispatch(
//         gitHubFetchSlice.actions.showNotification({
//           status: 'pending',
//           title: 'Sending...',
//           message: 'Waiting for gitHub Token it make take some minutes',
//         })
//       );

//       const sendRequest = async () => {
//         const result = await fetch(
//           `${GITHUB_AUTH.PROXY_URL}/getAccessToken?code=${code}`,
//           {
//             method: 'GET',
//           }
//         );
//         if (!result.ok) {
//           throw new Error('Getting token is failed');
//         }
//         const data = await result.json();
//         dispatch(gitHubFetchSlice.actions.setToken(data.access_token));
//         localStorage.setItem(LOCAL_STORAGE_KEY, data.access_token);
//       };
//       try {
//         await sendRequest();
//         dispatch(
//           gitHubFetchSlice.actions.showNotification({
//             status: 'Success',
//             title: 'Success',
//             message: 'The token is gotten',
//           })
//         );
//       } catch (error) {
//         dispatch(
//           gitHubFetchSlice.actions.showNotification({
//             status: 'error',
//             title: 'Error!',
//             message: 'Getting token has failed!',
//           })
//         );
//       }
//     }
//   };
// };
