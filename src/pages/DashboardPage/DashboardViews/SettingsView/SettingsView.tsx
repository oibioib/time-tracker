import { useState } from 'react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Grid, Snackbar, TextField, Typography } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { updateServerUserId } from '../../../../api/serverApi';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { setErrorMessage } from '../../../../store/errorHandler';
import { setNewName } from '../../../../store/gitHubFetchSlice';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SettingsView = () => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const userServerId = useAppSelector((state) => state.serverUserData.id);

  const dispatch = useAppDispatch();
  const [newUserName, setNewUserName] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserName(e.target.value.trim());
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newUserName) {
      dispatch(setNewName(newUserName));
      setOpen(true);
      (async () => {
        try {
          await updateServerUserId(userServerId, newUserName);
        } catch (error) {
          dispatch(setErrorMessage('Failed to change name. Try later'));
        }
      })();
      setNewUserName('');
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid item mx="auto">
      <Typography align="center" mb={2} mt={2} variant="h3" mx="auto">
        {t('dashboard.settings')}
      </Typography>
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {t('settings.successMessage')}
        </Alert>
      </Snackbar>
      <Grid item pt={2}>
        <form onSubmit={handleSubmit}>
          <Grid
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            <TextField
              id="outlined-controlled"
              label={t(`settings.newName`)}
              onChange={onChange}
              value={newUserName}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              sx={{
                mt: 2,
              }}>
              {t('buttons.submit')}
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default SettingsView;
