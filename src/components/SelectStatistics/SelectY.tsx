import { useState } from 'react';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import CalendarStatistics from './CalendarStatistic';

const SelectY = () => {
  const [valueY, setValueY] = useState('today');

  const handleChange = (event: SelectChangeEvent) => {
    setValueY(event.target.value);
    // console.log(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          defaultValue="today"
          labelId="select-labelY"
          value={valueY}
          onChange={handleChange}>
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="yesterday">yesterday</MenuItem>
          <MenuItem value="chooseDate">choose date</MenuItem>
          <MenuItem value="week">
            <CalendarStatistics />
          </MenuItem>
          {/* <MenuItem value={projects}>Projects</MenuItem> */}
        </Select>
      </FormControl>
      {/* <CalendarStatistics/> */}
    </Box>
  );
};
export default SelectY;
