import { makeStyles } from "@material-ui/core";

const useNewStockStyles = makeStyles(() => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 30,
    paddingTop: 20,
    paddingBottom: 20,
  },
  tickerField: {
    width: "20%",
    marginRight: 20,
  },
  nameField: {
    width: "40%",
    marginTop: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  qtyField: {
    width: "20%",
    marginRight: 20,
    marginBottom: 20,
  },
  priceField: {
    width: "15%",
    marginRight: 20,
  },
  stockField: {
    width: "30%",
  },
  buttonSubmit: {
    marginTop: 15,
  },
  buttonReset: {
    marginLeft: 10,
  },
}));

export default useNewStockStyles;
