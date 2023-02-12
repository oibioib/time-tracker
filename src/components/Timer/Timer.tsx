import React, { useEffect, useState } from 'react';

import { Box, IconButton } from '@mui/material';

import { createTimer, updateTimer } from '../../api/serverApi';
import { TIMER_ACTIVE } from '../../constants/serverConstants';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  setIsTimerOn,
  setPreviousTimeStamp,
  setTimerData,
} from '../../store/timeTrackerSlice';
import { PlayArrowIcon, StopIcon } from '../../theme/appIcons';

interface TimerProps {
  setRefreshPage: React.Dispatch<React.SetStateAction<boolean>>;
  refreshPage: boolean;
  serverUserId: string;
}

const Timer = ({ setRefreshPage, refreshPage, serverUserId }: TimerProps) => {
  const timerData = useAppSelector((state) => state.timeTracker);
  const { isTimerOn } = timerData;
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [hours, setHours] = useState(0);
  const dispatch = useAppDispatch();
  const [timerTitle, setTimerTitle] = useState('');
  const [timerId, setTimerId] = useState('');
  const { totalTime } = timerData;
  const [isError, setIsError] = useState(false);
  const [errorStatus, setErrorStatus] = useState('');

  useEffect(() => {
    if (isTimerOn) {
      const timeSpent = new Date(
        timerData.totalTime +
          Date.now() -
          (timerData.previousTimeStamp || Date.now())
      );
      setSec(timeSpent.getSeconds());
      setMin(timeSpent.getMinutes());
      setHours(timeSpent.getUTCHours());
      if (timerData.timerId) {
        setTimerId(timerData.timerId);
      }
      setTimerTitle(timerData.timerTitle);
    }
  }, [
    timerData.totalTime,
    timerData.timerId,
    timerData.timerTitle,
    timerData.previousTimeStamp,
    isTimerOn,
  ]);

  useEffect(() => {
    if (isTimerOn) {
      const interval = setInterval(() => {
        dispatch(
          setTimerData({
            ...timerData,
            totalTime:
              totalTime +
              Date.now() -
              (timerData.previousTimeStamp || Date.now()),
          })
        );
        dispatch(setPreviousTimeStamp(Date.now()));
      }, 1000);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [isTimerOn, totalTime, timerData, dispatch]);

  useEffect(() => {
    if (isTimerOn && sec % 10 === 0 && sec !== 0) {
      (async () => {
        try {
          await updateTimer(
            timerTitle,
            TIMER_ACTIVE.ACTIVE,
            totalTime,
            timerId
          );
        } catch {
          setIsError(true);
          setErrorStatus('Failed to update timer, please refresh the page');
        }
      })();
    }
  }, [timerTitle, totalTime, isTimerOn, timerId, sec]);

  const onClickHandler = async () => {
    if (!isTimerOn && sec === 0 && min === 0 && hours === 0) {
      try {
        const data = await createTimer(timerTitle, serverUserId);
        setTimerId(data.id);
        dispatch(setPreviousTimeStamp(Date.now()));
      } catch (error) {
        setIsError(true);
        setErrorStatus('Failed to create timer, please refresh the page');
      }
    }
    if (isTimerOn) {
      try {
        await updateTimer(
          timerTitle,
          TIMER_ACTIVE.INACTIVE,
          totalTime,
          timerId
        );
        setSec(0);
        setMin(0);
        setHours(0);
        dispatch(
          setTimerData({
            ...timerData,
            timerTitle: '',
            timerId: '',
            totalTime: 0,
          })
        );
        setRefreshPage(!refreshPage);
      } catch (error) {
        setIsError(true);
        setErrorStatus('Failed to update timer, please refresh the page');
      }
    }
    dispatch(setIsTimerOn(!isTimerOn));
  };

  if (isError) {
    return <Box color="red">{errorStatus}</Box>;
  }

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
