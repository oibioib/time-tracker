import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import { PagesRoutingNames } from '../../../Constants/Constants';
import { BASE_PROXY_SERVER_URL } from '../../Login/utilfFunction';
import './Dashboard.css';

const LOCAL_STORAGE_KEY = 'GitHubToken';

const DashboardPage = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY);
  const [userId, setUserId] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await fetch(`${BASE_PROXY_SERVER_URL}/getUserData`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUserId(data.id);
      setAvatarUrl(data.avatar_url);
      setUserName(data.login);
    })();
  }, [token]);

  const logoutHandler = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div>
      <h3>Dashboard</h3>
      <div className="dashboard">
        <div className="dashboardNavigation">
          Navigation
          <button className="dashboardButton" type="button">
            <NavLink to={`/${PagesRoutingNames.DASHBOARD}`}>
              Time Tracker
            </NavLink>
          </button>
          <button className="dashboardButton" type="button">
            <NavLink to={PagesRoutingNames.PROJECTS_VIEW}>
              Projects view
            </NavLink>
          </button>
          <button className="dashboardButton" type="button">
            <NavLink to={PagesRoutingNames.CLIENTS_VIEW}>Clients view</NavLink>
          </button>
          <button className="dashboardButton" type="button">
            <NavLink to={PagesRoutingNames.STATISTICS_VIEW}>Statistics</NavLink>
          </button>
          <button className="dashboardButton" type="button">
            <NavLink to={PagesRoutingNames.SETTINGS_VIEW}>Settings</NavLink>
          </button>
          <button type="button" onClick={logoutHandler}>
            Logout
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
