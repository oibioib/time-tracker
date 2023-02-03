import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

import { GITHUB_AUTH, LOCAL_STORAGE_KEY } from '../../constants';

const LoginPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const gitHubCode = searchParams.get(GITHUB_AUTH.URL_PARAM);
  const localStorageToken = localStorage.getItem(LOCAL_STORAGE_KEY);
  const [render, setRender] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (gitHubCode && !localStorageToken) {
      (async () => {
        const result = await fetch(
          `${GITHUB_AUTH.PROXY_URL}/getAccessToken?code=${gitHubCode}`,
          {
            method: 'GET',
          }
        );
        const data = await result.json();
        localStorage.setItem(LOCAL_STORAGE_KEY, data.access_token);
        setRender(!render);
      })();
    }
    if (localStorageToken) {
      navigate('/tracker');
    }
  }, [gitHubCode, localStorageToken, render, navigate]);

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
          href={`https://github.com/login/oauth/authorize?scope=user&client_id=${GITHUB_AUTH.CLIENT_ID}&redirect_uri=${GITHUB_AUTH.REDIRECT_URI}`}>
          {t('buttons.gitHubLogin')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
