import React, { useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  Button,
  IconButton,
  Box,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { Link } from "react-router-dom";
import useAuthStyles from "./theme";

interface IUser {
  email: string;
  password: string;
}

const Auth: React.FC = () => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [form, setForm] = useState<IUser>({ email: "", password: "" });
  const classes = useAuthStyles();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form action="">
      <Grid container className={classes.grid}>
        <Box boxShadow={3} borderRadius="borderRadius" className={classes.box}>
          <Typography
            variant="h4"
            component="h5"
            className={classes.typography}
          >
            Вход в личный кабинет
          </Typography>
          <TextField
            label="Почта"
            name="email"
            className={classes.textField}
            InputProps={{
              classes: {
                input: classes.emailInput,
              },
            }}
            onChange={changeHandler}
            fullWidth={true}
            type="email"
            autoFocus={true}
          />
          <div className={classes.passwordDiv}>
            <TextField
              label="Пароль"
              name="password"
              className={classes.textField}
              InputProps={{
                classes: {
                  input: classes.passwordInput,
                },
              }}
              onChange={changeHandler}
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
            <Link to="/registry" className={classes.link}>
              Регистрация
            </Link>
          </div>
        </Box>
      </Grid>
    </form>
  );
};

export default Auth;
