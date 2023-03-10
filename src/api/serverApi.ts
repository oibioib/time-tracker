import { BASE_URL, SERVER_ROUTES } from '../constants/serverConstants';

export const updateTimer = async (
  title: string,
  isActive: number,
  totalTime: number,
  timerId: string,
  projectId: string
) => {
  const response = await fetch(
    `${BASE_URL}/${SERVER_ROUTES.TIMERS}/${timerId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        title,
        isActive,
        totalTime,
        projectId,
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

export const createTimer = async (
  timerTitle: string,
  serverUserId: string,
  projectId: string
) => {
  const response = await fetch(`${BASE_URL}/${SERVER_ROUTES.TIMERS}`, {
    method: 'POST',
    body: JSON.stringify({
      title: timerTitle,
      startTime: Date.now(),
      userId: serverUserId,
      projectId,
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

export const getUserTimers = async (
  serverUserId: string,
  timeStart: number,
  timeEnd: number
) => {
  const response = await fetch(
    `${BASE_URL}/${SERVER_ROUTES.USER_TIMERS}/${serverUserId}?from=${timeStart}&to=${timeEnd}`
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

export const createUserProject = async (
  userId: string,
  title: string,
  salary: string,
  color: string
) => {
  const response = await fetch(`${BASE_URL}/${SERVER_ROUTES.USER_PROJECTS}`, {
    method: 'POST',
    body: JSON.stringify({
      userId,
      title,
      salary,
      color,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to create Project');
  }
};

export const updateUserProject = async (
  projectId: string,
  title: string,
  salary: string,
  color: string
) => {
  const response = await fetch(
    `${BASE_URL}/${SERVER_ROUTES.USER_PROJECTS}/${projectId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        title,
        salary,
        color,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (!response.ok) {
    throw new Error('Failed to update Project');
  }
};

export const getUserProjects = async (userId: string) => {
  const response = await fetch(
    `${BASE_URL}/${SERVER_ROUTES.USER_PROJECTS}/${userId}`
  );
  if (!response.ok) {
    throw new Error('Failed to get user projects');
  }
  const data = await response.json();
  return data;
};

export const deleteProject = async (projectId: string) => {
  const response = await fetch(
    `${BASE_URL}/${SERVER_ROUTES.USER_PROJECTS}/${projectId}`,
    {
      method: 'DELETE',
    }
  );
  if (!response.ok) {
    throw new Error('Failed to Delete project');
  }
  return response;
};

export const getProjectTimers = async (
  projectId: string,
  starttime: number,
  endTime: number
) => {
  const response = await fetch(
    `${BASE_URL}/${SERVER_ROUTES.PROJECT_TIMERS}/${projectId}?from=${starttime}&to=${endTime}`
  );
  if (!response.ok) {
    throw new Error('Failed to get timers');
  }
  const data = await response.json();
  return data;
};

export const updateServerUserId = async (userId: string, userName: string) => {
  const response = await fetch(`${BASE_URL}/${SERVER_ROUTES.USERS}/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      name: userName,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch new name');
  }
  const data = await response.json();
  return data;
};
