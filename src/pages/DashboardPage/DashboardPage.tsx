import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import { GITHUB_AUTH, LOCAL_STORAGE_KEY, ROUTES } from '../../constants';

import './DashboardPage.css';

const DashboardPage = () => {
  const { t } = useTranslation();
  const token = localStorage.getItem(LOCAL_STORAGE_KEY);
  const [userId, setUserId] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await fetch(`${GITHUB_AUTH.PROXY_URL}/getUserData`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data) {
        setUserId(data.id);
        setAvatarUrl(data.avatar_url);
        setUserName(data.login);
      }
    })();
  }, [token]);

  const logoutHandler = () => {
    localStorage.clear();
    navigate('/');
  };

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
          <button type="button" onClick={logoutHandler}>
            {t('buttons.logout')}
          </button>
        </div>
        <div>
          <img className="avatar" src={`${avatarUrl}`} alt="" />
        </div>
        <div>Name: {userName}</div>
        <div>ID {userId}</div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;
