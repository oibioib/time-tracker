export const BASE_URL = 'https://cloggl.fly.dev';

export enum SERVER_ROUTES {
  TIMERS = 'timers',
  USERS = 'users',
  USER_TIMERS = 'usertimers',
  IS_ACTIVE_TIMERS = '?status=active',
}

export enum TIMER_ACTIVE {
  ACTIVE = 1,
  INACTIVE = 0,
}
