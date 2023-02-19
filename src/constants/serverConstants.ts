export const BASE_URL = 'https://cloggl.fly.dev';

export enum SERVER_ROUTES {
  TIMERS = 'timers',
  USERS = 'users',
  USER_TIMERS = 'usertimers',
  IS_ACTIVE_TIMERS = '?status=active',
  USER_PROJECTS = 'userprojects',
  USER_TOTAL_TIMERS = 'usertimerstime',
  PROJECT_TIMERS = 'projecttimers',
}

export enum TIMER_ACTIVE {
  ACTIVE = 1,
  INACTIVE = 0,
}

export const DEFAULT_PROJECT_ID = 'null';
