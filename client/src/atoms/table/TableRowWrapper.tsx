import { memo, type FC } from "react";
import { TableRow } from "@mui/material";
import type { Column } from "./types";
import TableCellWrapper from "./TableCellWrapper";

type TableRowWrapperProps = {
  row: any;
  hover: boolean;
  columns: Column[];
};

const TableRowWrapper: FC<TableRowWrapperProps> = ({ row, hover, columns }) => (
  <TableRow hover={hover}>
    {columns.map((col) => (
      <TableCellWrapper key={col.id} row={row} col={col} />
    ))}
  </TableRow>
);

export default memo(TableRowWrapper);
