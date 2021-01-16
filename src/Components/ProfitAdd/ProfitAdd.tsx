import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import useProfitAddStyles from "./theme";
import { useHttp } from "../../hooks/useHttp";
import { AuthContext } from "../../context/AuthContext";

interface IProfit {
  ticker: string;
  profit: number | null;
}

const initialFormState: IProfit = {
  ticker: "",
  profit: null,
};

const ProfitAdd: React.FC = () => {
  const classes = useProfitAddStyles();
  const [tickers, setTickers] = useState<string[]>([]);
  const [currentTicker, setCurrentTicker] = useState<string>("");
  const [form, setForm] = useState<IProfit>(initialFormState);
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);
  const auth = useContext(AuthContext);

  const fetchStocks = useCallback(async () => {
    try {
      const fetched = await request("GET", "api/stock", null, {
        authorization: `Bearer ${token}`,
      });
      return fetched.data;
    } catch (e) {}
  }, [token, request]);

  const getTicket = useCallback(async () => {
    const data = await fetchStocks();
    let tickers: string[] = [];

    data.map((el: any) => {
      if (tickers.indexOf(el.ticker) === -1) {
        tickers.push(el.ticker);
      }
      return tickers;
    });

    setTickers(tickers);
  }, [fetchStocks]);

  useEffect(() => {
    getTicket();
  }, [getTicket]);

  const changeTickerHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTicker(e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: +e.target.value,
    });
  };

  const clearForm = () => {
    setCurrentTicker("");
    setForm(initialFormState);
  };

  const sendProfit = async () => {
    try {
      await request(
        "POST",
        "api/profit/profit",
        { ...form },
        { authorization: `Bearer ${auth.token}` }
      );
    } catch (e) {}

    clearForm();
    console.log(form);
  };

  if (!loading && tickers.length === 0) {
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
    <>
      <Paper className={classes.paper}>
        <Container>
          <Typography variant="h4" component="h5" className={classes.title}>
            Добавление купонов и дивидендов
          </Typography>
          <TextField
            helperText="Выберите тикер"
            select
            size="small"
            variant="outlined"
            name="ticker"
            value={currentTicker}
            onChange={changeTickerHandler}
            className={classes.margin}
          >
            {tickers.map((el) => (
              <MenuItem key={el} value={el}>
                {el}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            helperText="Введите доход с купона"
            variant="outlined"
            type="number"
            size="small"
            name="profit"
            value={form.profit ? form.profit : ""}
            onChange={changeHandler}
            className={classes.margin}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={sendProfit}
            disabled={!form.ticker || !form.profit}
          >
            Добавить
          </Button>
        </Container>
      </Paper>
    </>
  );
};

export default ProfitAdd;
