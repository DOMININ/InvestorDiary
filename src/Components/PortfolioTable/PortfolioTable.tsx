import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

type TableProps = {
  head: string[];
  stocks: Object[];
};

const PortfolioTable: React.FC<TableProps> = ({ head, stocks }) => {
  return (
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Название</TableCell>
          {head.map((title: string, id: number) => (
            <TableCell align="center" key={title + id}>
              {title}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {stocks.map((row: any) => (
          <TableRow key={row._id}>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="center">{row.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PortfolioTable;
