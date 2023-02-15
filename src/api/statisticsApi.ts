import { BASE_URL, SERVER_ROUTES } from '../constants/serverConstants';

interface IrequestInterval {
  serverUserId: string;
  rezStartDate: number;
  rezEndDate: number;
}

const getUserTimersInterval = async ({
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
  console.log(data);
  return data;
};

export default getUserTimersInterval;
