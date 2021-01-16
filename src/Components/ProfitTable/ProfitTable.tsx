import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import useProfitTableStyles from "./theme";

type TableProps = {
  head: string[];
  stocks: Object[];
};

const ProfitTable: React.FC<TableProps> = ({ head, stocks }) => {
  const classes = useProfitTableStyles();

  return (
    <Table aria-label="simple table" className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Тикер</TableCell>
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
              {row.ticker}
            </TableCell>
            <TableCell align="center">{row.profit}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProfitTable;
