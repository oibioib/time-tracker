import { useTranslation } from 'react-i18next';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

const ErrorPage = () => {
  const { t } = useTranslation();
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}>
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: '7rem', sm: '9rem', md: '11rem', lg: '12rem' },
            fontWeight: 600,
          }}>
          {error.status}
        </Typography>
        <Typography component="h2" variant="h3">
          {t('notFound.oops')}
        </Typography>
        <Typography component="h3" variant="h5">
          {error.statusText}
        </Typography>
        {error.data?.message && (
          <Typography component="div" variant="body1">
            {error.data.message}
          </Typography>
        )}
      </Grid>
    );
  }
  return <div>Oops</div>;
};

export default ErrorPage;
