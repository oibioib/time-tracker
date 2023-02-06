import { Box } from '@mui/material';

import { TaskArrReduced } from '../../types/trackerInterfaces';

const AddedTask = ({
  year,
  month,
  date,
  taskName,
  hours,
  min,
  sec,
}: TaskArrReduced) => {
  return (
    <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
      <Box>
        <Box>
          Task date:
          {year}.{month}.{date}
        </Box>
        <Box>{taskName}</Box>
      </Box>
      <Box>
        Time spend {hours}: {min}: {sec}
      </Box>
    </Box>
  );
};

export default AddedTask;
