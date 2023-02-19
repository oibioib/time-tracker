export enum ROUTES {
  LOGIN = 'login',
  DASHBOARD = 'tracker',
  PROJECTS_VIEW = 'projects',
  CLIENTS_VIEW = 'clients',
  STATISTICS_VIEW = 'statistics',
  SETTINGS_VIEW = 'settings',
  PROJECTS_ID = ':projectId',
}

export const HOURS_IN_MILISEC = 1000 * 60 * 60;
export const TASKS_SHOWED_DEFAULT = 5;
export const MORE_TASKS = 2;
export const DURATION_OF_DAY = 86399000;
export const DEFAULT_COLOR = '#ffffff';
export enum THEME_MODE {
  LIGHT = 'light',
  DARK = 'dark',
}
