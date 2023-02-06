import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as LinkRouter, useNavigate } from 'react-router-dom';

import {
  Button,
  Grid,
  IconButton,
  PaletteMode,
  Typography,
} from '@mui/material';

import LangSwitch from '../../components/LangSwitch';
import { LOCAL_STORAGE_KEY, ROUTES } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setGitHubUserData } from '../../store/gitHubFetchSlice';
import { changeTheme } from '../../store/themeModeSlice';
import {
  Brightness4Icon,
  Brightness7Icon,
  DashboardIcon,
  HomeIcon,
  LoginIcon,
  LogoutIcon,
} from '../../theme/appIcons';

const HeaderLayout = () => {
  const [mode, setMode] = useState<PaletteMode>('dark');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const gitHubID = useAppSelector((state) => state.gitHubFetch.id);
  const token = localStorage.getItem(LOCAL_STORAGE_KEY);
  const isLoggedIn = gitHubID || token;
  const logoutHandler = () => {
    localStorage.clear();
    dispatch(setGitHubUserData({ login: 'login', id: 0, avatar_url: 'url' }));
    navigate('/');
  };

  const toggleColorMode = () => {
    setMode((prevMode: PaletteMode) =>
      prevMode === 'light' ? 'dark' : 'light'
    );
    dispatch(changeTheme(mode));
  };

  return (
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
            {/* {t('buttons.mainPage')} */}
          </Button>
        </Grid>
        <Grid item>
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
          {isLoggedIn ? (
            <Button
              size="large"
              variant="contained"
              startIcon={<LogoutIcon />}
              onClick={logoutHandler}>
              <Typography
                color="white"
                sx={{ display: { xs: 'none', sm: 'block' } }}>
                {t('buttons.logout')}
              </Typography>
            </Button>
          ) : (
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
          <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
            {mode === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Grid>
        <Grid item alignItems="center">
          <LangSwitch />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HeaderLayout;
