import { Link, Outlet } from 'react-router-dom';

import { PagesRoutingNames } from '../../../Constants/Constants';
import './Dashboard.css';

const DashboardPage = () => {
  return (
    <>
      <h3>Dashboard</h3>
      <div className="dashboard">
        <div className="dashboardNavigation">
          Navigation
          <button className="dashboardButton" type="button">
            <Link to={`/${PagesRoutingNames.DASHBOARD}`}>Time Tracker</Link>
          </button>
          <button className="dashboardButton" type="button">
            <Link to={PagesRoutingNames.PROJECTS_VIEW}>Projects view</Link>
          </button>
          <button className="dashboardButton" type="button">
            <Link to={PagesRoutingNames.CLIENTS_VIEW}>Clients view</Link>
          </button>
          <button className="dashboardButton" type="button">
            <Link to={PagesRoutingNames.STATISTICS_VIEW}>Statistics</Link>
          </button>
          <button className="dashboardButton" type="button">
            <Link to={PagesRoutingNames.SETTINGS_VIEW}>Settings</Link>
          </button>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default DashboardPage;
