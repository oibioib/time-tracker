import { Avatar, Grid, Typography } from '@mui/material';

import { useAppSelector } from '../../hooks/hooks';

const UserAvatar = () => {
  const newUserName = useAppSelector((state) => state.gitHubFetch.newName);
  const userData = useAppSelector((state) => state.gitHubFetch);

  return (
    <Grid item ml={2} mt={2} color="white">
      <Avatar alt="user" src={`${userData && userData.avatar_url}`} />
      {newUserName ? (
        <Typography variant="body1">{newUserName}</Typography>
      ) : (
        <Typography variant="body1">{userData && userData.login}</Typography>
      )}
    </Grid>
  );
};

export default UserAvatar;
