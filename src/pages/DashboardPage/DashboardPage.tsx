import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  List,
} from '@mui/material';

import { getGithubUserData } from '../../api/githubApi';
import { createServerUserId } from '../../api/serverApi';
import DashboardSidebar from '../../components/DashboardSidebar';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setGitHubUserData } from '../../store/gitHubFetchSlice';
import { setServerUserLogin } from '../../store/serverUserDataSlice';
import { KeyboardArrowLeftIcon, MenuIcon } from '../../theme/appIcons';

import './DashboardPage.css';

const DashboardPage = () => {
  const userData = useAppSelector((state) => state.gitHubFetch);
  const dispatch = useAppDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
          setIsError(true);
          setErrorMessage('Failed to get data from gitHub. Try later');
        }
      })();
    }
  }, [userData, dispatch]);

  useEffect(() => {
    if (userData.id) {
      (async () => {
        try {
          const data = await createServerUserId(userData.id, userData.login);
          dispatch(setServerUserLogin(data.id));
        } catch (error) {
          setIsError(true);
          setErrorMessage('Failed to create user. Please try again letter');
        }
      })();
    }
  }, [userData.id, userData.login, dispatch]);

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

  if (isError) {
    return (
      <Box
        color="red"
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {errorMessage}
      </Box>
    );
  }

  return (
    <Grid container wrap="nowrap">
      <Grid item sx={{ display: { xs: 'block', sm: 'none' } }}>
        <Box component="span">
          <Button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </Button>
        </Box>
        <Box
          sx={{
            maxWidth: 200,
            bgcolor: 'primary.main',
            position: 'absolute',
            zIndex: '100',
          }}>
          <List>
            <Drawer
              sx={{
                '& .MuiDrawer-paper': {
                  height: '100%',
                  width: 200,
                  boxSizing: 'border-box',
                  bgcolor: 'primary.main',
                },
              }}
              variant="persistent"
              anchor="left"
              open={isSidebarOpen}>
              <IconButton
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <KeyboardArrowLeftIcon />
              </IconButton>
              <DashboardSidebar />
            </Drawer>
          </List>
        </Box>
      </Grid>
      <Grid item sx={{ display: { xs: 'none', sm: 'block' } }} mr={2}>
        <Box
          sx={{
            width: 200,
            height: '100%',
            minHeight: 'calc(100vh - 130px)',
            ml: -2,
            pb: 8,
            bgcolor: 'primary.main',
          }}>
          <DashboardSidebar />
        </Box>
      </Grid>
      <Outlet />
    </Grid>
  );
};

export default DashboardPage;
