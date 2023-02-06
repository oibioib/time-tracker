import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import githubUserData from '../../api/githubApi';
import { ROUTES } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setGitHubUserData } from '../../store/gitHubFetchSlice';
import {
  AccessTimeIcon,
  AccountBoxIcon,
  BarChartIcon,
  FolderIcon,
  KeyboardArrowLeftIcon,
  MenuIcon,
  SettingsIcon,
} from '../../theme/appIcons';

import './DashboardPage.css';

const dashboardOptins = [
  {
    icon: <AccessTimeIcon />,
    label: 'timeTracker',
    route: `/${ROUTES.DASHBOARD}`,
  },
  {
    icon: <FolderIcon />,
    label: 'projectsView',
    route: ROUTES.PROJECTS_VIEW,
  },
  {
    icon: <AccountBoxIcon />,
    label: 'clientsView',
    route: ROUTES.CLIENTS_VIEW,
  },
  {
    icon: <BarChartIcon />,
    label: 'statistics',
    route: ROUTES.STATISTICS_VIEW,
  },
  { icon: <SettingsIcon />, label: 'settings', route: ROUTES.SETTINGS_VIEW },
];

const DashboardPage = () => {
  const [open, setOpen] = useState(false);
  const userData = useAppSelector((state) => state.gitHubFetch);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    if (!userData.id) {
      (async () => {
        const data = await githubUserData();
        dispatch(
          setGitHubUserData({
            login: data.login,
            id: data.id,
            avatar_url: data.avatar_url,
          })
        );
      })();
    }
  }, [userData, dispatch]);

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
            bgcolor: 'rgba(118, 80, 152, 1.2)',
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
                  bgcolor: 'rgba(118, 80, 152, 1.2)',
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
              <List>
                {dashboardOptins.map((item) => (
                  <ListItemButton
                    key={item.label}
                    sx={{
                      color: 'white',
                    }}>
                    <NavLink to={`${item.route}`}>
                      <ListItemIcon sx={{ color: 'white' }}>
                        {item.icon}
                      </ListItemIcon>
                      {t(`dashboard.${item.label}`)}
                    </NavLink>
                  </ListItemButton>
                ))}
              </List>
              <Grid item ml="1">
                <Grid>
                  <img
                    className="avatar"
                    src={`${userData && userData.avatar_url}`}
                    alt=""
                  />
                </Grid>
                <Grid>Name: {userData && userData.login}</Grid>
                <Grid>ID {userData && userData.id}</Grid>
              </Grid>
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
            bgcolor: 'rgba(118, 80, 152, 1.2)',
          }}>
          <List>
            {dashboardOptins.map((item) => (
              <ListItemButton key={item.label}>
                <NavLink to={`${item.route}`}>
                  <ListItemIcon sx={{ color: 'white' }}>
                    {item.icon}
                  </ListItemIcon>
                  {t(`dashboard.${item.label}`)}
                </NavLink>
              </ListItemButton>
            ))}
          </List>
          <Grid item>
            <div>
              <img
                className="avatar"
                src={`${userData && userData.avatar_url}`}
                alt=""
              />
            </div>
            <div>Name: {userData && userData.login}</div>
            <div>ID {userData && userData.id}</div>
          </Grid>
        </Box>
      </Grid>
      <Outlet />
    </Grid>
  );
};

export default DashboardPage;
