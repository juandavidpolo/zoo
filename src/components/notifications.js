import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

import { Grid, Snackbar, Alert } from '@mui/material';

const Notification = () => {
  const generalInfo = useSelector((state) => state.general);

  const [open, setOpen] = useState(true);
  const [notification, setNotification] = useState(null);

  const state = {
    vertical: 'top',
    horizontal: 'rigth',
  };
  const { vertical, horizontal } = state;

  useEffect(() => {
    if (generalInfo.notification !== null){
      setNotification(generalInfo.notification)
    }
  }, [generalInfo.notification])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Grid item xs={6} textAlign="right">
      {notification !== null &&
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          key={vertical + horizontal}
        >
          <Alert
            onClose={handleClose}
            severity={notification.type}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      }
    </Grid>
  );
}

export default Notification;