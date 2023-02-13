import { Box, Typography } from '@mui/material';

import { deleteTimer } from '../../api/serverApi';
import timeStringView from '../../helpers/timeString';
import { useAppDispatch } from '../../hooks/hooks';
import { setErrorMessage } from '../../store/errorHandler';
import { TaskArrReduced } from '../../types/trackerInterfaces';
import SmallTimer from '../SmallTimer/SmallTimer';

const AddedTask = ({
  taskStart,
  taskName,
  taskTimeSec,
  id,
  setRefreshPage,
  refreshPage,
}: TaskArrReduced) => {
  const dispatch = useAppDispatch();
  const helperDate = new Date(taskTimeSec);
  const hours = helperDate.getUTCHours() || 0;
  const min = helperDate.getMinutes() || 0;
  const sec = helperDate.getSeconds() || 0;
  const timeString = timeStringView(sec, min, hours);

  const onClickHandler = async () => {
    try {
      await deleteTimer(id);
      setRefreshPage(!refreshPage);
    } catch (error) {
      dispatch(setErrorMessage('Failed to delete timer'));
    }
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
        <Box mr={3}>
          <Box mr={2} sx={{ display: 'flex' }}>
            <Typography variant="body2">Time spend: {timeString}</Typography>
            <Box
              onClick={onClickHandler}
              ml={1}
              sx={{ ':hover': { cursor: 'pointer' } }}>
              <Typography variant="body2" sx={{ color: 'coral' }}>
                del
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }} mt={1}>
            <Typography variant="body2">Press to resume</Typography>
            <Box mr={1} mt={-1}>
              <SmallTimer
                timerTitle={taskName}
                timerId={id}
                totalTime={taskTimeSec}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddedTask;
