import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';

import { ROUTES } from '../../constants';
import gitHutFetchFunc from '../../helpers/gitHubFetchFunc';
import { RootState } from '../../store';
import { setGitHubUserData } from '../../store/gitHubFetchSlice';

import './DashboardPage.css';

const DashboardPage = () => {
  const userData = useSelector((state: RootState) => state.gitHubFetch);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    if (!userData.id) {
      (async () => {
        const data = await gitHutFetchFunc();
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
