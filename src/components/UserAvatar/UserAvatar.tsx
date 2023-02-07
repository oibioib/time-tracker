import { useEffect } from 'react';

import { Avatar, Grid, Typography } from '@mui/material';

import githubUserData from '../../api/githubApi';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setGitHubUserData } from '../../store/gitHubFetchSlice';

const UserAvatar = () => {
  const userData = useAppSelector((state) => state.gitHubFetch);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!userData.id) {
      (async () => {
        const data = await githubUserData();
        dispatch(
          setGitHubUserData({
            login: data.login,
            id: data.id,
            avatar_url: data.avatar_url,
          })
        );
      })();
    }
  }, [userData, dispatch]);

  return (
    <Grid item ml={2} mt={2} color="white">
      <Avatar alt="user" src={`${userData && userData.avatar_url}`} />
      <Typography variant="body1">
        Name: {userData && userData.login}
      </Typography>
      <Typography variant="body1">ID {userData && userData.id}</Typography>
    </Grid>
  );
};

export default UserAvatar;
