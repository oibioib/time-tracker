import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet } from 'react-router-dom';

import { Box, CircularProgress } from '@mui/material';

import githubUserData from '../../api/githubApi';
import { ROUTES } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setGitHubUserData } from '../../store/gitHubFetchSlice';

import './DashboardPage.css';

const DashboardPage = () => {
  const userData = useAppSelector((state) => state.gitHubFetch);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
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
    <div>
      <div className="dashboard">
        <div className="dashboardNavigation">
          {t('dashboard.navigation')}
          <button className="dashboardButton" type="button">
            <NavLink to={`/${ROUTES.DASHBOARD}`}>
              {t('dashboard.timeTracker')}
            </NavLink>
          </button>
          <button className="dashboardButton" type="button">
            <NavLink to={ROUTES.PROJECTS_VIEW}>
              {t('dashboard.projectsView')}
            </NavLink>
          </button>
          <button className="dashboardButton" type="button">
            <NavLink to={ROUTES.CLIENTS_VIEW}>
              {t('dashboard.clientsView')}
            </NavLink>
          </button>
          <button className="dashboardButton" type="button">
            <NavLink to={ROUTES.STATISTICS_VIEW}>
              {t('dashboard.statistics')}
            </NavLink>
          </button>
          <button className="dashboardButton" type="button">
            <NavLink to={ROUTES.SETTINGS_VIEW}>
              {t('dashboard.settings')}
            </NavLink>
          </button>
        </div>
        <div>
          <div>
            <img
              className="avatar"
              src={`${userData && userData.avatar_url}`}
              alt=""
            />
          </div>
          <div>Name: {userData && userData.login}</div>
          <div>ID {userData && userData.id}</div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;
