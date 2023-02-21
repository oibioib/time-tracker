import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { Grid, Paper, Typography } from '@mui/material';

import { useAppSelector } from '../../hooks/hooks';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProductivityBox = () => {
  const intervalTotalData = useAppSelector(
    (state) => state.statistics.dataTotalTime
  );
  const statisticsValueY = useAppSelector(
    (state) => state.statistics.timePeriod
  );
  const [rezStartDate, rezEndDate] = statisticsValueY;
  const sumTotal = intervalTotalData.reduce(
    (accum, val) => accum + Number(val.totalTime),
    0
  );
  const intervalTime = rezEndDate - rezStartDate;
  const percent = ((sumTotal * 100) / intervalTime).toFixed(3);
  const [allTime, worktime] = [
    100 - Number(percent),
    ((sumTotal * 100) / intervalTime).toFixed(3),
  ];
  const label = ['Time out of work, %', 'Work time, %'];

  const profitData = {
    labels: label,
    datasets: [
      {
        data: [allTime, worktime],
        backgroundColor: ['rgba(111, 107, 117, 1)', 'rgba(19, 108, 232, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Paper elevation={0}>
      <Grid
        container
        mx="auto"
        my={2}
        alignItems="center"
        justifyContent="center"
        direction="column">
        <Grid item>
          <Typography variant="body1" mb={2} fontWeight="bold">
            Your productivity is {worktime}% for the selected period
          </Typography>
        </Grid>
        <Grid item maxHeight={400}>
          <Doughnut data={profitData} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductivityBox;
