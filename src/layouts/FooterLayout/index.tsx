import { Button, Grid, Link as LinkMui } from '@mui/material';

import { ReactComponent as RSlogo } from '../../assets/rssLogo.svg';
import MemberTag from '../../components/MemberTag';
import { GithubMembers } from '../../constants';

const FooterLayout = () => {
  return (
    <Grid
      container
      alignItems="center"
      mt={0.5}
      mb={0.5}
      fontWeight="600"
      color="white"
      justifyContent="space-between">
      <Grid item container width="30%">
        <MemberTag gitHubProfile={GithubMembers.PAVEL_GITHUB} />
        <MemberTag gitHubProfile={GithubMembers.ALCHONOKK_GITHUB} />
        <MemberTag gitHubProfile={GithubMembers.ALEX_GITHUB} />
      </Grid>
      <Grid
        item
        container
        alignItems="center"
        width="30%"
        justifyContent="center">
        2023
      </Grid>
      <Grid item container width="30%" justifyContent="center">
        <Button
          color="inherit"
          component={LinkMui}
          href="https://rs.school/js/"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          width={0.2}>
          <RSlogo height={30} />
        </Button>
      </Grid>
    </Grid>
  );
};

export default FooterLayout;
