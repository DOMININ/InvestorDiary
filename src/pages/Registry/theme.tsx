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
    paddingTop: "25px",
    paddingBottom: "25px",
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
    marginTop: "15px",
    display: "flex",
    flexDirection: "column",
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
  link: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    marginTop: "15px",
    paddingTop: "5px",
    paddingBottom: "5px",
    display: "flex",
    width: "100%",
    fontSize: "18px",
    justifyContent: "space-around",
    border: "1px solid",
    borderColor: "#3f51b5",
    color: "#3f51b5",
    borderRadius: "4px",
    textDecoration: "none",
    "&:hover": {
      transition: "0.4s",
      background: "#3f51b5",
      color: "#fff",
    },
  },
  linkDisabled: {
    pointerEvents: "none",
    cursor: "default",
    color: "#a6a6a6",
    borderColor: "#e0e0e0",
  },
  icon: {
    position: "absolute",
    right: 0,
    top: "17px",
    padding: "6px",
  },
}));

export default useRegistryStyles;
