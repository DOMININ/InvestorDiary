import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Container,
  Paper,
  TableContainer,
  Typography,
} from "@material-ui/core";
import useProfitGetStyles from "../ProfitGet/theme";
import { useHttp } from "../../hooks/useHttp";
import { AuthContext } from "../../context/AuthContext";
import ProfitTable from "../ProfitTable/ProfitTable";
import { currency } from "../../utils/currency.json";

const tableTitles = ["Дивиденды", "Валюта", "Дата"];

interface ICurrency {
  [key: string]: number;
  RUB: number;
  USD: number;
  EUR: number;
  Other: number;
}

const ProfitAdd: React.FC = () => {
  const classes = useProfitGetStyles();
  const [stocks, setStocks] = useState<object[]>([]);
  const [totalProfit, setTotalProfit] = useState<ICurrency>({
    RUB: 0,
    USD: 0,
    EUR: 0,
    Other: 0,
  });
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);

  const sumTotalProfit = (stocks: any) => {
    let total: any = {};
    currency.forEach((curr: any) => {
      total[curr.type] = stocks.reduce((acc: any, obj: any) => {
        if (curr.type === obj.type) {
          return acc + obj.profit;
        }

        return acc;
      }, 0);

      setTotalProfit({ ...total });
    });
  };

  const getProfit = useCallback(async () => {
    try {
      const fetched = await request("GET", "api/profit", null, {
        authorization: `Bearer ${token}`,
      });

      setStocks(fetched.data);
      sumTotalProfit(fetched.data);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    getProfit();
  }, [getProfit]);

  if (!loading && stocks.length === 0) {
    return (
      <Paper className={classes.paper}>
        <Container>
          <Typography variant="h5" component="h6">
            Пока нет дивидендов и купонов!
          </Typography>
        </Container>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <Container>
        <Typography variant="h4" component="h5" className={classes.title}>
          История дохода
        </Typography>
        <div className={classes.container}>
          <TableContainer component={Container}>
            {!loading && stocks.length !== 0 && (
              <ProfitTable head={tableTitles} stocks={stocks} />
            )}
          </TableContainer>
          <div className={classes.result}>
            <Typography variant="h5" component="h6">
              Итого:
            </Typography>
            {Object.keys(totalProfit).map((currency: string) => (
              <div key={currency}>
                <b>{currency}:</b> {totalProfit[currency]}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Paper>
  );
};

export default ProfitAdd;
