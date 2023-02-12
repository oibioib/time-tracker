import { useState } from 'react';
import DatePicker from 'react-datepicker';

import { Grid } from '@mui/material';

import { useAppDispatch } from '../../hooks/hooks';
import { addTimePeriod } from '../../store/statisticSlice';

import 'react-datepicker/dist/react-datepicker.css';

const CalendarStatistics = () => {
  const dispatch = useAppDispatch();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [rezStartDate, setRezStartDate] = useState<number>(
    new Date().getTime()
  );
  const [rezEndDate, setRezEndDate] = useState<number>(
    new Date().getTime() + 86399000
  );

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    // console.log(start, end);
    setStartDate(start);
    setEndDate(end);

    if (start) {
      if (end === null) {
        setRezStartDate(start.getTime());
        setRezEndDate(start.getTime() + 86399000);
      } else {
        setRezStartDate(start.getTime());
        setRezEndDate(end.getTime() + 86399000);
      }
    }
  };

  const handleCalendarClose = () => {
    // console.log('1111111dispatch(addTimePeriod)');
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
      />
    </Grid>
  );
};

export default CalendarStatistics;
