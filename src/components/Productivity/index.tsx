import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { Box, Grid, Paper, Typography } from '@mui/material';

import { ReactComponent as ProductivityLogo } from '../../assets/user-hourglass-svgrepo-com.svg';
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
  const percent = ((sumTotal * 100) / intervalTime).toFixed(1);
  const [allTime, worktime] = [
    100 - Number(percent),
    ((sumTotal * 100) / intervalTime).toFixed(1),
  ];
  const label = ['', 'workTime,%'];

  const profitData = {
    labels: label,
    datasets: [
      {
        data: [allTime, worktime],
        backgroundColor: ['rgba(111, 107, 117, 1)', 'rgba(19, 108, 232, 1)'],
      },
    ],
  };

  return (
    <Box>
      <Paper elevation={3}>
        <Grid container mx="auto" my={2} justifyContent="space-between">
          <Grid item>
            <ProductivityLogo height={100} width="50%" />
            <Typography variant="h3" ml={1}>
              <b>Your productivity is ${worktime}%</b>
            </Typography>
          </Grid>
          <Grid item width={150}>
            <Doughnut data={profitData} />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProductivityBox;
