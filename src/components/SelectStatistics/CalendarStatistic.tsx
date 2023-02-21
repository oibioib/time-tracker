import ru from 'date-fns/locale/ru';
import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { useTranslation } from 'react-i18next';

import { Grid } from '@mui/material';

import {
  DEFAULT_END_TODAY_TIMESTAMP,
  DEFAULT_STARTDAY_PREV_WEEK,
  DEFAULT_STARTDAY_PREV_WEEK_TIMESTAMP,
  DEFAULT_STARTDAY_TODAY,
  DURATION_OF_DAY,
} from '../../constants/appConstants';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addTimePeriod } from '../../store/statisticSlice';
import '../../theme/react-datepicker/datepicker.scss';

registerLocale('ru', ru);

const CalendarStatistics = () => {
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const themeMod = useAppSelector((state) => state.themeMode.themeColor);
  const [startDate, setStartDate] = useState<Date | null>(
    DEFAULT_STARTDAY_PREV_WEEK
  );
  const [endDate, setEndDate] = useState<Date | null>(DEFAULT_STARTDAY_TODAY);
  const [rezStartDate, setRezStartDate] = useState<number>(
    DEFAULT_STARTDAY_PREV_WEEK_TIMESTAMP
  );
  const [rezEndDate, setRezEndDate] = useState<number>(
    DEFAULT_END_TODAY_TIMESTAMP
  );

  const onChange = (dates: [Date | null, Date | null]) => {
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
      {/* <legend>Choose period</legend> */}
      <DatePicker
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange={true}
        maxDate={new Date()}
        dateFormat="dd-MM-yyyy"
        onCalendarClose={handleCalendarClose}
        className={
          themeMod === 'dark'
            ? 'react-datepicker-input-element react-datepicker-input-dark'
            : 'react-datepicker-input-element react-datepicker-input-light'
        }
        popperClassName={themeMod === 'dark' ? 'dark' : undefined}
        locale={i18n.language === 'en' ? undefined : 'ru'}
      />
    </Grid>
  );
};

export default CalendarStatistics;
