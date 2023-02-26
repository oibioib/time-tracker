import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

import { Grid, Paper, Typography } from '@mui/material';

import { useAppSelector } from '../../hooks/hooks';

ChartJS.register(ArcElement, Tooltip, Legend);

interface IValueY {
  statisticsValueY: number[];
}

const ProductivityBox = ({ statisticsValueY }: IValueY) => {
  const { t } = useTranslation();
  const intervalTotalData = useAppSelector(
    (state) => state.statistics.dataTotalTime
  );
  const [rezStartDate, rezEndDate] = statisticsValueY;
  const sumTotal = intervalTotalData.reduce(
    (accum, val) => accum + Number(val.totalTime),
    0
  );
  const intervalTime = rezEndDate - rezStartDate;
  const percent = ((sumTotal * 100) / intervalTime).toFixed(2);
  const [allTime, worktime] = [
    100 - Number(percent),
    ((sumTotal * 100) / intervalTime).toFixed(2),
  ];
  const label = [
    `${t('statistics.titleAllTime')}`,
    `${t('statistics.titleWorkTime')}`,
  ];

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
        <Grid item sx={{ px: { xs: 1, sm: 2 } }}>
          <Typography
            variant="body1"
            mb={2}
            fontWeight="bold"
            textAlign="center">
            {t('statistics.graphTitleProductivityStart')} {worktime}%{' '}
            {t('statistics.graphTitleProductivityEnd')}
          </Typography>
        </Grid>
        <Grid item sx={{ maxHeight: { xs: 150, sm: 200, md: 400 } }}>
          <Doughnut data={profitData} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductivityBox;
