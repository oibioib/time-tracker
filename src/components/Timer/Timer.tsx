import React, { useEffect, useState } from 'react';

import { Box, IconButton } from '@mui/material';

import { LOCAL_TIMER } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setStartTime, setTotalTime } from '../../store/timeTrackerSlice';
import { PlayArrowIcon, StopIcon } from '../../theme/appIcons';

interface TimerProps {
  setDisableAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

const Timer = ({ setDisableAdd }: TimerProps) => {
  const dispatch = useAppDispatch();
  const localData = JSON.parse(localStorage.getItem(LOCAL_TIMER) || '{}');
  console.log(localData);
  const total = localData?.total;
  const [isTimerOn, setIsTimerOn] = useState(localData.isTimerOn || false);
  const storedTime = new Date(localData.total * 1000);
  const [sec, setSec] = useState(storedTime.getUTCSeconds() || 0);
  const [min, setMin] = useState(storedTime.getUTCMinutes() || 0);
  const [hours, setHours] = useState(storedTime.getUTCHours() || 0);
  const startStamp =
    useAppSelector((state) => state.timeTracker.startTime) ||
    localData.startStamp;

  useEffect(() => {
    if (localData.startStamp) {
      dispatch(setStartTime(localData.startStamp));
    }
    if (!startStamp) {
      setSec(0);
      setMin(0);
      setHours(0);
    }
    if (startStamp) {
      setDisableAdd(false);
    }
  }, [
    localData.startStamp,
    setDisableAdd,
    startStamp,
    isTimerOn,
    total,
    localData,
    dispatch,
  ]);

  useEffect(() => {
    if (isTimerOn) {
      const interval = setInterval(() => {
        localStorage.setItem(
          LOCAL_TIMER,
          JSON.stringify({ ...localData, total: total + 1 })
        );
        dispatch(setTotalTime(total + 1));
        if (min === 59 && sec === 59) {
          setMin(0);
          setSec(0);
          setHours(hours + 1);
        } else if (sec === 59) {
          setSec(0);
          setMin(min + 1);
        } else setSec(sec + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [isTimerOn, hours, min, sec, localData, total, dispatch]);

  const onClickHandler = () => {
    if (!isTimerOn && sec === 0 && min === 0 && hours === 0) {
      dispatch(setStartTime({ startTime: Date.now() }));
      localStorage.setItem(
        LOCAL_TIMER,
        JSON.stringify({
          isTimerOn: !isTimerOn,
          startStamp: Date.now(),
          total: 0,
        })
      );
    } else {
      localStorage.setItem(
        LOCAL_TIMER,
        JSON.stringify({
          ...localData,
          isTimerOn: !isTimerOn,
        })
      );
    }
    setDisableAdd(!isTimerOn);
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
