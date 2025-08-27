import { Stack, Avatar, Box } from '@mui/material';
import type { ToastState, UserTableRow } from './types';

export const DEFAULT_TABLE_COLS = [
  {
    id: 'user',
    label: 'User',
    width: 380,
    render: (u: UserTableRow) => (
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar sx={{ width: 36, height: 36 }}>{u.name?.charAt(0) || '?'}</Avatar>
        <Box>
          <span className="user-name">{u.name}</span>
          <span className="user-id" style={{ opacity: 0.7, marginLeft: 6 }}>#{u.id}</span>
        </Box>
      </Stack>
    ),
  },
  {
    id: 'email',
    label: 'Email',
    render: (u: UserTableRow) => <span className="user-email">{u.email}</span>,
  }
];

export const DEFAULT_TOAST_STATE: ToastState = { open: false, message: '', severity: 'success' };
