import { BASE_URL, SERVER_ROUTES } from '../constants/serverConstants';

interface IrequestInterval {
  serverUserId: string;
  rezStartDate: number;
  rezEndDate: number;
}

interface IrequestTotalInterval {
  serverUserId: string;
  rezStartDate: number;
  dayAmount: number;
}

export const getUserTimersInterval = async ({
  serverUserId,
  rezStartDate,
  rezEndDate,
}: IrequestInterval) => {
  const response = await fetch(
    `${BASE_URL}/${SERVER_ROUTES.USER_TIMERS}/${serverUserId}?from=${rezStartDate}&to=${rezEndDate}`
  );
  if (!response.ok) {
    throw new Error('Could not get server User id');
  }
  const data = await response.json();
  return data;
};

export const getUserTotalTimeInterval = async ({
  serverUserId,
  rezStartDate,
  dayAmount,
}: IrequestTotalInterval) => {
  const response = await fetch(
    `${BASE_URL}/${SERVER_ROUTES.USER_TOTAL_TIMERS}/${serverUserId}?from=${rezStartDate}&days=${dayAmount}`
  );
  if (!response.ok) {
    throw new Error('Could not get server User id');
  }
  const data = await response.json();
  return data;
};
