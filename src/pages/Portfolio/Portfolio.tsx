import React, { useContext, useEffect, useState } from "react";
import { useGetStock } from "../../hooks/useGetStock";
import {
  Button,
  Container,
  MenuItem,
  Paper,
  TextField,
} from "@material-ui/core";
import usePortfolioStyles from "./theme";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";
import { useHttp } from "../../hooks/useHttp";
import { AuthContext } from "../../context/AuthContext";

const currencies = [
  {
    value: "RUB",
    label: "₽",
  },
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

interface IStocks {
  ticker: string;
  name: string;
  qty: string;
  price: string;
  currency: string;
  date: string;
}

const initialFormState: IStocks = {
  ticker: "",
  name: "",
  qty: "",
  price: "",
  currency: "",
  date: "",
};

const Portfolio: React.FC = () => {
  const classes = usePortfolioStyles();
  const [ticker, setTicker] = useState<string>("");
  const [currency, setCurrency] = useState<string>("RUB");
  const [stockName, setStockName] = useState<string>("");
  const [form, setForm] = useState<IStocks>(initialFormState);
  const [isOpenForm, setIsOpenForm] = useState<Boolean>(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );
  const { requestStockAPI } = useGetStock();
  const { request, loading } = useHttp();
  const auth = useContext(AuthContext);

  const changeDateHandler = (date: Date | null) => {
    setSelectedDate(date);
  };

  const changeCurrencyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(e.target.value);
  };

  const changeTickerHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicker(e.target.value.toUpperCase());
  };

  const getStockName = async (ticker: string) => {
    const response = await requestStockAPI(ticker);
    setStockName(response);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setIsOpenForm(false);
    setStockName("");
    setTicker("");
    setCurrency("RUB");
    setSelectedDate(new Date());
    setForm(initialFormState);
  };

  const sendStock = async () => {
    try {
      const data = await request(
        "POST",
        "api/stock/new",
        { ...form },
        { authorization: `Bearer ${auth.token}` }
      );
      console.log(data);
    } catch (e) {}

    resetForm();
  };

  useEffect(() => {
    setForm((prev: IStocks) => ({
      ...prev,
      ticker,
      name: stockName,
      currency,
      date: moment(selectedDate).format("DD.MM.YYYY"),
    }));
  }, [ticker, stockName, currency, selectedDate]);

  return (
    <Paper elevation={3} className={classes.paper}>
      <Container>
        {!isOpenForm ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsOpenForm(true)}
          >
            Добавить новую акцию
          </Button>
        ) : (
          <div>
            <TextField
              helperText="Введите тикер. Пример: VTBE"
              variant="outlined"
              size="small"
              name="ticker"
              onChange={changeTickerHandler}
              className={classes.tickerField}
              value={ticker}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => getStockName(ticker)}
              disabled={!ticker}
            >
              Найти
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.buttonReset}
              onClick={resetForm}
            >
              Отмена
            </Button>
          </div>
        )}
        {stockName && (
          <>
            <TextField
              helperText="Название акции"
              variant="outlined"
              size="small"
              name="name"
              value={stockName}
              className={classes.nameField}
              InputProps={{
                readOnly: true,
              }}
            />
            <br />
            <TextField
              helperText="Введите количество акций"
              variant="outlined"
              type="number"
              size="small"
              name="qty"
              onChange={changeHandler}
              className={classes.qtyField}
            />
            <div>
              <TextField
                helperText="Введите цену за 1 шт."
                variant="outlined"
                type="number"
                size="small"
                name="price"
                onChange={changeHandler}
                className={classes.priceField}
              />
              <TextField
                helperText="Выберите валюту"
                select
                size="small"
                variant="outlined"
                name="currency"
                value={currency}
                onChange={changeCurrencyHandler}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd.MM.yyyy"
                margin="normal"
                helperText="Выберите дату покупки"
                name="date"
                value={selectedDate}
                onChange={changeDateHandler}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={sendStock}
              className={classes.buttonSubmit}
              disabled={!form.qty || !form.price}
            >
              Добавить
            </Button>
          </>
        )}
      </Container>
    </Paper>
  );
};

export default Portfolio;
