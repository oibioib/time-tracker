import { useEffect, useRef, useState } from 'react';

import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';

import { getActiveTimer, getUserTimers } from '../../../../api/serverApi';
import AddedTask from '../../../../components/AddedTask/AddedTask';
import EmptyView from '../../../../components/EmptyView/EmptyView';
import ProjectList from '../../../../components/ProjectList/ProjectList';
import Timer from '../../../../components/Timer/Timer';
import {
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
import { ProjectData } from '../../../../types/trackerInterfaces';

interface AddedTaskData {
  taskName: string;
  taskStart: string;
  taskTimeSec: number;
  id: string;
  project: ProjectData;
}

interface TimerData {
  startTime: number;
  totalTime: number;
  title: string;
  id: string;
  isActive: boolean;
  project: ProjectData;
}

const tallGrid = {
  mxHeight: '10%',
};

const TrackerView = () => {
  const [tasksArr, setTasksArr] = useState<AddedTaskData[]>([]);
  const [refreshPage, setRefreshPage] = useState(true);
  const [isTimersData, setIsTimersData] = useState(false);
  const [tasksShowed, setTasksShowed] = useState(TASKS_SHOWED_DEFAULT);
  const onClickRef = useRef<HTMLButtonElement>(null);
  const serverUserId = useAppSelector((state) => state.serverUserData.id);
  const timerData = useAppSelector((state) => state.timeTracker);
  const dispatch = useAppDispatch();
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
          const data = await getUserTimers(serverUserId);
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
  }, [refreshPage, serverUserId, dispatch, tasksShowed]);

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
            dispatch(
              setProjectToTimer({
                projectId: data[0].project.id,
                projectTitle: data[0].project.title,
                projectColor: data[0].project.color,
              })
            );
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
    <Grid container pt={2} sx={{ height: '100%' }}>
      <Grid item xs={12} sx={{ ...tallGrid }}>
        <Paper>
          <Box
            sx={{
              justifyContent: 'space-between',
              display: 'flex',
            }}>
            <Box>
              <TextField
                placeholder="What are you working on"
                value={timerData.timerTitle}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}>
              <ProjectList />

              <Timer
                setRefreshPage={setRefreshPage}
                refreshPage={refreshPage}
                serverUserId={serverUserId}
                onClickRef={onClickRef}
              />
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} sx={{ ...tallGrid }}>
        <Box
          mt={2}
          sx={{
            justifyContent: 'space-between',
            display: 'flex',
          }}>
          <Box>
            <Typography variant="body2">This Week</Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Box mr={1}>
              <Typography variant="body2">
                week total:
                <b> {timeStringWeek}</b>
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2">
                today total:
                <b> {timeStringDay}</b>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ ...tallGrid }}>
        <Box my={3} sx={{ height: 5, backgroundColor: 'coral' }}>
          {' '}
        </Box>
      </Grid>
      {tasksArr.length ? (
        tasksArr
          .filter((task: AddedTaskData, index: number) => index < tasksShowed)
          .map(({ id, taskName, taskStart, taskTimeSec, project }) => {
            return (
              <Grid key={id} item xs={12} my={3}>
                <Paper>
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
        <EmptyView />
      )}
      {tasksArr.length >= tasksShowed && (
        <Button onClick={showMoreHandler}>Show {MORE_TASKS} more</Button>
      )}
    </Grid>
  );
};

export default TrackerView;
