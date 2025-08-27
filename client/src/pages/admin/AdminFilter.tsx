import { memo, type FC } from "react";

import RoleFilter from "@/components/role-filter";
import { CircularProgress } from "@mui/material";

import type { Role } from "@/types";

type AdminFilterProps = {
    loading: boolean;
    roles: Role[] | null;
    filterRoleIds: string[];
    onFilterChange: (ids: string[]) => void;
};

const AdminFilter: FC<AdminFilterProps> = ({ loading, roles, filterRoleIds, onFilterChange }) => (
    <section className="admin__toolbar">
        <div className="admin__toolbar-header">
            <h1 className="admin__toolbar-title">Users</h1>
            <RoleFilter roles={roles} selectedIds={filterRoleIds} onChange={onFilterChange} />
        </div>

        {loading && (
            <CircularProgress />
        )}
    </section>
);

export default memo(AdminFilter);
