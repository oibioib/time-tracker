import { useState } from 'react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as LinkRouter } from 'react-router-dom';

import { Box, CardMedia, Grid, Snackbar, Typography } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import logoIco from '../../assets/logo-ico.png';
import logoText from '../../assets/logo-text.png';
import LangSwitch from '../../components/LangSwitch';
import Logout from '../../components/Logout/Logout';
import ThemeSwitch from '../../components/ThemeSwitch/ThemeSwitch';
import { LOCAL_STORAGE_KEY, ROUTES } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setErrorMessage } from '../../store/errorHandler';
import { DashboardIcon, LoginIcon } from '../../theme/appIcons';
import {
  HeaderButton,
  headerButtonTypography,
} from '../../theme/styledComponents/HeaderButton';

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
        <Grid
          item
          container
          spacing={1}
          sx={{ width: 'auto' }}
          alignItems="center">
          <Grid item>
            <LinkRouter to="/">
              <Box sx={{ display: 'flex' }}>
                <CardMedia
                  component="img"
                  sx={{ height: { xs: 30, md: 40 }, width: 'auto' }}
                  image={logoIco}
                  alt="Time Tracker"
                />
                <CardMedia
                  component="img"
                  sx={{
                    pl: 2,
                    pr: 3,
                    height: { sm: 30, md: 40 },
                    width: 'auto',
                    display: { xs: 'none', sm: 'block' },
                  }}
                  image={logoText}
                  alt="Time Tracker"
                />
              </Box>
            </LinkRouter>
          </Grid>
          <Grid item>
            {isLoggedIn && (
              <HeaderButton
                variant="text"
                component={LinkRouter}
                to={ROUTES.DASHBOARD}>
                <DashboardIcon />
                <Typography sx={headerButtonTypography}>
                  {t('buttons.dashboardPage')}
                </Typography>
              </HeaderButton>
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
            {!isLoggedIn ? (
              <HeaderButton
                variant="text"
                component={LinkRouter}
                to={ROUTES.LOGIN}>
                <LoginIcon />
                <Typography sx={headerButtonTypography}>
                  {t('buttons.loginPage')}
                </Typography>
              </HeaderButton>
            ) : (
              <Logout />
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
