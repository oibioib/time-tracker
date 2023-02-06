import { useEffect, useState } from 'react';

import { Box, IconButton } from '@mui/material';

import { useAppDispatch } from '../../hooks/hooks';
import { setEndTime, setStartTime } from '../../store/timeTrackerSlice';
import { PlayArrowIcon, StopIcon } from '../../theme/appIcons';

const Timer = () => {
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [hours, setHours] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isTimerOn) {
      const interval = setInterval(() => {
        if (min === 59 && sec === 59) {
          setMin(0);
          setSec(0);
          setHours(hours + 1);
        } else if (sec === 59) {
          setMin(min + 1);
        } else setSec(sec + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [isTimerOn, hours, min, sec]);

  const onClickHandler = () => {
    if (!isTimerOn && sec === 0 && min === 0 && hours === 0) {
      dispatch(setStartTime({ startTime: Date.now() }));
    } else {
      dispatch(setEndTime({ endTime: Date.now() }));
    }
    setIsTimerOn(!isTimerOn);
  };

  return (
    <Box
      mr={1}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box>{`${hours > 9 ? hours : `0${hours}`}: ${
        min > 9 ? min : `0${min}`
      }: ${sec > 9 ? sec : `0${sec}`}`}</Box>
      <IconButton onClick={onClickHandler}>
        {isTimerOn ? <StopIcon /> : <PlayArrowIcon />}
      </IconButton>
    </Box>
  );
};

export default Timer;
