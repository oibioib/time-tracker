import { styled as muiStyled } from '@mui/material';
import Button from '@mui/material/Button';

const SidebarButton = muiStyled(Button)(({ theme }) => {
  return {
    width: '100%',
    color: theme.palette.info.main,
    minWidth: 'auto',
    gap: theme.spacing(0.5),
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    display: 'flex',
    justifyContent: 'flex-start',
    '&[aria-current="page"]': {
      background: theme.palette.primary.dark,
    },
  };
}) as typeof Button;

const sidebarButtonTypography = { display: { xs: 'none', lg: 'block' } };

export { SidebarButton, sidebarButtonTypography };
