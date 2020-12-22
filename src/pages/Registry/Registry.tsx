import React, { useState } from "react";
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
import useRegistryStyles from "./theme";

const Registry: React.FC = () => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const classes = useRegistryStyles();

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
            autoFocus={true}
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
              Зарегистрироваться
            </Button>
          </div>
        </Box>
      </Grid>
    </form>
  );
};

export default Registry;
