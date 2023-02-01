import { Link, Outlet } from 'react-router-dom';

import {
  CLIENTS_VIEW,
  DASHBOARD,
  PROJECTS_VIEW,
  SETTINGS_VIEW,
  STATISTICS_VIEW,
} from '../../../Constants/Constants';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <>
      <h3>Dashboard</h3>
      <div className="dashboard">
        <div className="dashboardNavigation">
          Navigation
          <button className="dashboardButton" type="button">
            <Link to={`/${DASHBOARD}`}>Time Tracker</Link>
          </button>
          <button className="dashboardButton" type="button">
            <Link to={PROJECTS_VIEW}>Projects view</Link>
          </button>
          <button className="dashboardButton" type="button">
            <Link to={CLIENTS_VIEW}>Clients view</Link>
          </button>
          <button className="dashboardButton" type="button">
            <Link to={STATISTICS_VIEW}>Statistics</Link>
          </button>
          <button className="dashboardButton" type="button">
            <Link to={SETTINGS_VIEW}>Settings</Link>
          </button>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
