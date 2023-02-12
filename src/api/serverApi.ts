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
  if (!response.ok) {
    throw new Error('Could not PATCH data to DB');
  }
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
  if (!response.ok) {
    throw new Error('Could not POST data to DB');
  }
  const data = await response.json();
  return data;
};

export const getUserTimers = async (serverUserId: string) => {
  const response = await fetch(
    `${BASE_URL}/${SERVER_ROUTES.USER_TIMERS}/${serverUserId}`
  );
  if (!response.ok) {
    throw new Error('Could not get server User id');
  }
  const data = await response.json();
  return data;
};

export const getActiveTimer = async (serverUserId: string) => {
  const response = await fetch(
    `${BASE_URL}/${SERVER_ROUTES.USER_TIMERS}/${serverUserId}${SERVER_ROUTES.IS_ACTIVE_TIMERS}`
  );
  if (!response.ok) {
    throw new Error('Could not get information about User active Timers');
  }
  const data = await response.json();
  return data;
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
  if (!response.ok) {
    throw new Error('Failed to fetch id From IO');
  }
  const data = await response.json();
  return data;
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
