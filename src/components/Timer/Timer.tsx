import React, { useEffect, useState } from 'react';

import { IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { createTimer, updateTimer } from '../../api/serverApi';
import { DEFAULT_TITLE } from '../../constants/appConstants';
import { TIMER_ACTIVE } from '../../constants/serverConstants';
import timeStringView from '../../helpers/timeString';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setErrorMessage } from '../../store/errorHandler';
import {
  setIsTimerOn,
  setPreviousTimeStamp,
  setProjectToTimer,
  setTimerData,
} from '../../store/timeTrackerSlice';
import { PlayArrowIcon, StopIcon } from '../../theme/appIcons';

interface TimerProps {
  setRefreshPage: React.Dispatch<React.SetStateAction<boolean>>;
  refreshPage: boolean;
  serverUserId: string;
  onClickRef: React.RefObject<HTMLButtonElement>;
  setErrMessage: React.Dispatch<React.SetStateAction<string>>;
}

const Timer = ({
  setRefreshPage,
  refreshPage,
  serverUserId,
  onClickRef,
  setErrMessage,
}: TimerProps) => {
  const timerData = useAppSelector((state) => state.timeTracker);
  const dispatch = useAppDispatch();
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [hours, setHours] = useState(0);
  const {
    isTimerOn,
    totalTime,
    previousTimeStamp,
    timerTitle,
    timerId,
    projectId,
  } = timerData;
  const timeString = timeStringView(sec, min, hours);

  useEffect(() => {
    if (isTimerOn) {
      const timeSpent = new Date(
        totalTime + Date.now() - (previousTimeStamp || Date.now())
      );
      setSec(timeSpent.getSeconds());
      setMin(timeSpent.getMinutes());
      setHours(timeSpent.getUTCHours());
    }
  }, [totalTime, previousTimeStamp, isTimerOn]);

  useEffect(() => {
    if (isTimerOn) {
      const interval = setInterval(() => {
        dispatch(
          setTimerData({
            ...timerData,
            totalTime:
              totalTime + Date.now() - (previousTimeStamp || Date.now()),
          })
        );
        dispatch(setPreviousTimeStamp(Date.now()));
      }, 1000);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [isTimerOn, totalTime, timerData, dispatch, previousTimeStamp]);

  useEffect(() => {
    if (isTimerOn && sec % 10 === 0 && sec !== 0) {
      (async () => {
        try {
          await updateTimer(
            timerTitle,
            TIMER_ACTIVE.ACTIVE,
            totalTime,
            timerId,
            projectId
          );
        } catch {
          dispatch(
            setErrorMessage('Failed to update timer, please refresh the page')
          );
        }
      })();
    }
  }, [timerTitle, totalTime, isTimerOn, timerId, sec, dispatch, projectId]);

  const onClickHandler = async () => {
    if (!timerTitle) {
      setErrMessage('Title can not be empty');
      return;
    }
    if (!isTimerOn && sec === 0 && min === 0 && hours === 0) {
      try {
        const data = await createTimer(timerTitle, serverUserId, projectId);
        dispatch(
          setTimerData({
            ...timerData,
            timerId: data.id,
          })
        );
        dispatch(setPreviousTimeStamp(Date.now()));
      } catch (error) {
        dispatch(
          setErrorMessage('Failed to create timer, please refresh the page')
        );
      }
    }
    if (isTimerOn) {
      try {
        await updateTimer(
          timerTitle,
          TIMER_ACTIVE.INACTIVE,
          totalTime,
          timerId,
          projectId
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
        dispatch(
          setProjectToTimer({
            projectId: '',
            projectTitle: '',
          })
        );
        setRefreshPage(!refreshPage);
      } catch (error) {
        dispatch(
          setErrorMessage('Failed to update timer, please refresh the page')
        );
      }
    }
    dispatch(setIsTimerOn(!isTimerOn));
  };

  useEffect(() => {
    if (!isTimerOn) {
      document.title = DEFAULT_TITLE;
    } else document.title = timeString;

    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [timeString, isTimerOn]);

  return (
    <Grid container alignItems="center" sx={{ gap: 1 }} pb={1}>
      <Typography component="span" variant="h6">
        {timeString}
      </Typography>
      <IconButton
        onClick={onClickHandler}
        ref={onClickRef}
        sx={{
          color: 'accent.main',
          '& svg': { fontSize: '2rem' },
          backgroundColor: 'play.main',
          transition: '0.25s ease-in-out',
        }}>
        {isTimerOn ? <StopIcon /> : <PlayArrowIcon />}
      </IconButton>
    </Grid>
  );
};

export default Timer;
