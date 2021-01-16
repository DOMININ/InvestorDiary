import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/useHttp";
import { AuthContext } from "../../context/AuthContext";
import {
  Container,
  Paper,
  TableContainer,
  Typography,
} from "@material-ui/core";
import useStocksListStyles from "../StockInfo/theme";
import StockTable from "../../Components/StockTable/StockTable";

const tableTitles = [
  "Тикер",
  "Количество",
  "Цена покупки",
  "Валюта",
  "Дата покупки",
];

const StocksHistory: React.FC = () => {
  const classes = useStocksListStyles();
  const [stocks, setStocks] = useState<object[]>([]);
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

  if (!loading && stocks.length === 0) {
    return (
      <Paper className={classes.paper}>
        <Container>
          <Typography variant="h5" component="h6">
            Пока нет акций! Добавьте их на странице добавления акций
          </Typography>
        </Container>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <TableContainer component={Container}>
        {!loading && stocks.length !== 0 && (
          <StockTable head={tableTitles} stocks={stocks} />
        )}
      </TableContainer>
    </Paper>
  );
};

export default StocksHistory;
