import React, { useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  Button,
  Link,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles(() => ({
  typography: {
    marginBottom: "10px",
  },
  grid: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    minHeight: "60vh",
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
    top: "10px",
    padding: "10px",
  },
}));

const Auth: React.FC = () => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const classes = useStyles();

  return (
    <form action="">
      <Grid container className={classes.grid}>
        <Grid xs={6}>
          <Typography
            variant="h4"
            component="h5"
            className={classes.typography}
          >
            Вход в личный кабинет
          </Typography>
          <TextField
            label="Почта"
            className={classes.textField}
            InputProps={{
              classes: {
                input: classes.emailInput,
              },
            }}
            fullWidth={true}
            type="email"
            autoFocus={true}
          />
          <div className={classes.passwordDiv}>
            <TextField
              label="Пароль"
              className={classes.textField}
              InputProps={{
                classes: {
                  input: classes.passwordInput,
                },
              }}
              fullWidth={true}
              type={visiblePassword ? "text" : "password"}
            />
            <IconButton
              className={classes.icon}
              onClick={() => setVisiblePassword(!visiblePassword)}
            >
              {visiblePassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </div>
          <div className={classes.buttonsDiv}>
            <Button
              variant="contained"
              className={classes.button}
              color="primary"
            >
              Войти
            </Button>
            <Link href="#" className={classes.link}>
              Регистрация
            </Link>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default Auth;
