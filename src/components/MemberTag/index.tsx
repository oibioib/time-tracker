import GitHubIcon from '@mui/icons-material/GitHub';
import { Button, Link as LinkMui } from '@mui/material';

interface ITeamMember {
  gitHubProfile: string;
}

const MemberTag = ({ gitHubProfile }: ITeamMember) => {
  return (
    <Button
      color="inherit"
      sx={{ textTransform: 'inherit' }}
      startIcon={<GitHubIcon />}
      component={LinkMui}
      href={`https://github.com/${gitHubProfile}`}
      target="_blank"
      rel="noopener noreferrer"
      underline="hover">
      {gitHubProfile}
    </Button>
  );
};

export default MemberTag;
