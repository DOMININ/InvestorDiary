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

const tableTitles = ["Дивиденды"];

const ProfitAdd: React.FC = () => {
  const classes = useProfitGetStyles();
  const [stocks, setStocks] = useState<object[]>([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);

  const sumTotalProfit = (stocks: any) => {
    const total = stocks.reduce((acc: any, obj: any) => {
      return acc + obj.profit;
    }, 0);

    setTotalProfit(total);
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
          <Typography variant="h5" component="h6">
            Итого: {totalProfit}
          </Typography>
        </div>
      </Container>
    </Paper>
  );
};

export default ProfitAdd;
