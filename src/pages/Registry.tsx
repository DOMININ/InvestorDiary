import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";

const useStyles = makeStyles(() => ({
  typography: {
    marginBottom: "10px",
  },
  grid: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    minHeight: "75vh",
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
  button: {
    fontSize: "20px",
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

const Registry: React.FC = () => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const classes = useStyles();

  return (
    <form action="">
      <Grid container className={classes.grid}>
        <Box boxShadow={3} borderRadius="borderRadius" className={classes.box}>
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
