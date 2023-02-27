import { Button, Link as LinkMui, Typography } from '@mui/material';

import { GitHubIcon } from '../../theme/appIcons';

interface ITeamMember {
  gitHubProfile: string;
}

const MemberTag = ({ gitHubProfile }: ITeamMember) => {
  return (
    <Button
      color="inherit"
      startIcon={<GitHubIcon />}
      component={LinkMui}
      href={`https://github.com/${gitHubProfile}`}
      target="_blank"
      rel="noopener noreferrer"
      underline="hover"
      sx={{
        textTransform: 'inherit',
        '&:hover': { backgroundColor: 'transparent', color: 'primary.light' },
      }}>
      <Typography variant="body1">{gitHubProfile}</Typography>
    </Button>
  );
};

export default MemberTag;
