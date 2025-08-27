import { type FC, useCallback, useMemo } from 'react';
import type { Role } from '@/types';

import {
  Box,
  Chip,
  Checkbox,
  CircularProgress,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  type SelectChangeEvent,
} from '@mui/material';

type RoleMultiSelectProps = {
  allRoles: Role[] | null;
  value: string[];
  onChange: (ids: string[]) => void;
  disabled?: boolean;
  loading?: boolean;
};

const PLACEHOLDER = 'Select roles…';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 6.5 + 8,
      width: 360,
    },
  },
};

const RoleMultiSelect: FC<RoleMultiSelectProps> = ({
  allRoles,
  value,
  onChange,
  disabled,
  loading,
}) => {
  const roleNameById = useMemo(
    () => new Map(allRoles?.map((r) => [r.id, r.name] as const)),
    [allRoles]
  );

  const handleChange = useCallback((event: SelectChangeEvent<string[]>) => {
    onChange(event.target.value as string[]);
  }, [onChange]);

  const renderSelectItem = useCallback((selected: string[]) => {
    if (selected.length === 0) {
      return (
        <Box sx={{ opacity: 0.6 }}>{PLACEHOLDER}</Box>
      );
    }

    return (
      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
        {selected.map((id) => (
          <Chip
            key={id}
            size="small"
            label={roleNameById.get(id) ?? id}
          />
        ))}
      </Box>
    );
  }, [roleNameById]);

  const isEmpty = allRoles?.length === 0;

  return (
    <FormControl fullWidth disabled={disabled || loading}>
      <InputLabel id="roles-label">Roles</InputLabel>

      <Select
        labelId="roles-label"
        multiple
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label="Roles" />}
        renderValue={renderSelectItem}
        MenuProps={MenuProps}
        endAdornment={
          loading ? (
            <Box sx={{ pr: 1.5 }}>
              <CircularProgress size={18} />
            </Box>
          ) : null
        }
      >
        {isEmpty ? (
          <MenuItem disabled>
            No roles available
          </MenuItem>
        ) : (
          allRoles?.map((role) => (
            <MenuItem key={role.id} value={role.id}>
              <Checkbox checked={value.includes(role.id)} />
              <ListItemText primary={role.name} />
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
};

export default RoleMultiSelect;
