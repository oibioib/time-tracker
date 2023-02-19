import { useState } from 'react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as LinkRouter } from 'react-router-dom';

import { Button, Grid, Snackbar, Typography } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import LangSwitch from '../../components/LangSwitch';
import ThemeSwitch from '../../components/ThemeSwitch/ThemeSwitch';
import { LOCAL_STORAGE_KEY, ROUTES } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setErrorMessage } from '../../store/errorHandler';
import { DashboardIcon, HomeIcon, LoginIcon } from '../../theme/appIcons';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const HeaderLayout = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const gitHubID = useAppSelector((state) => state.gitHubFetch.id);
  const errorMessage = useAppSelector(
    (state) => state.errorHandler.errorMessage
  );
  const token = localStorage.getItem(LOCAL_STORAGE_KEY);
  const isLoggedIn = gitHubID || token;
  const [open, setOpen] = useState(false);

  React.useEffect(() => {
    if (errorMessage) {
      setOpen(true);
    }
  }, [errorMessage]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    dispatch(setErrorMessage(''));
  };

  return (
    <>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </Stack>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between">
        <Grid item container spacing={1} sx={{ width: 'auto' }}>
          <Grid item>
            <Button
              size="large"
              variant="contained"
              startIcon={<HomeIcon />}
              component={LinkRouter}
              to="/">
              <Typography
                color="white"
                sx={{ display: { xs: 'none', sm: 'block' } }}>
                {t('buttons.mainPage')}
              </Typography>
            </Button>
          </Grid>
          <Grid item>
            {isLoggedIn && (
              <Button
                size="large"
                variant="contained"
                startIcon={<DashboardIcon />}
                component={LinkRouter}
                to={ROUTES.DASHBOARD}>
                <Typography
                  color="white"
                  sx={{ display: { xs: 'none', sm: 'block' } }}>
                  {t('buttons.dashboardPage')}
                </Typography>
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          sx={{ width: 'auto' }}
          direction="row"
          alignItems="center"
          justifyContent="space-between">
          <Grid item>
            {!isLoggedIn && (
              <Button
                size="large"
                variant="contained"
                startIcon={<LoginIcon />}
                component={LinkRouter}
                to={ROUTES.LOGIN}>
                <Typography
                  color="white"
                  sx={{ display: { xs: 'none', sm: 'block' } }}>
                  {t('buttons.loginPage')}
                </Typography>
              </Button>
            )}
          </Grid>
          <Grid item>
            <ThemeSwitch />
          </Grid>
          <Grid item alignItems="center">
            <LangSwitch />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default HeaderLayout;
