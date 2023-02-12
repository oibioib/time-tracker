import { useEffect, useState } from 'react';

import { Box, Grid, Paper, TextField, Typography } from '@mui/material';

import { getActiveTimer, getUserTimers } from '../../../../api/serverApi';
import AddedTask from '../../../../components/AddedTask/AddedTask';
import EmptyView from '../../../../components/EmptyView/EmptyView';
import Timer from '../../../../components/Timer/Timer';
import { HOURS_IN_MILISEC } from '../../../../constants/appConstants';
import timeStringView from '../../../../helpers/timeString';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { setErrorMessage } from '../../../../store/errorHandler';
import { setIsTimerOn, setTimerData } from '../../../../store/timeTrackerSlice';

interface AddedTaskData {
  taskName: string;
  taskStart: string;
  taskTimeSec: number;
  id: string;
}

interface TimerData {
  startTime: number;
  totalTime: number;
  title: string;
  id: string;
}

const TrackerView = () => {
  const timerData = useAppSelector((state) => state.timeTracker);
  const [tasksArr, setTasksArr] = useState<AddedTaskData[]>([]);
  const [refreshPage, setRefreshPage] = useState(true);
  const serverUserId = useAppSelector((state) => state.serverUserData.id);
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

  useEffect(() => {
    if (serverUserId) {
      (async () => {
        try {
          const data = await getUserTimers(serverUserId);
          const dataArr: AddedTaskData[] = data.map(
            ({ startTime, id, title, totalTime }: TimerData) => {
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
              };
            }
          );
          setTasksArr(dataArr);
        } catch (error) {
          dispatch(
            setErrorMessage(
              'Failed to get timers data, please try again latter'
            )
          );
        }
      })();
    }
  }, [refreshPage, serverUserId, dispatch]);

  useEffect(() => {
    if (serverUserId) {
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
  }, [serverUserId, dispatch]);

  return (
    <Grid item container pt={2}>
      <Grid item xs={12}>
        <Paper>
          <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
            <Box>
              <TextField
                placeholder="What are you working on"
                value={timerData.timerTitle}
                onChange={onChangeHandler}
              />
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Timer
                setRefreshPage={setRefreshPage}
                refreshPage={refreshPage}
                serverUserId={serverUserId}
              />
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Box mt={2} sx={{ justifyContent: 'space-between', display: 'flex' }}>
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
      <Grid item xs={12}>
        <Box my={3} sx={{ height: 5, backgroundColor: 'coral' }}>
          {' '}
        </Box>
      </Grid>
      {tasksArr.length ? (
        tasksArr.map(({ id, taskName, taskStart, taskTimeSec }) => {
          return (
            <Grid key={id} item xs={12} my={3}>
              <Paper>
                <AddedTask
                  taskName={taskName}
                  taskStart={taskStart}
                  taskTimeSec={taskTimeSec}
                  id={id}
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
    </Grid>
  );
};

export default TrackerView;
