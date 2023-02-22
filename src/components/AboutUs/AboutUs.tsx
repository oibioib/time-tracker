import { useTranslation } from 'react-i18next';

import {
  Button,
  CardMedia,
  Grid,
  Link as LinkMui,
  Paper,
  Typography,
} from '@mui/material';

import DREAM_TEAM from '../../constants/dreamTeamConstants';
import { GitHubIcon } from '../../theme/appIcons';
import { MAX_CONTENT_WIDTH } from '../../theme/elementsStyles';

const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <Grid
      item
      container
      justifyContent="center"
      maxWidth={MAX_CONTENT_WIDTH * 0.7}
      height="min-content"
      gap={7}
      m={2}>
      <Typography component="h3" variant="h4" width="100%" textAlign="center">
        {t('mainPage.team')}
      </Typography>
      {DREAM_TEAM.map(({ id, github, member, role, photo }) => {
        return (
          <Grid
            item
            container
            key={id}
            justifyContent="center"
            direction="column"
            width="auto"
            gap={1}>
            <Paper
              sx={{
                height: { xs: 150, md: 200 },
                width: { xs: 150, md: 200 },
                borderRadius: '50%',
                alignSelf: 'center',
              }}>
              <CardMedia
                component="img"
                sx={{
                  height: { xs: 150, md: 200 },
                  width: { xs: 150, md: 200 },
                  borderRadius: '50%',
                }}
                image={photo}
                alt="Time Tracker"
              />
            </Paper>
            <Typography variant="h6" textAlign="center">
              {member}
            </Typography>
            <Typography variant="body1" textAlign="center">
              {role}
            </Typography>
            <Typography variant="body1" textAlign="center">
              <Button
                startIcon={<GitHubIcon />}
                component={LinkMui}
                href={`https://github.com/${github}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'primary.light',
                  textTransform: 'inherit',
                  '&:hover': {
                    color: 'primary.dark',
                    backgroundColor: 'transparent',
                  },
                }}>
                <Typography component="span" variant="h6">
                  {github}
                </Typography>
              </Button>
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default AboutUs;
