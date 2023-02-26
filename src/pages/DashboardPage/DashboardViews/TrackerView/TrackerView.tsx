import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';

import { getActiveTimer, getUserTimers } from '../../../../api/serverApi';
import AddedTask from '../../../../components/AddedTask/AddedTask';
import EmptyViewTimers from '../../../../components/EmptyView/EmptyViewTimers';
import ProjectList from '../../../../components/ProjectList/ProjectList';
import CalendarStatistics from '../../../../components/SelectStatistics';
import Timer from '../../../../components/Timer/Timer';
import {
  DEFAULT_END_TODAY_TIMESTAMP,
  DEFAULT_STARTDAY_PREV_WEEK_TIMESTAMP,
  HOURS_IN_MILISEC,
  MORE_TASKS,
  TASKS_SHOWED_DEFAULT,
} from '../../../../constants/appConstants';
import timeStringView from '../../../../helpers/timeString';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { setErrorMessage } from '../../../../store/errorHandler';
import {
  setIsTimerOn,
  setProjectToTimer,
  setTimerData,
} from '../../../../store/timeTrackerSlice';
import { mainTitleTypography } from '../../../../theme/elementsStyles';
import { ProjectData, TimerData } from '../../../../types/trackerInterfaces';

interface AddedTaskData {
  taskName: string;
  taskStart: string;
  taskTimeSec: number;
  id: string;
  project: ProjectData;
}

