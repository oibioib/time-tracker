import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as LinkRouter, useNavigate } from 'react-router-dom';

import { Button, Grid, IconButton, PaletteMode } from '@mui/material';

import LangSwitch from '../../components/LangSwitch';
import { LOCAL_STORAGE_KEY, ROUTES } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setGitHubUserData } from '../../store/gitHubFetchSlice';
import { changeTheme } from '../../store/themeModeSlice';
import {
  Brightness4Icon,
  Brightness7Icon,
  DashboardIcon,
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
      <Grid item>
        <Button size="large" variant="contained" component={LinkRouter} to="/">
          {t('buttons.mainPage')}
        </Button>
      </Grid>
      <Grid item container spacing={1} sx={{ width: 'auto' }}>
        <Grid item>
          {isLoggedIn ? (
            <Button size="large" variant="contained" onClick={logoutHandler}>
              {t('buttons.logout')}
            </Button>
          ) : (
            <Button
              size="large"
              variant="contained"
              component={LinkRouter}
              to={ROUTES.LOGIN}>
              {t('buttons.loginPage')}
            </Button>
          )}
        </Grid>
        <Grid item>
          <Button
            size="large"
            variant="contained"
            startIcon={<DashboardIcon />}
            component={LinkRouter}
            to={ROUTES.DASHBOARD}>
            {t('buttons.dashboardPage')}
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ width: 'auto' }}>
        <Grid item>
          <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
            {mode === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Grid>
        <Grid item>
          <LangSwitch />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HeaderLayout;
