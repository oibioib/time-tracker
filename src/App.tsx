import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { PagesRoutingNames } from './Constants/Constants';
import {
  ClientsPage,
  DashboardPage,
  ErrorPage,
  FakeNavigation,
  LoginPage,
  MainPage,
  ProjectsPage,
  SettingsPage,
  StatisticsPage,
  TrackerPage,
} from './Pages';

const router = createBrowserRouter([
  {
    path: '',
    element: <FakeNavigation />,
    children: [
      {
        path: '',
        element: <MainPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: PagesRoutingNames.LOGIN,
        element: <LoginPage />,
      },
      {
        path: PagesRoutingNames.DASHBOARD,
        element: <DashboardPage />,
        children: [
          {
            path: '',
            element: <TrackerPage />,
          },
          { path: PagesRoutingNames.PROJECTS_VIEW, element: <ProjectsPage /> },
          { path: PagesRoutingNames.CLIENTS_VIEW, element: <ClientsPage /> },
          {
            path: PagesRoutingNames.STATISTICS_VIEW,
            element: <StatisticsPage />,
          },
          {
            path: PagesRoutingNames.SETTINGS_VIEW,
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
