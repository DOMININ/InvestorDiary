import React, { useCallback, useContext, useEffect, useState } from "react";
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
import useStockInfoStyles from "./theme";
import { useHttp } from "../../hooks/useHttp";
import { AuthContext } from "../../context/AuthContext";

const StockInfo: React.FC = () => {
  const classes = useStockInfoStyles();
  const [stocks, setStocks] = useState<any[]>([]);
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);

  const containsObject = (obj: any, list: any) => {
    for (let i = 0; i < list.length; i++) {
      if (JSON.stringify(list[i].ticker) === JSON.stringify(obj.ticker)) {
        return true;
      }
    }

    return false;
  };

  const sumStocks = useCallback((stocks: []) => {
    let iterObj: any;
    let arrObj: any[] = [];
    let newStocks = [...stocks];

    for (iterObj of newStocks) {
      if (containsObject(iterObj, arrObj)) {
        for (let i = 0; i < arrObj.length; i++) {
          if (
            JSON.stringify(arrObj[i].ticker) === JSON.stringify(iterObj.ticker)
          ) {
            arrObj[i].price += iterObj.price;
            arrObj[i].qty += iterObj.qty;
          }
        }
      } else {
        arrObj = [...arrObj, iterObj];
      }
    }

    for (let iterObj of arrObj) {
      if (containsObject(iterObj, arrObj)) {
        let countIdentical = newStocks.filter(
          (obj: any) =>
            JSON.stringify(obj.ticker) === JSON.stringify(iterObj.ticker)
        );
        for (let i = 0; i < arrObj.length; i++) {
          if (
            JSON.stringify(arrObj[i].ticker) === JSON.stringify(iterObj.ticker)
          ) {
            arrObj[i].price = +(
              arrObj[i].price / countIdentical.length
            ).toFixed(2);
          }
        }
      }
    }
    setStocks(arrObj);
  }, []);

  const fetchStocks = useCallback(async () => {
    try {
      const fetched = await request("GET", "api/stock", null, {
        authorization: `Bearer ${token}`,
      });

      sumStocks(fetched.data);
    } catch (e) {}
  }, [request, sumStocks, token]);

  useEffect(() => {
    fetchStocks();
  }, [fetchStocks]);

  return (
    <Paper className={classes.paper}>
      <TableContainer component={Container}>
        {!loading && (
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell align="center">Тикер</TableCell>
                <TableCell align="center">Количество (всего)</TableCell>
                <TableCell align="center">Цена покупки (средняя)</TableCell>
                <TableCell align="center">Валюта</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Paper>
  );
};

export default StockInfo;
