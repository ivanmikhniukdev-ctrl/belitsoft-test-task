
import { useCallback, useEffect, useState } from 'react';

import { api } from '@/api/client';
import type { User } from '@/types';

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingStatus, setSavingStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const { data } = await api.get<User[]>('/users');

        setUsers(data);
      } catch (e: any) {
        setError(e?.message ?? 'Failed to load users');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const updateUserRoles = useCallback(async (userId: string, newRoles: string[]) => {
    setSavingStatus((s) => ({ ...s, [userId]: true }));

    try {
      const { data } = await api.patch<User>(
        `/users/${userId}/roles`, 
        { roles: newRoles }, 
        { headers: { 'Cache-Control': 'no-store' } }
      );

      setUsers((current) => current.map(u => u.id === userId ? data : u));

      return { ok: true, data };
    } catch (e: any) {
      return { 
        ok: false, 
        error: e?.response?.data?.message ?? e?.message ?? 'Failed to update roles' 
      };
    } finally {
      setSavingStatus(s => ({ ...s, [userId]: false }));
    }
  }, []);

  return { users, setUsers, loading, error, savingStatus, updateUserRoles };
};

export default useUsers;
