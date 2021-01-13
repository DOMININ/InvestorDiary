import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const usePortfolioStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: "flex",
      flexDirection: "column",
      marginBottom: 30,
      paddingTop: 20,
      paddingBottom: 20,
    },
    grid: {
      justifyContent: "space-around",
    },
    table: {
      display: "flex",
      alignItems: "center",
    },
  })
);

export default usePortfolioStyles;
