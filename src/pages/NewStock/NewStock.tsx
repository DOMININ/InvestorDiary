import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useGetStock } from "../../hooks/useGetStock";
import { useHttp } from "../../hooks/useHttp";
import { AuthContext } from "../../context/AuthContext";
import moment from "moment";
import useNewStockStyles from "./theme";

const currencies = [
  {
    value: "RUB",
    label: "₽",
  },
];

interface IStocks {
  ticker: string;
  name: string;
  qty: number | null;
  price: number | null;
  currency: string;
  date: string;
}

const initialFormState: IStocks = {
  ticker: "",
  name: "",
  qty: null,
  price: null,
  currency: "",
  date: "",
};

const NewStock: React.FC = () => {
  const classes = useNewStockStyles();
  const [ticker, setTicker] = useState<string>("");
  const [currency, setCurrency] = useState<string>("RUB");
  const [stockName, setStockName] = useState<string>("");
  const [form, setForm] = useState<IStocks>(initialFormState);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );
  const { requestStockAPI } = useGetStock();
  const { request } = useHttp();
  const auth = useContext(AuthContext);

  const changeDateHandler = (date: Date | null) => {
    setSelectedDate(date);
    setForm({ ...form, date: moment(date).format("DD.MM.YYYY") });
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
      [e.target.name]: +e.target.value,
    });
  };

  const resetForm = () => {
    setStockName("");
    setTicker("");
    setCurrency("RUB");
    setSelectedDate(new Date());
    setForm(initialFormState);
  };

  const sendStock = async () => {
    try {
      await request(
        "POST",
        "api/stock/new",
        { ...form },
        { authorization: `Bearer ${auth.token}` }
      );
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
    <Paper className={classes.paper}>
      <Container>
        <Typography variant="h4" component="h5" className={classes.title}>
          Добавление новой акции
        </Typography>
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
        </div>
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
                helperText="Введите общую цену"
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
            <Button
              variant="contained"
              color="secondary"
              className={classes.buttonReset}
              onClick={resetForm}
            >
              Отменить
            </Button>
          </>
        )}
      </Container>
    </Paper>
  );
};

export default NewStock;
