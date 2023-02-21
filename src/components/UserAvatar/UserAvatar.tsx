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
    <Grid
      item
      container
      direction="column"
      color="white"
      justifyContent="center"
      alignItems="center"
      gap={1.5}
      sx={{
        overflow: 'hidden',
      }}>
      <Avatar
        alt="user"
        sx={avatarStyle}
        src={`${userData && userData.avatar_url}`}
      />
      {newUserName ? (
        <Typography
          variant="body1"
          sx={{
            ...nameStyle,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}>
          {newUserName}
        </Typography>
      ) : (
        <Typography
          variant="body1"
          sx={{
            ...nameStyle,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}>
          {userData && gitHubName}
        </Typography>
      )}
    </Grid>
  );
};

export default UserAvatar;
