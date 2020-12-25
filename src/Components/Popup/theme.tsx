import { makeStyles } from "@material-ui/core";

const usePopupStyles = makeStyles(() => ({
  container: {
    textAlign: "center",
    transform: "translateY(-100%)",
    transition: "transform 0.6s ease-in",
  },
  enter: {
    transform: "translateY(0)",
  },
  imgSuccess: {
    width: "25%",
  },
  typography: {
    marginTop: "15px",
    marginBottom: "15px",
    color: "#3f51b5",
  },
  grid: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    minHeight: "65vh",
  },
  box: {
    padding: "40px",
    width: "40%",
  },
  link: {
    fontSize: "24px",
  },
}));

export default usePopupStyles;
