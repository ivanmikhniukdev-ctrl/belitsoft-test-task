import { useMemo, type FC } from 'react';

import type { Role, User } from '@/types';
import RoleMultiSelect from '@/components/role-multi-select';

import {
  Box,
  Paper,
  TableContainer,
} from '@mui/material';

import BaseTable from '@/atoms/table';
import type { Column } from '@/atoms/table/types';

import { DEFAULT_TABLE_COLS } from './constants';
import type { UserTableRow } from './types';

type UsersTableProps = {
  users: User[] | null;
  roles: Role[] | null;
  savingStatus: Record<string, boolean>;
  filterRoleIds?: string[];
  handleChange: (u: UserTableRow, next: string[]) => void;
};

const UsersTable: FC<UsersTableProps> = ({
  users,
  roles,
  savingStatus,
  filterRoleIds = [],
  handleChange,
}) => {
  const filtered = useMemo(() => {
    if (!filterRoleIds.length) {
      return users ?? [];
    };

    const set = new Set(filterRoleIds);
    
    return (users ?? []).filter((u) => u.roles.some((r) => set.has(r)));
  }, [users, filterRoleIds]);

  const columns: Column[] = useMemo(
    () => [
      ...DEFAULT_TABLE_COLS,
      {
        id: 'roles',
        label: 'Roles',
        width: 420,
        render: (u) => (
          <RoleMultiSelect
            allRoles={roles}
            value={u.roles}
            onChange={(ids) => handleChange(u, ids)}
            loading={!!savingStatus[u.id]}
          />
        ),
      },
    ],
    [roles, savingStatus, handleChange]
  );

  return (
    <Box>
      <TableContainer component={Paper} elevation={1}>
        <BaseTable
          hover
          rows={filtered}
          columns={columns}
          ariaLabel="Users with roles table"
          size="small"
        />
      </TableContainer>
    </Box>
  );
};

export default UsersTable;
