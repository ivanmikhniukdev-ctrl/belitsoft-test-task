import type { Theme } from '@emotion/react';
import type { SxProps } from '@mui/material';
import type { ReactNode } from 'react';

export type Column = {
  id: string;
  label?: ReactNode;
  width?: number | string;
  align?: 'left' | 'right' | 'center' | 'justify' | 'inherit';
  sx?: SxProps<Theme>;
  render: (row: any) => ReactNode;
};
