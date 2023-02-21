import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

import { Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper/Paper';

import EmptyViewStatistic from '../../../../components/EmptyView/EmptyViewStatistic';
import ProductivityBox from '../../../../components/Productivity';
import CalendarStatistics from '../../../../components/SelectStatistics';
import {
  DEFAULT_END_TODAY_TIMESTAMP,
  DEFAULT_STARTDAY_PREV_WEEK_TIMESTAMP,
  DURATION_OF_DAY,
} from '../../../../constants/appConstants';
import {
  convertationToDate,
  convertationToMin,
  options,
} from '../../../../helpers/statisticsHelpers';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { setErrorMessage } from '../../../../store/errorHandler';
import {
  addTimePeriod,
  getDataInterval,
  getTimersTime,
} from '../../../../store/statisticSlice';
import { mainTitleTypography } from '../../../../theme/elementsStyles';
import palette from '../../../../theme/palette.module.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const StatisticsView = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const errorGetTimersTime = useAppSelector(
    (state) => state.statistics.getTimersTimeError
  );
  const errorGetDataInterval = useAppSelector(
    (state) => state.statistics.getDataIntervalError
  );

  const statisticsValueY = useAppSelector(
    (state) => state.statistics.timePeriod
  );
  const rezStartDate = statisticsValueY[0];
  const rezEndDate = statisticsValueY[1];

  const intervalTotalData = useAppSelector(
    (state) => state.statistics.dataTotalTime
  );
  const intervalData = useAppSelector((state) => state.statistics.dataInterval);
  const serverUserId = useAppSelector((state) => state.serverUserData.id);

  useEffect(() => {
    if (serverUserId) {
      dispatch(getDataInterval({ serverUserId, rezStartDate, rezEndDate }));
      const dayAmount = Math.trunc(
        (rezEndDate - rezStartDate) / DURATION_OF_DAY
      );
      dispatch(getTimersTime({ serverUserId, rezStartDate, dayAmount }));
    }
  }, [rezStartDate, rezEndDate, dispatch, serverUserId]);

  if (errorGetDataInterval) {
    dispatch(setErrorMessage(errorGetDataInterval));
  }
  if (errorGetTimersTime) {
    dispatch(setErrorMessage(errorGetTimersTime));
  }

  const totalTimeData = {
    labels: intervalTotalData.map((data) => convertationToDate(data.startTime)),
    datasets: [
      {
        data: intervalTotalData.map((data) =>
          convertationToMin(data.totalTime)
        ),
        backgroundColor: palette.accent,
      },
    ],
  };

  const selectedData = {
    labels: intervalData.map((data) => data.title),
    datasets: [
      {
        data: intervalData.map((data) => convertationToMin(data.totalTime)),
        backgroundColor: intervalData.map(() => palette.accent),
      },
    ],
  };

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
    <Grid container direction="column" gap={2}>
      <Typography component="h1" sx={mainTitleTypography}>
        {t(`dashboard.statistics`)}
      </Typography>

      <Grid item container direction="column" gap={2}>
        <Grid item container justifyContent="center">
          <CalendarStatistics />
        </Grid>

        {intervalTotalData.length ? (
          <>
            <Paper
              elevation={0}
              sx={{
                maxWidth: 'auto',
              }}>
              <Grid
                item
                container
                xs
                justifyContent="center"
                direction="column"
                sx={{ p: { xs: 1, sm: 2 } }}
                maxWidth={800}>
                <Grid item>
                  <Typography
                    textAlign="center"
                    component="h2"
                    variant="body1"
                    fontWeight="bold">
                    Your WorkTime on day for selected period
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  justifyContent="center"
                  maxHeight={400}
                  sx={{ py: { xs: 1, sm: 2 } }}>
                  <Bar data={totalTimeData} options={options} />
                </Grid>
              </Grid>
            </Paper>
            <Paper
              elevation={0}
              sx={{
                maxWidth: 'auto',
              }}>
              <ProductivityBox />
            </Paper>
          </>
        ) : null}

        {intervalData.length ? (
          <Paper
            elevation={0}
            sx={{
              maxWidth: 'auto',
            }}>
            <Grid
              item
              container
              xs
              justifyContent="center"
              direction="column"
              sx={{ p: { xs: 1, sm: 2 } }}
              maxWidth={800}>
              <Grid item>
                <Typography
                  textAlign="center"
                  component="h2"
                  variant="body1"
                  fontWeight="bold">
                  Time for each task for selected period
                </Typography>
              </Grid>
              <Grid
                item
                container
                justifyContent="center"
                maxHeight={400}
                sx={{ py: { xs: 1, sm: 2 } }}>
                <Bar data={selectedData} options={options} />
              </Grid>
            </Grid>
          </Paper>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default StatisticsView;
