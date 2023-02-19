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
export const DEFAULT_TITLE = 'Time Tracker';
export enum THEME_MODE {
  LIGHT = 'light',
  DARK = 'dark',
}

export const DEFAULT_STARTDAY_TODAY = new Date(
  new Date().setUTCHours(0, 0, 0, 0)
);
export const DEFAULT_START_TODAY_TIMESTAMP = DEFAULT_STARTDAY_TODAY.getTime();
export const DEFAULT_END_TODAY_TIMESTAMP =
  DEFAULT_START_TODAY_TIMESTAMP + DURATION_OF_DAY;
export const DEFAULT_STARTDAY_PREV_WEEK_TIMESTAMP =
  DEFAULT_START_TODAY_TIMESTAMP - HOURS_IN_MILISEC * 24 * 7;
export const DEFAULT_STARTDAY_PREV_WEEK = new Date(
  new Date(DEFAULT_STARTDAY_PREV_WEEK_TIMESTAMP)
);
