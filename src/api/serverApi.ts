import { BASE_URL, SERVER_ROUTES } from '../constants/serverConstants';

export const updateTimer = async (
  title: string,
  isActive: number,
  totalTime: number,
  timerId: string
) => {
  const response = await fetch(
    `${BASE_URL}/${SERVER_ROUTES.TIMERS}/${timerId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        title,
        isActive,
        totalTime,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    }
  );
  return response;
};

export const createTimer = async (timerTitle: string, serverUserId: string) => {
  const response = await fetch(`${BASE_URL}/${SERVER_ROUTES.TIMERS}`, {
    method: 'POST',
    body: JSON.stringify({
      title: timerTitle,
      startTime: Date.now(),
      userId: serverUserId,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  });
  return response;
};

export const getUserTimers = async (serverUserId: string) => {
  const response = await fetch(
    `${BASE_URL}/${SERVER_ROUTES.USER_TIMERS}/${serverUserId}`
  );
  return response;
};

export const getActiveTimer = async (serverUserId: string) => {
  const response = await fetch(
    `${BASE_URL}/${SERVER_ROUTES.USER_TIMERS}/${serverUserId}${SERVER_ROUTES.IS_ACTIVE_TIMERS}`
  );
  return response;
};

export const createServerUserId = async (
  githubId: number,
  githubName: string
) => {
  const response = await fetch(`${BASE_URL}/${SERVER_ROUTES.USERS}`, {
    method: 'POST',
    body: JSON.stringify({
      githubId,
      githubName,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export const deleteTimer = async (id: string) => {
  const response = await fetch(`${BASE_URL}/${SERVER_ROUTES.TIMERS}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to Delete timer');
  }
  return response;
};
