import { IconButton } from '@mui/material';

import { BASE_URL, FLY_ROUTES } from '../../constants/apiFly';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  setIsTimerOn,
  setPreviousTimeStamp,
  setTimerData,
} from '../../store/timeTrackerSlice';
import { PlayArrowIcon } from '../../theme/appIcons';

interface SmallTimerProps {
  timerId: string;
  timerTitle: string;
  totalTime: number;
}

const SmallTimer = ({ timerId, timerTitle, totalTime }: SmallTimerProps) => {
  const isTimerOn = useAppSelector((state) => state.timeTracker.isTimerOn);
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    dispatch(setIsTimerOn(true));
    dispatch(
      setTimerData({
        timerId,
        timerTitle,
        totalTime,
      })
    );
    dispatch(setPreviousTimeStamp(Date.now()));
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
  };
  return (
    <IconButton onClick={onClickHandler} disabled={isTimerOn}>
      <PlayArrowIcon />
    </IconButton>
  );
};

export default SmallTimer;
