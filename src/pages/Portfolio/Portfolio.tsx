import React, { useCallback, useContext, useEffect, useState } from "react";
import PieChartPrice from "../../Components/PieChartPrice/PieChartPrice";
import { useHttp } from "../../hooks/useHttp";
import { AuthContext } from "../../context/AuthContext";
import { Container, Divider, Grid, Paper, Typography } from "@material-ui/core";
import usePortfolioStyles from "./theme";
import PortfolioTable from "../../Components/PortfolioTable/PortfolioTable";

const tableTitles = ["Цена покупки"];

const Portfolio: React.FC = () => {
  const [stocks, setStocks] = useState<any[]>([]);
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);
  const classes = usePortfolioStyles();

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
      delete iterObj["date"];
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
      <Container>
        {!loading && stocks.length === 0 && (
          <Typography variant="h5" component="h6">
            Пока нет акций! Добавьте их на странице добавления акций
          </Typography>
        )}
        {!loading && stocks.length !== 0 && (
          <>
            <Typography variant="h4" component="h5">
              График стоимости акций
            </Typography>
            <Grid
              container
              justify="center"
              spacing={2}
              className={classes.grid}
            >
              <Grid>
                <PieChartPrice stocks={stocks} />
              </Grid>
              <Divider />
              <Grid className={classes.table}>
                <PortfolioTable head={tableTitles} stocks={stocks} />
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </Paper>
  );
};

export default Portfolio;
