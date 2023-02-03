import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link as LinkRouter, useNavigate } from 'react-router-dom';

import { Button, Grid } from '@mui/material';

import LangSwitch from '../../components/LangSwitch';
import { LOCAL_STORAGE_KEY, ROUTES } from '../../constants';
import { RootState } from '../../store';
import { setGitHubUserData } from '../../store/gitHubFetchSlice';

const HeaderLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const gitHubID = useSelector((state: RootState) => state.gitHubFetch.id);
  const token = localStorage.getItem(LOCAL_STORAGE_KEY);
  const isLoggedIn = gitHubID || token;
  const logoutHandler = () => {
    localStorage.clear();
    dispatch(setGitHubUserData({ login: 'login', id: 0, avatar_url: 'url' }));
    navigate('/');
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
            component={LinkRouter}
            to={ROUTES.DASHBOARD}>
            {t('buttons.dashboardPage')}
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <LangSwitch />
      </Grid>
    </Grid>
  );
};

export default HeaderLayout;
