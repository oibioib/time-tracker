import { useTranslation } from 'react-i18next';

import { Grid, Paper, Typography } from '@mui/material';

const EmptyViewProject = () => {
  const { t } = useTranslation();
  return (
    <Grid
      component={Paper}
      container
      width="100%"
      justifyContent="center"
      textAlign="center"
      direction="column"
      elevation={0}
      sx={{ p: { xs: 1, sm: 2 } }}>
      <Typography component="h2" variant="h6" fontWeight="bold" mb={2}>
        {t('timersInfo.message.noData')}
      </Typography>
      <Typography component="p" variant="body1">
        {t('timersInfo.message.openTimers')}
      </Typography>
      <Typography component="p" variant="body1">
        {t('timersInfo.message.createTimer')}
      </Typography>
    </Grid>
  );
};

export default EmptyViewProject;
