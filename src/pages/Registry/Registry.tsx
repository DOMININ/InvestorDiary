import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useHttp } from "../../hooks/useHttp";
import useRegistryStyles from "../Registry/theme";
import { useHistory } from "react-router-dom";

interface IUser {
  email: string;
  password: string;
}

const Registry: React.FC = () => {
  const classes = useRegistryStyles();
  console.log(classes);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [form, setForm] = useState<IUser>({ email: "", password: "" });
  const [fieldError, setFieldError] = useState<IUser>({
    email: "",
    password: "",
  });
  const { request, error, loading } = useHttp();
  const isInitialMount = useRef(true);
  const history = useHistory();

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
    setFieldError({ ...fieldError, [e.target.name]: "" });
  };

  const registerHandler = async () => {
    try {
      const response = await request("POST", "/api/auth/register", { ...form });
      if (response.status === 201) {
        //TODO: тут добавить попап об успешной регистрации
        alert("Пользователь создан");
        history.push("/auth");
      }
    } catch (e) {}
  };

  const { email, password } = fieldError;

  return (
    <form action="">
      <Grid container className={classes.grid}>
        <Box
          boxShadow={3}
          width="25%"
          borderRadius="borderRadius"
          className={classes.box}
        >
          <Typography
            variant="h4"
            component="h5"
            className={classes.typography}
          >
            Регистрация нового пользователя
          </Typography>
          <TextField
            label="Фамилия"
            className={classes.textField}
            InputProps={{
              classes: {
                input: classes.emailInput,
              },
            }}
            fullWidth={true}
            type="text"
          />
          <TextField
            label="Имя"
            className={classes.textField}
            InputProps={{
              classes: {
                input: classes.emailInput,
              },
            }}
            fullWidth={true}
            type="text"
          />
          <TextField
            label="Почта"
            className={classes.textField}
            InputProps={{
              classes: {
                input: classes.emailInput,
              },
            }}
            helperText={email ? email : ""}
            error={!!email}
            onChange={changeHandler}
            name="email"
            fullWidth={true}
            type="email"
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
              helperText={password ? password : ""}
              error={!!password}
              onChange={changeHandler}
              name="password"
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
              fullWidth={true}
              onClick={registerHandler}
              disabled={loading?.valueOf()}
            >
              Зарегистрироваться
            </Button>
          </div>
        </Box>
      </Grid>
    </form>
  );
};

export default Registry;
