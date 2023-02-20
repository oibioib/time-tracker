import { Avatar, Grid, Typography } from '@mui/material';

import { useAppSelector } from '../../hooks/hooks';

const UserAvatar = () => {
  const newUserName = useAppSelector((state) => state.gitHubFetch.newName);
  const userData = useAppSelector((state) => state.gitHubFetch);
  const gitHubName = useAppSelector((state) => state.gitHubFetch.gitHubName);

  const nameStyle = { display: { xs: 'none', lg: 'block' } };
  const avatarStyle = {
    width: { xs: 25, sm: 30, md: 40 },
    height: { xs: 25, sm: 30, md: 40 },
  };

  return (
    <Grid item color="white">
      <Avatar
        alt="user"
        sx={avatarStyle}
        src={`${userData && userData.avatar_url}`}
      />
      {newUserName ? (
        <Typography variant="body1" sx={nameStyle}>
          {newUserName}
        </Typography>
      ) : (
        <Typography variant="body1" sx={nameStyle}>
          {userData && gitHubName}
        </Typography>
      )}
    </Grid>
  );
};

export default UserAvatar;
