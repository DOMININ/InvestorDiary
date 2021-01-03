import React, { useContext, useEffect, useRef, useState } from "react";
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
import { useHttp } from "../../hooks/useHttp";
import { AuthContext } from "../../context/AuthContext";

interface IUser {
  email: string;
  password: string;
}

const Auth: React.FC = () => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [form, setForm] = useState<IUser>({ email: "", password: "" });
  const [fieldError, setFieldError] = useState<IUser>({
    email: "",
    password: "",
  });
  const { email, password } = fieldError;
  const { request, error } = useHttp();
  const auth = useContext(AuthContext);
  const classes = useAuthStyles();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (error) {
        const newErrorFields = error?.reduce((prev: any, curr: any) => {
          prev[curr.param] = curr.msg;
          return prev;
        }, {});
        setFieldError(newErrorFields);
      }
    }
  }, [error]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    try {
      const response = await request("POST", "/api/auth/login", { ...form });
      auth.login(response.data.token, response.data.userId);
    } catch (e) {}
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
            helperText={email ? email : ""}
            error={!!email}
            onChange={changeHandler}
            fullWidth={true}
            type="email"
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
              helperText={password ? password : ""}
              error={!!password}
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
              onClick={loginHandler}
              disabled={!form.email || !form.password}
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
