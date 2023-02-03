import { useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import { ROUTES } from '../../constants';
import { RootState } from '../../store';
import './DashboardPage.css';
import { useTranslation } from 'react-i18next';

const DashboardPage = () => {
  const navigate = useNavigate();
  const data = useSelector((state: RootState) => state.gitHubFetch);
  const { t } = useTranslation();
  console.log(data)

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
        {/* <div>
          <img className="avatar" src={`${avatarUrl}`} alt="" />
        </div>
        <div>Name: {userName}</div>
        <div>ID {userId}</div> */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;
