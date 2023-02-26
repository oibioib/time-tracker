import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';

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
import { iconsStyle } from '../../theme/elementsStyles';
import { ProjectData } from '../../types/trackerInterfaces';

interface SmallTimerProps {
  timerId: string;
  timerTitle: string;
  totalTime: number;
  project: ProjectData;
  setRefreshPage: React.Dispatch<React.SetStateAction<boolean>>;
  refreshPage: boolean;
}

const SmallTimer = ({
  timerId,
  timerTitle,
  totalTime,
  project,
  setRefreshPage,
  refreshPage,
}: SmallTimerProps) => {
  const { t } = useTranslation();
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
      setRefreshPage(!refreshPage);
    } catch (error) {
      dispatch(setErrorMessage('Failed to resume time tracker'));
    }
    return undefined;
  };

  return (
    <Button
      endIcon={<PlayArrowIcon />}
      onClick={onClickHandler}
      disabled={isTimerOn}
      sx={iconsStyle}>
      {t('timers.resumeTimer')}
    </Button>
  );
};

export default SmallTimer;
