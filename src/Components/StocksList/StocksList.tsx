import React, { useContext, useState } from "react";
import { useHttp } from "../../hooks/useHttp";
import { AuthContext } from "../../context/AuthContext";
import {
  Button,
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

const StocksList: React.FC = () => {
  const classes = useStocksListStyles();
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [stocks, setStocks] = useState<[]>([]);
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchStocks = async () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      try {
        const fetched = await request("GET", "api/stock", null, {
          authorization: `Bearer ${token}`,
        });
        setStocks(fetched.data);
      } catch (e) {}
    }
  };

  return (
    <Paper className={classes.paper}>
      <TableContainer component={Container}>
        <Button variant="contained" color="primary" onClick={fetchStocks}>
          {!isOpen || loading ? "Показать историю покупок" : "Скрыть"}
        </Button>
        {!loading && isOpen && (
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

export default StocksList;
