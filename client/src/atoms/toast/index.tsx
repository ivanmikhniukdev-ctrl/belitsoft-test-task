import type { FC } from 'react';
import { Snackbar, Alert } from '@mui/material';

export type ToastProps = {
    open: boolean;
    message: string | null;
    severity?: 'success' | 'error' | 'warning' | 'info';
    autoHideDuration?: number;
    onClose: () => void;
};

const Toast: FC<ToastProps> = ({
  open,
  message,
  severity = 'info',
  autoHideDuration = 2500,
  onClose,
}) => (
  <Snackbar
    open={open}
    autoHideDuration={autoHideDuration}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    onClose={onClose}
  >
    <Alert
      onClose={onClose}
      severity={severity}
      sx={{ width: '100%' }}
      variant="filled"
    >
      {message}
    </Alert>
  </Snackbar>
);

export default Toast;
