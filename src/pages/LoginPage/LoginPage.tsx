import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Box, Button, CircularProgress, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

import { getGitHubToken, getGithubUserData } from '../../api/githubApi';
import { GITHUB_AUTH, LOCAL_STORAGE_KEY } from '../../constants';
import { useAppDispatch } from '../../hooks/hooks';
import { setGitHubUserData } from '../../store/gitHubFetchSlice';

const LoginPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const gitHubCode = searchParams.get(GITHUB_AUTH.URL_PARAM);
  const localStorageToken = localStorage.getItem(LOCAL_STORAGE_KEY);
  const [refresh, setRefresh] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (gitHubCode && !localStorageToken) {
      (async () => {
        setIsLoading(true);
        const data = await getGitHubToken(gitHubCode);
        localStorage.setItem(LOCAL_STORAGE_KEY, data.access_token);
        setRefresh(!refresh);
      })();
    }
  }, [gitHubCode, localStorageToken, navigate, dispatch, refresh]);

  useEffect(() => {
    if (localStorageToken) {
      (async () => {
        const data = await getGithubUserData();
        dispatch(
          setGitHubUserData({
            login: data.login,
            id: data.id,
            avatar_url: data.avatar_url,
          })
        );
        navigate('/tracker');
        setIsLoading(false);
      })();
    }
  }, [localStorageToken, dispatch, navigate]);

  if (isLoading) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item pb={5} pt={5}>
        <Typography variant="h4" component="h1">
          Login via Github
        </Typography>
      </Grid>
      <Grid item>
        <Button
          size="large"
          variant="contained"
          href={`https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`}>
          {t('buttons.gitHubLogin')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
