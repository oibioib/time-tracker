import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Grid, Switch, Typography } from '@mui/material';

// import { Button } from '@mui/material';

const LangSwitch = () => {
  const [checked, setChecked] = useState(false);
  // const [isEng, setIsEng] = useState(false);
  const { i18n } = useTranslation();

  // function changeLanguage(language: string) {
  //   i18n.changeLanguage(language);
  // }

  const changeLanguageSw = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (checked) {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('ru');
    }
  };

  // const changeLanguage1 = () => {
  //   if (isEng) {
  //     i18n.changeLanguage('en');
  //     setIsEng(false);
  //   } else {
  //     i18n.changeLanguage('ru');
  //     setIsEng(true);
  //   }
  // };

  return (
    <Grid container spacing={1}>
      {/* <Grid item>
        <Button size="small" variant="contained" onClick={changeLanguage1}>
          {isEng && (
            <Typography color="white" variant="body1" component="span">
              EN
            </Typography>
          )}
          {!isEng && (
            <Typography color="white" variant="body1" component="span">
              RU
            </Typography>
          )}
        </Button>
      </Grid> */}
      <Grid item container>
        <Typography color="white" variant="body1" component="span">
          EN
        </Typography>
        <Switch
          checked={checked}
          onChange={changeLanguageSw}
          color="info"
          size="small"
        />
        <Typography color="white">RU</Typography>
      </Grid>
      {/* <Grid item>
        <Button
          size="small"
          variant="contained"
          onClick={() => changeLanguage('en')}>
          EN
        </Button>
      </Grid>
      <Grid item>
        <Button
          size="small"
          variant="contained"
          onClick={() => changeLanguage('ru')}>
          RU
        </Button>
      </Grid> */}
    </Grid>
  );
};

export default LangSwitch;
