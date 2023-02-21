import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { getProjectTimers } from '../../../../api/serverApi';
import CalendarStatistics from '../../../../components/SelectStatistics';
import {
  DEFAULT_END_TODAY_TIMESTAMP,
  DEFAULT_STARTDAY_PREV_WEEK_TIMESTAMP,
} from '../../../../constants/appConstants';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { addTimePeriod } from '../../../../store/statisticSlice';
import { mainTitleTypography } from '../../../../theme/elementsStyles';
import { TimerData } from '../../../../types/trackerInterfaces';

const ProjectView = () => {
  const { projectId } = useParams();
  const { timePeriod } = useAppSelector((state) => state.statistics);
  const [timersArr, setTimersArr] = useState<TimerData[]>([]);
  const [startDate, endDate] = timePeriod;
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (projectId) {
        const data = await getProjectTimers(projectId, startDate, endDate);
        setTimersArr(data);
      }
    })();
  }, [projectId, startDate, endDate]);

  useEffect(() => {
    return () => {
      dispatch(
        addTimePeriod([
          DEFAULT_STARTDAY_PREV_WEEK_TIMESTAMP,
          DEFAULT_END_TODAY_TIMESTAMP,
        ])
      );
    };
  }, [dispatch]);

  return (
    <Grid container direction="column">
      <Typography component="h1" sx={mainTitleTypography}>
        Имя проекта (нужно добавить) Time spend пересчитать
      </Typography>
      <Grid container gap={2}>
        <CalendarStatistics />
        <Grid container mt={1}>
          {timersArr.map(({ id, startTime, title, totalTime }: TimerData) => {
            const startingDate = new Date(+startTime);
            return (
              <Grid key={id} item xs={12} mb={1}>
                <Paper elevation={0} sx={{ p: { xs: 1, sm: 2 } }}>
                  <Grid
                    item
                    container
                    direction="column"
                    xs={12}
                    md={10}
                    gap={1}>
                    <Grid item mb={1}>
                      <Typography component="h3" variant="h6">
                        {title}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">
                        {startingDate.toLocaleDateString('en-US', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}{' '}
                        | Time spend: {totalTime}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProjectView;
