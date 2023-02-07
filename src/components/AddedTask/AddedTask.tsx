import { Box, Typography } from '@mui/material';

import { TaskArrReduced } from '../../types/trackerInterfaces';

const AddedTask = ({ taskStart, taskName, taskTimeSec }: TaskArrReduced) => {
  const helperDate = new Date(taskTimeSec);
  const hours = helperDate.getUTCHours() || 0;
  const min = helperDate.getMinutes() || 0;
  const sec = helperDate.getSeconds() || 0;

  const timeString = `${hours > 9 ? hours : `0${hours}`}: ${
    hours > 9 ? min : `0${min}`
  }: ${sec > 9 ? sec : `0${sec}`}`;
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
      <Box>
        <Typography variant="body2">Time spend: {timeString}</Typography>
      </Box>
    </Box>
  );
};

export default AddedTask;
