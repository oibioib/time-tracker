import React, { useEffect, useState } from 'react';

import { Box, IconButton } from '@mui/material';

import { BASE_URL, FLY_ROUTES } from '../../constants/apiFly';
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
  flyUserId: string;
}

const Timer = ({ setRefreshPage, refreshPage, flyUserId }: TimerProps) => {
  const timerData = useAppSelector((state) => state.timeTracker);
  const { isTimerOn } = timerData;
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [hours, setHours] = useState(0);
  const dispatch = useAppDispatch();
  const [timerTitle, setTimerTitle] = useState('');
  const [timerId, setTimerId] = useState('');
  const { totalTime } = timerData;

  useEffect(() => {
    const timeSpent = new Date(timerData.totalTime);
    setSec(timeSpent.getSeconds());
    setMin(timeSpent.getMinutes());
    setHours(timeSpent.getUTCHours());
    if (timerData.timerId) {
      setTimerId(timerData.timerId);
    }
    setTimerTitle(timerData.timerTitle);
  }, [timerData.totalTime, timerData.timerId, timerData.timerTitle]);

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
        const response = await fetch(
          `${BASE_URL}/${FLY_ROUTES.TIMERS}/${timerId}`,
          {
            method: 'PATCH',
            body: JSON.stringify({
              title: timerTitle,
              isActive: 1,
              totalTime,
            }),
            headers: {
              'Content-type': 'application/json',
            },
          }
        );
        if (!response.ok) {
          throw new Error('Could not PATCH data to DB');
        }
      })();
    }
  }, [timerTitle, totalTime, isTimerOn, timerId, sec]);

  const onClickHandler = async () => {
    if (!isTimerOn && sec === 0 && min === 0 && hours === 0) {
      const response = await fetch(`${BASE_URL}/${FLY_ROUTES.TIMERS}`, {
        method: 'POST',
        body: JSON.stringify({
          title: timerTitle,
          startTime: Date.now(),
          userId: flyUserId,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Could not POST data to DB');
      }

      const data = await response.json();
      setTimerId(data.id);
      dispatch(setPreviousTimeStamp(Date.now()));
    }
    if (isTimerOn) {
      const response = await fetch(
        `${BASE_URL}/${FLY_ROUTES.TIMERS}/${timerId}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            title: timerTitle,
            isActive: 0,
            totalTime,
          }),
          headers: {
            'Content-type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Could not PATCH data to DB');
      }
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
    }
    dispatch(setIsTimerOn(!isTimerOn));
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
