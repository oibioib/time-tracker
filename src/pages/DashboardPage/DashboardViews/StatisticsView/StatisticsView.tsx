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
  generateColor,
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
        backgroundColor: 'rgba(170, 135, 245, 1)',
      },
    ],
  };

  const selectedData = {
    labels: intervalData.map((data) => data.title),
    datasets: [
      {
        data: intervalData.map((data) => convertationToMin(data.totalTime)),
        backgroundColor: intervalData.map(() => generateColor()),
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

      <Grid item container justifyContent="space-around">
        <CalendarStatistics />
      </Grid>

      {intervalData.length ? (
        <Grid item container mt={2}>
          <Grid item xs={11} sm={12} maxHeight={400}>
            <Typography textAlign="center">
              Time for each task for selected period
            </Typography>
            <Bar data={selectedData} options={options} />
          </Grid>
        </Grid>
      ) : null}

      {intervalTotalData.length ? (
        <Grid item container mt={2}>
          <Grid item xs={11} sm={12} maxHeight={400}>
            <Typography textAlign="center">
              Your WorkTime on day for selected period{' '}
            </Typography>
            <Bar data={totalTimeData} options={options} />
          </Grid>
          <ProductivityBox />
        </Grid>
      ) : null}

      {intervalTotalData.length || intervalData.length ? null : (
        <EmptyViewStatistic />
      )}
    </Grid>
  );
};

export default StatisticsView;
