import { useCallback, type FC } from 'react';

import { Chip } from '@mui/material';
import type { Role } from '@/types';

import './styles.scss';

type RoleFilterProps = {
  roles: Role[] | null;
  selectedIds: string[];
  onChange: (ids: string[]) => void;
};

const RoleFilter: FC<RoleFilterProps> = ({ roles, selectedIds, onChange }) => {
  const toggle = useCallback((id: string) => {
    const isIdExisting = selectedIds.includes(id);

    onChange(isIdExisting ? selectedIds.filter(x => x !== id) : [...selectedIds, id]);
  }, [selectedIds, onChange]);

  return (
    <div className="role-filter">
      <span className="role-filter__label">Filter by role</span>

      <div className="role-filter__chips">
        {roles?.map(({ id, name }) => (
          <Chip
            key={id}
            onClick={() => toggle(id)}
            label={name}
            variant={selectedIds.includes(id) ? 'filled' : 'outlined'}
          />
        ))}
        
        {roles?.length === 0 && (
          <span className="role-filter__empty">No roles found</span>
        )}
      </div>
    </div>
  );
};

export default RoleFilter;
