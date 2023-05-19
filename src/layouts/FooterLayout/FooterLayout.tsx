import { Button, Grid, Link as LinkMui, Typography } from '@mui/material';

import { ReactComponent as RSlogo } from '../../assets/rssLogo.svg';
import MemberTag from '../../components/MemberTag/MemberTag';
import { GithubMembers } from '../../constants';

const FooterLayout = () => {
  return (
    <Grid
      container
      alignItems="center"
      color="white"
      justifyContent="center"
      sx={{
        '& > *': { flex: '1 1 0' },
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 2, md: 5 },
      }}>
      <Grid item container justifyContent="center">
        <MemberTag gitHubProfile={GithubMembers.PAVEL_GITHUB} />
        <MemberTag gitHubProfile={GithubMembers.ALCHONOKK_GITHUB} />
        <MemberTag gitHubProfile={GithubMembers.ALEX_GITHUB} />
      </Grid>
      <Typography component="span" variant="body1" textAlign="center">
        2023
      </Typography>
      <Button
        color="inherit"
        component={LinkMui}
        href="https://rs.school/js/"
        target="_blank"
        rel="noopener noreferrer"
        underline="hover"
        sx={{
          '& svg': {
            color: 'white',
            transition: '0.3s',
          },
          '&:hover': {
            backgroundColor: 'transparent',
            '& svg': {
              color: 'primary.light',
            },
          },
        }}>
        <RSlogo height={25} />
      </Button>
    </Grid>
  );
};

export default FooterLayout;
