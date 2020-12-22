import { makeStyles } from "@material-ui/core";

const useAuthStyles = makeStyles(() => ({
  typography: {
    marginBottom: "10px",
  },
  grid: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    minHeight: "60vh",
  },
  box: {
    padding: "50px",
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
  link: {
    fontSize: "24px",
  },
  button: {
    fontSize: "16px",
    paddingRight: "30px",
    paddingLeft: "30px",
    textTransform: "none",
  },
  icon: {
    position: "absolute",
    right: 0,
    top: "17px",
    padding: "6px",
  },
}));

export default useAuthStyles;
