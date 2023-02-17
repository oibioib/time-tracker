import { useState } from 'react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as LinkRouter } from 'react-router-dom';

import {
  Box,
  Button,
  CardMedia,
  Grid,
  IconButton,
  PaletteMode,
  Snackbar,
  Typography,
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import LangSwitch from '../../components/LangSwitch';
import { LOCAL_STORAGE_KEY, ROUTES } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setErrorMessage } from '../../store/errorHandler';
import { changeTheme } from '../../store/themeModeSlice';
import {
  Brightness4Icon,
  Brightness7Icon,
  DashboardIcon,
  LoginIcon,
} from '../../theme/appIcons';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const HeaderLayout = () => {
  const [mode, setMode] = useState<PaletteMode>('dark');
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

  const toggleColorMode = () => {
    setMode((prevMode: PaletteMode) =>
      prevMode === 'light' ? 'dark' : 'light'
    );
    dispatch(changeTheme(mode));
  };

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
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
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
                  sx={{ height: { xs: 30, md: 40 } }}
                  image="./logo-ico.png"
                  alt="Time Tracker"
                />
                <CardMedia
                  component="img"
                  sx={{
                    pl: 2,
                    pr: 3,
                    height: { sm: 30, md: 40 },
                    display: { xs: 'none', sm: 'block' },
                  }}
                  image="./logo-text.png"
                  alt="Time Tracker"
                />
              </Box>
            </LinkRouter>
          </Grid>
          <Grid item>
            {isLoggedIn && (
              <Button
                size="large"
                variant="text"
                component={LinkRouter}
                to={ROUTES.DASHBOARD}
                color="info"
                sx={{
                  gap: 0.5,
                  backgroundColor: 'primary.dark',
                  ':hover': {
                    backgroundColor: 'primary.main',
                  },
                }}>
                <DashboardIcon />
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
                variant="text"
                component={LinkRouter}
                to={ROUTES.LOGIN}
                color="info"
                sx={{
                  gap: 0.5,
                  backgroundColor: 'primary.dark',
                  ':hover': {
                    backgroundColor: 'primary.main',
                  },
                }}>
                <LoginIcon />
                <Typography
                  color="white"
                  sx={{ display: { xs: 'none', sm: 'block' } }}>
                  {t('buttons.loginPage')}
                </Typography>
              </Button>
            )}
          </Grid>
          <Grid item>
            <IconButton
              sx={{
                ml: 1,
                ':hover': {
                  bgcolor: 'primary.main',
                  color: 'info',
                },
              }}
              onClick={toggleColorMode}
              color="info">
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
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
