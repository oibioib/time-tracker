import { styled as muiStyled } from '@mui/material';
import Button from '@mui/material/Button';

const HeaderButton = muiStyled(Button)(({ theme }) => {
  return {
    color: theme.palette.info.main,
    minWidth: 'auto',
    gap: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.dark,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  };
}) as typeof Button;

const headerButtonTypography = { display: { xs: 'none', sm: 'block' } };

export { HeaderButton, headerButtonTypography };
