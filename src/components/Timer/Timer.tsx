import { useEffect, useState } from 'react';

import { Box, IconButton } from '@mui/material';

import { PlayArrowIcon, StopIcon } from '../../theme/appIcons';

const Timer = () => {
  const [isTimerOn, setIsTimerOn] = useState(false);

  useEffect(() => {
    if (isTimerOn) {
      const interval = setInterval(() => {}, 1000);
      return () => {
        clearInterval(interval);
      };
    }
    return undefined;
  }, [isTimerOn]);

  const onClickHandler = () => {
    setIsTimerOn(!isTimerOn);
  };

  return (
    <Box
      mr={1}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box>00: 00 : 00</Box>
      <IconButton onClick={onClickHandler}>
        {isTimerOn ? <StopIcon /> : <PlayArrowIcon />}
      </IconButton>
    </Box>
  );
};

export default Timer;
