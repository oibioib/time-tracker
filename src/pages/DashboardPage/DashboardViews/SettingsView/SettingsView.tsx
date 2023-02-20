import { useState } from 'react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Grid, Snackbar, TextField, Typography } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { updateServerUserId } from '../../../../api/serverApi';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { setErrorMessage } from '../../../../store/errorHandler';
import { setNewName } from '../../../../store/gitHubFetchSlice';
import { mainTitleTypography } from '../../../../theme/elementsStyles';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SettingsView = () => {
  const userServerId = useAppSelector((state) => state.serverUserData.id);
  const newUserNameStore = useAppSelector((state) => state.gitHubFetch.newName);
  const gitHubName = useAppSelector((state) => state.gitHubFetch.gitHubName);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const [newUserName, setNewUserName] = useState<string>(
    newUserNameStore || gitHubName
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserName(e.target.value.replace(/^\s/, '').replace(/\s+/g, ' '));
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newUserName.trim()) {
      dispatch(setNewName(newUserName.trim()));
      setOpen(true);
      (async () => {
        try {
          await updateServerUserId(userServerId, newUserName);
        } catch (error) {
          dispatch(setErrorMessage('Failed to change name. Try later'));
        }
      })();
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
    <>
      <Grid container direction="column" gap={2}>
        <Typography component="h1" sx={mainTitleTypography}>
          {t(`dashboard.settings`)}
        </Typography>
      </Grid>
      <Grid item mx="auto">
        <Snackbar
          open={open}
          autoHideDuration={1000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}>
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
                defaultValue={newUserName}
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
    </>
  );
};

export default SettingsView;
