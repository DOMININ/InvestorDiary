import { makeStyles } from "@material-ui/core";

const usePortfolioStyles = makeStyles(() => ({
  paper: {
    display: "flex",
    flexDirection: "column",
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
}));

export default usePortfolioStyles;
