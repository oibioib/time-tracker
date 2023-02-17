import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addValueX } from '../../store/statisticSlice';

const SelectX = () => {
  const dispatch = useAppDispatch();
  const valueXfromStore = useAppSelector((state) => state.statistics.valueX);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(addValueX(event.target.value));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          defaultValue="tasks"
          labelId="select-labelX"
          value={valueXfromStore}
          onChange={handleChange}>
          <MenuItem value="tasks">All tasks</MenuItem>
          <MenuItem value="totalTime">Total Time</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectX;
