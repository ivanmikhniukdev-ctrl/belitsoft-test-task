
import { useEffect, useState } from 'react';

import { api } from '@/api/client';
import type { Role } from '@/types';

const useRoles = () => {
  const [roles, setRoles] = useState<Role[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const { data } = await api.get<Role[]>('/roles');

        setRoles(data);
      } catch (e: any) {
        setError(e?.message ?? 'Failed to load roles');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { roles, loading, error };
};

export default useRoles;
