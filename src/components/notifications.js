import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

import { Snackbar, Alert } from '@mui/material';

const Notification = () => {
  const notifications = useSelector((state) => state.general.notification);

  const [notificationsQueue, setNotificationsQueue] = useState([]);

  useEffect(() => {
    if (notifications && notifications.length > 0) {
      setNotificationsQueue(prevQueue => [...prevQueue, ...notifications]);
    }
  }, [notifications]);

  const handleClose = (id) => {
    setNotificationsQueue(prevQueue =>
      prevQueue.filter(notification => notification.id !== id)
    );
  };

  return (
    <>
      {notificationsQueue.map((notification, index) => (
        <Snackbar
          open={true}
          autoHideDuration={5000}
          onClose={() => handleClose(notification.id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          key={index}
        >
          <Alert
            onClose={() => handleClose(notification.id)}
            severity={notification.type}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
}

export default Notification;