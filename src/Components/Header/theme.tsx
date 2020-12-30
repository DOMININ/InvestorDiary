import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    menuProfile: {
      fontSize: "1rem",
      fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: "0.0075em",
    },
    link: {
      textDecoration: "none",
      color: "inherit",
    },
  })
);

export default useHeaderStyles;
