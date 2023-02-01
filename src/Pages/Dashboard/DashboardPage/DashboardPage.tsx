import { NavLink, Outlet } from 'react-router-dom';

import { PagesRoutingNames } from '../../../Constants/Constants';
import './Dashboard.css';

const DashboardPage = () => {
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
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;
