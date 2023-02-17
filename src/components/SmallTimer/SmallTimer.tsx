import { IconButton } from '@mui/material';

import { updateTimer } from '../../api/serverApi';
import { TIMER_ACTIVE } from '../../constants/serverConstants';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setErrorMessage } from '../../store/errorHandler';
import {
  setIsTimerOn,
  setPreviousTimeStamp,
  setProjectToTimer,
  setTimerData,
} from '../../store/timeTrackerSlice';
import { PlayArrowIcon } from '../../theme/appIcons';
import { ProjectData } from '../../types/trackerInterfaces';

interface SmallTimerProps {
  timerId: string;
  timerTitle: string;
  totalTime: number;
  project: ProjectData;
}

const SmallTimer = ({
  timerId,
  timerTitle,
  totalTime,
  project,
}: SmallTimerProps) => {
  const isTimerOn = useAppSelector((state) => state.timeTracker.isTimerOn);
  const dispatch = useAppDispatch();

  const onClickHandler = async () => {
    dispatch(setIsTimerOn(true));
    dispatch(
      setTimerData({
        timerId,
        timerTitle,
        totalTime,
      })
    );
    dispatch(setPreviousTimeStamp(Date.now()));
    dispatch(
      setProjectToTimer({
        projectId: project?.id,
        projectTitle: project?.title,
        projectColor: project?.color,
      })
    );
    try {
      await updateTimer(
        timerTitle,
        TIMER_ACTIVE.ACTIVE,
        totalTime,
        timerId,
        project?.id
      );
    } catch (error) {
      dispatch(setErrorMessage('Failed to resume time tracker'));
    }
    return undefined;
  };

  return (
    <IconButton onClick={onClickHandler} disabled={isTimerOn}>
      <PlayArrowIcon />
    </IconButton>
  );
};

export default SmallTimer;
