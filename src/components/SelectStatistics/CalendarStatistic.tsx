import { useState } from 'react';
import DatePicker from 'react-datepicker';

import { Grid } from '@mui/material';

import { DURATION_OF_DAY } from '../../constants/appConstants';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addTimePeriod, changeCalendar } from '../../store/statisticSlice';
import './CalendarStatistic.scss';

import 'react-datepicker/dist/react-datepicker.css';

const CalendarStatistics = () => {
  const dispatch = useAppDispatch();
  const [isChange, setIsChange] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const themeMod = useAppSelector((state) => state.themeMode.themeColor);
  const [rezStartDate, setRezStartDate] = useState<number>(
    new Date().getTime()
  );
  const [rezEndDate, setRezEndDate] = useState<number>(
    new Date().getTime() + DURATION_OF_DAY
  );

  const onChange = (dates: [Date | null, Date | null]) => {
    if (!isChange) {
      setIsChange(true);
      dispatch(changeCalendar(true));
    }
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start) {
      setRezStartDate(start.getTime());
      setRezEndDate(
        (end === null ? start.getTime() : end.getTime()) + DURATION_OF_DAY
      );
    }
  };

  const handleCalendarClose = () => {
    dispatch(addTimePeriod([rezStartDate, rezEndDate]));
  };

  return (
    <Grid item columns={1}>
      <legend>Choose period</legend>
      <DatePicker
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange={true}
        maxDate={new Date()}
        dateFormat="dd-MM-yyyy"
        onCalendarClose={handleCalendarClose}
        className={themeMod === 'dark' ? 'dark-mode' : undefined}
      />
    </Grid>
  );
};

export default CalendarStatistics;
