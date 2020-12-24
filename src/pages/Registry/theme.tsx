import { makeStyles } from "@material-ui/core";

const useRegistryStyles = makeStyles(() => ({
  typography: {
    marginBottom: "10px",
  },
  grid: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: "35px",
  },
  box: {
    padding: "50px",
    width: "27%",
  },
  textField: {
    marginBottom: "20px",
  },
  emailInput: {
    fontSize: "22px",
  },
  passwordInput: {
    fontSize: "22px",
    paddingRight: "44px",
  },
  passwordDiv: {
    display: "flex",
    position: "relative",
  },
  buttonsDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    fontSize: "20px",
    paddingRight: "30px",
    paddingLeft: "30px",
    textTransform: "none",
    width: "100%",
  },
  icon: {
    position: "absolute",
    right: 0,
    top: "17px",
    padding: "6px",
  },
}));

export default useRegistryStyles;
