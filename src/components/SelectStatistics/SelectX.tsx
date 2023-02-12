import { useState } from 'react';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const SelectX = () => {
  const [valueX, setValueX] = useState('tasks');

  const handleChange = (event: SelectChangeEvent) => {
    setValueX(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          defaultValue="tasks"
          labelId="select-labelX"
          value={valueX}
          onChange={handleChange}>
          <MenuItem value="tasks">All tasks</MenuItem>
          <MenuItem value="projects">Projects</MenuItem>
          <MenuItem value="clients">Clients</MenuItem>
          {/* <MenuItem value={projects}>Projects</MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
};
export default SelectX;
