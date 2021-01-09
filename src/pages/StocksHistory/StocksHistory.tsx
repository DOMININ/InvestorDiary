import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/useHttp";
import { AuthContext } from "../../context/AuthContext";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import useStocksListStyles from "../StockInfo/theme";

const StocksHistory: React.FC = () => {
  const classes = useStocksListStyles();
  const [stocks, setStocks] = useState<[]>([]);
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchStocks = useCallback(async () => {
    try {
      const fetched = await request("GET", "api/stock", null, {
        authorization: `Bearer ${token}`,
      });
      setStocks(fetched.data);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchStocks();
  }, [fetchStocks]);

  return (
    <Paper className={classes.paper}>
      <TableContainer component={Container}>
        {!loading && stocks && (
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell align="center">Тикер</TableCell>
                <TableCell align="center">Количество</TableCell>
                <TableCell align="center">Цена покупки</TableCell>
                <TableCell align="center">Валюта</TableCell>
                <TableCell align="center">Дата покупки</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stocks.map((row: any) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.ticker}</TableCell>
                  <TableCell align="center">{row.qty}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="center">{row.currency}</TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Paper>
  );
};

export default StocksHistory;
