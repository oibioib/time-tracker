import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Box, Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

import githubUserData from '../../api/githubApi';
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
        const result = await fetch(
          `${GITHUB_AUTH.PROXY_URL}/getAccessToken?code=${gitHubCode}`,
          {
            method: 'GET',
          }
        );
        const data = await result.json();
        localStorage.setItem(LOCAL_STORAGE_KEY, data.access_token);
        setRefresh(!refresh);
      })();
    }
  }, [gitHubCode, localStorageToken, navigate, dispatch, refresh]);

  useEffect(() => {
    if (localStorageToken) {
      (async () => {
        const data = await githubUserData();
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

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item pb={5} pt={5}>
        <Typography variant="h4" component="h1">
          Login via Github
        </Typography>
        {isLoading && (
          <Box>
            <Typography variant="body1" component="span">
              <i>Please wait it can take up to some minutes...</i>
            </Typography>
          </Box>
        )}
      </Grid>
      <Grid item>
        <Button
          size="large"
          variant="contained"
          href={`https://github.com/login/oauth/authorize?scope=user&client_id=${GITHUB_AUTH.CLIENT_ID}&redirect_uri=${GITHUB_AUTH.REDIRECT_URI}`}>
          {t('buttons.gitHubLogin')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