const TrackerView = () => {
  const [tasksArr, setTasksArr] = useState<AddedTaskData[]>([]);
  const [refreshPage, setRefreshPage] = useState(true);
  const [isTimersData, setIsTimersData] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [tasksShowed, setTasksShowed] = useState(TASKS_SHOWED_DEFAULT);
  const onClickRef = useRef<HTMLButtonElement>(null);
  const serverUserId = useAppSelector((state) => state.serverUserData.id);
  const timerData = useAppSelector((state) => state.timeTracker);
  const [timePeriod, setTimePeriod] = useState([
    DEFAULT_STARTDAY_PREV_WEEK_TIMESTAMP,
    DEFAULT_END_TODAY_TIMESTAMP,
  ]);
  const [startDate, endDate] = timePeriod;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const taskArrReducer = (arr: AddedTaskData[]) => {
    const result = arr.reduce((total, task) => {
      let acc = total;
      acc += task.taskTimeSec;
      return acc;
    }, 0);
    return result;
  };
  const totalWeek = taskArrReducer(tasksArr);
  const totalWeekHours = Math.floor(totalWeek / HOURS_IN_MILISEC);
  const totalWeekMin = new Date(totalWeek).getMinutes();
  const totalWeekSec = new Date(totalWeek).getSeconds();
  const timeStringWeek = timeStringView(
    totalWeekSec,
    totalWeekMin,
    totalWeekHours
  );
  const totalToday = taskArrReducer(
    tasksArr.filter(({ taskStart }) => {
      const today = new Date();
      const taskDate = new Date(taskStart);
      return today.getDay() === taskDate.getDay();
    })
  );
  const totalDayHours = Math.floor(totalToday / HOURS_IN_MILISEC);
  const totalDayMin = new Date(totalToday).getMinutes();
  const totalDaySec = new Date(totalToday).getSeconds();
  const timeStringDay = timeStringView(totalDaySec, totalDayMin, totalDayHours);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setTimerData({
        ...timerData,
        timerTitle: event.target.value,
      })
    );
  };

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter' && timerData.timerTitle) {
      if (onClickRef.current) {
        onClickRef.current.click();
      }
    }
  };

  const showMoreHandler = () => {
    setTasksShowed(tasksShowed + MORE_TASKS);
  };

  useEffect(() => {
    if (serverUserId) {
      (async () => {
        try {
          const data = await getUserTimers(serverUserId, startDate, endDate);
          const dataArr: AddedTaskData[] = data
            .filter(({ isActive }: TimerData) => !isActive)
            .map(({ startTime, id, title, totalTime, project }: TimerData) => {
              return {
                id,
                taskName: title,
                taskStart: new Date(+startTime).toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                }),
                taskTimeSec: +totalTime,
                project,
              };
            });
          setTasksArr(dataArr);
          setIsTimersData(true);
        } catch (error) {
          dispatch(
            setErrorMessage(
              'Failed to get timers data, please try again latter'
            )
          );
        }
      })();
    }
  }, [refreshPage, serverUserId, dispatch, startDate, endDate]);

  useEffect(() => {
    if (serverUserId && !timerData.previousTimeStamp) {
      (async () => {
        try {
          const data = await getActiveTimer(serverUserId);
          if (data[0]?.isActive) {
            dispatch(
              setTimerData({
                timerId: data[0].id,
                timerTitle: data[0].title,
                totalTime: +data[0].totalTime || 0,
                startTime: data[0].startTime,
              })
            );
            dispatch(setIsTimerOn(true));
            if (data[0].project) {
              dispatch(
                setProjectToTimer({
                  projectId: data[0].project.id,
                  projectTitle: data[0].project.title,
                  projectColor: data[0].project.color,
                })
              );
            }
          }
        } catch (error) {
          dispatch(
            setErrorMessage(
              'Failed to get active timer, please try again latter'
            )
          );
        }
      })();
    }
  }, [serverUserId, dispatch, timerData.previousTimeStamp]);

  if (!isTimersData) {
    return <Box> </Box>;
  }

  return (
    <Grid container direction="column">
      <Typography component="h1" sx={mainTitleTypography}>
        {t(`dashboard.timeTracker`)}
      </Typography>
      <Paper>
        <Grid
          item
          container
          alignItems="center"
          direction="column"
          borderRadius="5px"
          sx={{
            width: '100%',
            gap: { xs: 1, sm: 2 },
          }}>
          <Grid
            item
            sx={{
              width: '100%',
            }}>
            <TextField
              required
              placeholder={`${t('timers.workOn')}`}
              value={timerData.timerTitle}
              onChange={onChangeHandler}
              onKeyDown={onKeyDownHandler}
              error={Boolean(errMessage)}
              label={errMessage}
              sx={{
                width: '100%',
                '& .MuiInputBase-input': {
                  backgroundColor: 'background.default',
                  borderRadius: '5px',
                },
              }}
              onFocus={() => {
                setErrMessage('');
              }}
            />
          </Grid>
          <Grid item>
            <ProjectList />
          </Grid>
          <Grid item>
            <Timer
              setRefreshPage={setRefreshPage}
              refreshPage={refreshPage}
              serverUserId={serverUserId}
              onClickRef={onClickRef}
              setErrMessage={setErrMessage}
            />
          </Grid>
        </Grid>
      </Paper>
      <Grid
        item
        container
        alignItems="center"
        mt={5}
        mb={3}
        sx={{
          justifyContent: { xs: 'center', sm: 'space-between' },
          gap: 2,
        }}>
        <Grid item sx={{}}>
          <CalendarStatistics setTimePeriod={setTimePeriod} />
        </Grid>
        <Grid item textAlign="right">
          <Typography sx={{ typography: { xs: 'body2', md: 'body1' } }}>
            {t('time.period')}:<b> {timeStringWeek}</b>
          </Typography>
          <Typography sx={{ typography: { xs: 'body2', md: 'body1' } }}>
            {t('time.today')}:<b> {timeStringDay}</b>
          </Typography>
        </Grid>
      </Grid>
      <Grid item container gap={1}>
        {tasksArr.length ? (
          tasksArr
            .filter((task: AddedTaskData, index: number) => index < tasksShowed)
            .map(({ id, taskName, taskStart, taskTimeSec, project }) => {
              return (
                <Grid key={id} item xs={12}>
                  <Paper elevation={0} sx={{ p: { xs: 1, sm: 2 } }}>
                    <AddedTask
                      taskName={taskName}
                      taskStart={taskStart}
                      taskTimeSec={taskTimeSec}
                      id={id}
                      project={project}
                      setRefreshPage={setRefreshPage}
                      refreshPage={refreshPage}
                    />
                  </Paper>
                </Grid>
              );
            })
        ) : (
          <EmptyViewTimers />
        )}
        {tasksArr.length > tasksShowed && (
          <Grid container justifyContent="center">
            <Button
              size="large"
              onClick={showMoreHandler}
              sx={{ fontSize: { sm: '1.2rem' } }}>
              {t('timers.showMore')}
            </Button>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default TrackerView;
