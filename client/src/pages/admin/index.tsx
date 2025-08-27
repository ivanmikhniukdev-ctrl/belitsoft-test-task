import { useCallback, useEffect, useState, type FC } from 'react';

import Toast from '@/atoms/toast';
import { DEFAULT_TOAST_STATE } from '@/components/users-table/constants';
import type { ToastState, UserTableRow } from '@/components/users-table/types';

import UsersTable from '@/components/users-table';

import useUsers from '@/hooks/useUsers';
import useRoles from '@/hooks/useRoles';
import AdminFilter from './AdminFilter';

const Admin: FC = () => {
  const [toast, setToast] = useState<ToastState>(DEFAULT_TOAST_STATE);

  const {
    users,
    loading: loadingUsers,
    error: usersError,
    savingStatus,
    updateUserRoles,
  } = useUsers();

  const { roles, loading: loadingRoles, error: rolesError } = useRoles();

  const [filterRoleIds, setFilterRoleIds] = useState<string[]>([]);

  const loading = loadingUsers || loadingRoles;
  const error = usersError || rolesError;

  const onFilterChange = useCallback((ids: string[]) => {
    setFilterRoleIds(ids);
  }, []);

  const handleChange = useCallback(
    async (u: UserTableRow, next: string[]) => {
      const res = await updateUserRoles(u.id as string, next);

      if (res.ok) {
        setToast({ open: true, message: 'Roles updated', severity: 'success' });
      } else {
        setToast({
          open: true,
          message: res.error || 'Failed to update',
          severity: 'error',
        });
      }
    },
    [updateUserRoles]
  );

  const handleToastClose = useCallback(() => setToast((t) => ({ ...t, open: false })), []);

  useEffect(() => {
    if (error) {
      setToast({
        open: true,
        message: error,
        severity: 'error',
      });
    }
  }, [error]);

  return (
    <div className="admin">
      <AdminFilter 
        loading={loading}
        roles={roles}
        filterRoleIds={filterRoleIds}
        onFilterChange={onFilterChange}
      />

      <UsersTable
        users={users}
        roles={roles}
        savingStatus={savingStatus}
        filterRoleIds={filterRoleIds}
        handleChange={handleChange}
      />

      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={handleToastClose}
      />
    </div>
  );
};

export default Admin;
