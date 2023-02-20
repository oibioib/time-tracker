import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Box, CircularProgress, Grid } from '@mui/material';

import { getGithubUserData } from '../../api/githubApi';
import { createServerUserId, getUserProjects } from '../../api/serverApi';
import DashboardSidebar from '../../components/DashboardSidebar';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setErrorMessage } from '../../store/errorHandler';
import {
  setGitHubName,
  setGitHubUserData,
  setNewName,
} from '../../store/gitHubFetchSlice';
import { setProjectArr } from '../../store/projectSlice';
import { setServerUserLogin } from '../../store/serverUserDataSlice';

import './DashboardPage.css';

const DashboardPage = () => {
  const userData = useAppSelector((state) => state.gitHubFetch);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const serverUserId = useAppSelector((state) => state.serverUserData.id);

  useEffect(() => {
    if (!userData.id) {
      (async () => {
        setIsLoading(true);
        try {
          const data = await getGithubUserData();
          dispatch(
            setGitHubUserData({
              login: data.login,
              id: data.id,
              avatar_url: data.avatar_url,
            })
          );
          setIsLoading(false);
        } catch (error) {
          dispatch(
            setErrorMessage('Failed to get data from gitHub. Try later')
          );
        }
      })();
    }
  }, [userData, dispatch]);

  useEffect(() => {
    if (userData.id) {
      (async () => {
        try {
          const data = await createServerUserId(userData.id, userData.login);
          if (data.name) {
            dispatch(setNewName(data.name));
          }
          dispatch(setGitHubName(data.gitHubName));
          dispatch(setServerUserLogin(data.id));
        } catch (error) {
          dispatch(
            setErrorMessage('Failed to create user. Please try again letter')
          );
        }
      })();
    }
  }, [userData.id, userData.login, dispatch]);

  useEffect(() => {
    if (serverUserId) {
      (async () => {
        try {
          const data = await getUserProjects(serverUserId);
          dispatch(setProjectArr(data));
        } catch (error) {
          dispatch(setErrorMessage('Failed to get user projects'));
        }
      })();
    }
  }, [serverUserId, dispatch]);

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
    <Grid container wrap="nowrap" sx={{ height: '100%' }}>
      <Grid item>
        <Box
          sx={{
            width: { xs: 'min-content', lg: 220 },
            height: '100%',
            backgroundColor: 'primary.main',
            backgroundImage:
              'linear-gradient(to left, rgba(0, 0, 0, 0.10) 0, transparent 30px, transparent 100%)',
          }}>
          <DashboardSidebar />
        </Box>
      </Grid>
      <Grid item p={{ xs: 1, sm: 2 }} width="100%">
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
