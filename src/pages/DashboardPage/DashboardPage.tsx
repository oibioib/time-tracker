import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';

import githubUserData from '../../api/githubApi';
import DashboardSidebar from '../../components/DashboardSidebar';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setGitHubUserData } from '../../store/gitHubFetchSlice';
import { KeyboardArrowLeftIcon, MenuIcon } from '../../theme/appIcons';

import './DashboardPage.css';

const DashboardPage = () => {
  const userData = useAppSelector((state) => state.gitHubFetch);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!userData.id) {
      (async () => {
        setIsLoading(true);
        const data = await githubUserData();
        dispatch(
          setGitHubUserData({
            login: data.login,
            id: data.id,
            avatar_url: data.avatar_url,
          })
        );
        setIsLoading(false);
      })();
    }
  }, [userData, dispatch]);

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
    <Grid container wrap="nowrap" spacing={2}>
      <Grid item sx={{ display: { xs: 'block', sm: 'none' } }}>
        <Box component="span">
          <Button onClick={() => setOpen(!open)}>
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
                  height: 'calc(100% - 130px)',
                  width: 200,
                  boxSizing: 'border-box',
                  bgcolor: 'primary.main',
                },
              }}
              variant="persistent"
              anchor="left"
              open={open}>
              <IconButton
                onClick={() => setOpen(!open)}
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
      <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Box
          sx={{
            width: 200,
            height: 'calc(100vh - 100px)',
            ml: -2,
            mt: -2.5,
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
