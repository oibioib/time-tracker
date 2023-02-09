import { Box, Typography } from '@mui/material';

import { BASE_URL, FLY_ROUTES } from '../../constants/apiFly';
import { TaskArrReduced } from '../../types/trackerInterfaces';

const AddedTask = ({
  taskStart,
  taskName,
  taskTimeSec,
  id,
  setRefreshPage,
  refreshPage,
}: TaskArrReduced) => {
  const helperDate = new Date(taskTimeSec);
  const hours = helperDate.getUTCHours() || 0;
  const min = helperDate.getMinutes() || 0;
  const sec = helperDate.getSeconds() || 0;

  const timeString = `${hours > 9 ? hours : `0${hours}`}: ${
    hours > 9 ? min : `0${min}`
  }: ${sec > 9 ? sec : `0${sec}`}`;

  const onClickHandler = async () => {
    const response = await fetch(`${BASE_URL}/${FLY_ROUTES.TIMERS}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to Delete timer');
    }
    setRefreshPage(!refreshPage);
  };

  return (
    <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
      <Box>
        <Box>
          <Typography variant="body2">
            <b>{taskStart}</b>
          </Typography>
        </Box>
        <Box>{taskName}</Box>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box mr={2}>
          <Typography variant="body2">Time spend: {timeString}</Typography>
        </Box>
        <Box
          onClick={onClickHandler}
          mr={2}
          sx={{ ':hover': { cursor: 'pointer' } }}>
          <Typography variant="body2" sx={{ color: 'coral' }}>
            del
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AddedTask;
