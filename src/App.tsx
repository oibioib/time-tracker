import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import {
  CLIENTS_VIEW,
  DASHBOARD,
  LOGIN,
  PROJECTS_VIEW,
  SETTINGS_VIEW,
  STATISTICS_VIEW,
} from './Constants/Constants';
import ClientsPage from './Pages/Dashboard/ClientsPage/ClientsPage';
import Dashboard from './Pages/Dashboard/DashboardPage/DashboardPage';
import ProjectsPage from './Pages/Dashboard/ProjectsPage/ProjectsPage';
import StatisticsPage from './Pages/Dashboard/StatisticsPage/Statistics';
import TrackerPage from './Pages/Dashboard/TrackerPage/TrackerPage';
import FakeNavigation from './Pages/FakeNavigation/FakeNavigation';
import LoginPage from './Pages/Login/LoginPage';
import MainPage from './Pages/MainPage/MainPage';
import SettingsPage from './Pages/SettingsPage/SettingsPage';

const router = createBrowserRouter([
  {
    path: '',
    element: <FakeNavigation />,
    children: [
      {
        path: '',
        element: <MainPage />,
      },
      {
        path: LOGIN,
        element: <LoginPage />,
      },
      {
        path: DASHBOARD,
        element: <Dashboard />,
        children: [
          {
            path: '',
            element: <TrackerPage />,
          },
          { path: PROJECTS_VIEW, element: <ProjectsPage /> },
          { path: CLIENTS_VIEW, element: <ClientsPage /> },
          {
            path: STATISTICS_VIEW,
            element: <StatisticsPage />,
          },
          {
            path: SETTINGS_VIEW,
            element: <SettingsPage />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
