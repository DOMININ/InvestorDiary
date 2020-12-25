import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usePopupStyles from "./theme";
import { Box, Grid, Typography } from "@material-ui/core";
import logoSuccess from "../../img/success.png";
const classNames = require("classnames");

const Popup: React.FC = () => {
  const classes = usePopupStyles();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={classNames(classes.container, {
        [classes.enter]: mounted,
      })}
    >
      <Grid container className={classes.grid}>
        <Box boxShadow={3} borderRadius="20px" className={classes.box}>
          <img src={logoSuccess} alt="Успешно" className={classes.imgSuccess} />
          <Typography
            variant="h4"
            component="h5"
            className={classes.typography}
          >
            Регистрация прошла успешно!
            {/*TODO: удалить Router*/}
          </Typography>
          <Link to="/auth" className={classes.link}>
            Вернуться к авторизации
          </Link>
        </Box>
      </Grid>
    </div>
  );
};

export default Popup;
