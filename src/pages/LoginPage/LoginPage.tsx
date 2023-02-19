import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button, CircularProgress, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

import { getGitHubToken, getGithubUserData } from '../../api/githubApi';
import octocat from '../../assets/octocat.png';
import { GITHUB_AUTH, LOCAL_STORAGE_KEY } from '../../constants';
import { useAppDispatch } from '../../hooks/hooks';
import { setErrorMessage } from '../../store/errorHandler';
import { setGitHubUserData } from '../../store/gitHubFetchSlice';
import { GitHubIcon } from '../../theme/appIcons';

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
        try {
          const data = await getGitHubToken(gitHubCode);
          localStorage.setItem(LOCAL_STORAGE_KEY, data.access_token);
          setRefresh(!refresh);
        } catch (error) {
          dispatch(setErrorMessage('Failed to get gitHubToken'));
        }
      })();
    }
  }, [gitHubCode, localStorageToken, navigate, dispatch, refresh]);

  useEffect(() => {
    if (localStorageToken) {
      (async () => {
        try {
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
        } catch (error) {
          dispatch(setErrorMessage('Failed to get gitHub user data'));
        }
      })();
    }
  }, [localStorageToken, dispatch, navigate]);

  if (isLoading) {
    return (
      <Grid container alignItems="center" justifyContent="center" height="100%">
        <CircularProgress size={70} />
      </Grid>
    );
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      sx={{
        position: 'relative',
        '&::after': {
          content: '""',
          background: `url(${octocat}) bottom right no-repeat`,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundSize: 400,
          zIndex: -1,
          opacity: 0.5,
          '@media (min-width: 360px) and (max-width: 1600px)': {
            backgroundSize:
              'calc(150px + (400 - 150) * ((100vw - 360px) / (1600 - 360)))',
          },
          '@media screen and (max-width: 359px)': {
            backgroundSize: 150,
          },
        },
      }}>
      <Grid item mb={5}>
        <Typography variant="h4" component="h1">
          Login via Github
        </Typography>
      </Grid>
      <Grid item>
        <Button
          size="large"
          variant="contained"
          startIcon={<GitHubIcon />}
          sx={{ fontSize: '1.4rem' }}
          href={`https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`}>
          {t('buttons.gitHubLogin')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
