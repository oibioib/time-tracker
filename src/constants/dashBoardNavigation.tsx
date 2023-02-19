import {
  AccessTimeIcon,
  BarChartIcon,
  FolderIcon,
  SettingsIcon,
} from '../theme/appIcons';
import { ROUTES } from './appConstants';

const DASHBOARD_NAVIGATION = [
  {
    icon: <AccessTimeIcon />,
    label: 'timeTracker',
    route: `/${ROUTES.DASHBOARD}`,
  },
  {
    icon: <FolderIcon />,
    label: 'projectsView',
    route: ROUTES.PROJECTS_VIEW,
  },
  {
    icon: <BarChartIcon />,
    label: 'statistics',
    route: ROUTES.STATISTICS_VIEW,
  },
  { icon: <SettingsIcon />, label: 'settings', route: ROUTES.SETTINGS_VIEW },
];

export default DASHBOARD_NAVIGATION;
