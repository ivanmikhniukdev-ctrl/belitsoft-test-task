import type { FC } from 'react';

import {
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

import type { Column } from './types';

import './styles.scss';
import TableRowWrapper from './TableRowWrapper';

export type BaseTableProps = {
  rows: any[];
  columns: Column[];
  ariaLabel?: string;
  size?: 'small' | 'medium';
  hover?: boolean;
};

const BaseTable: FC<BaseTableProps> = (props) => {
  const {
    rows,
    columns,
    ariaLabel,
    size = 'small',
    hover = true,
  } = props;

  const hasRows = rows?.length > 0;

  return (
    <MuiTable size={size} aria-label={ariaLabel}>
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell
              key={col.id}
              align={col.align}
              sx={{ ...(col.width ? { width: col.width } : {}), ...(col.sx as any) }}
            >
              <span className="table-header">{col.label}</span>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {hasRows &&
          rows.map((row) => (<TableRowWrapper key={row.id} row={row} columns={columns} hover={hover} />))}

        {!hasRows && (
          <TableRow>
            <TableCell colSpan={columns.length}>
              {rows.length === 0 && (
                <div className="table-empty">
                  <div className="empty-title">No data</div>
                  <div className="empty-subtitle">There is nothing to show here yet.</div>
                </div>
              )}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </MuiTable>
  );
};

export default BaseTable;
