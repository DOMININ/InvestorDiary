import { makeStyles } from "@material-ui/core";

const useProfitGetStyles = makeStyles(() => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 30,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    marginBottom: 15,
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default useProfitGetStyles;
