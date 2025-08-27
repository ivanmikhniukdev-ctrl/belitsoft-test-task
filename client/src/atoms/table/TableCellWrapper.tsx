import { memo, type FC } from "react";
import { TableCell } from "@mui/material";
import type { Column } from "./types";

type TableCellWrapperProps = {
    row: any;
    col: Column;
};

const TableCellWrapper: FC<TableCellWrapperProps> = ({ row, col }) => (
    <TableCell key={col.id} align={col.align}>
        {col.render(row)}
    </TableCell>
);

export default memo(TableCellWrapper);
