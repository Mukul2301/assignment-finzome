import React from "react";
import { Cell, Row, useTable } from "react-table";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  TableContainer,
} from "@mui/material";
import "../styles.css";
import { toast } from "react-toastify";

export interface RowData {
  name: string;
  email: string;
  contact: string;
  isWeekday: boolean;
  gender: string;
  dob: string;
}

interface Column {
  Header: string;
  accessor: string;
}

interface TableProps {
  columns: Column[];
  data: any[];
  onEdit: (rowData: any) => void;
  onDelete: (index: number) => void;
}

const DataTable: React.FC<TableProps> = ({
  columns,
  data,
  onEdit,
  onDelete,
}) => {
  const { getTableProps, getTableBodyProps, rows, prepareRow } = useTable({
    columns,
    data,
  });

  const handleDelete = (index: number) => {
    onDelete(index);
    toast.success("Record Deleted");
  };
  return (
    <TableContainer
      style={{
        minWidth: 650,
        maxHeight: 300,
        overflowY: "auto",
      }}
    >
      <Table
        style={{
          maxHeight: 300,
          overflowY: "auto",
        }}
        {...getTableProps()}
      >
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell style={{ color: "white" }} key={column.accessor}>
                {column.Header}
              </TableCell>
            ))}
            <TableCell style={{ color: "white" }} key="action">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row: Row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell: Cell) => (
                  <TableCell key={cell.column.id}>
                    {cell.column.id === "isWeekday"
                      ? (row.original as RowData).isWeekday
                        ? "Yes"
                        : "No"
                      : cell.render("Cell")}
                  </TableCell>
                ))}
                <TableCell key="action" style={{ padding: 0 }}>
                  <Button
                    style={{ margin: "10px" }}
                    onClick={() => onEdit(row.original)}
                    variant="outlined"
                  >
                    Edit
                  </Button>

                  <Button
                    onClick={() => handleDelete(row.index)}
                    variant="outlined"
                    color="error"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
