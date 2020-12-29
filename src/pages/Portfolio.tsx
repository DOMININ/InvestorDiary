import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Card, createMuiTheme, MuiThemeProvider } from "@material-ui/core";

const Portfolio: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<Boolean>(false);
  const auth = useContext(AuthContext);

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  const lightTheme = createMuiTheme({
    palette: {
      background: {
        paper: "#e2e2e2",
      },
    },
  });

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem(`theme${auth.userId}`) || `${isDarkTheme}`
    );

    if (data) {
      setIsDarkTheme(data.value);
    }
  }, [isDarkTheme, auth.userId]);

  const setThemeHandler = () => {
    setIsDarkTheme(!isDarkTheme);
    localStorage.setItem(
      `theme${auth.userId}`,
      JSON.stringify({ value: !isDarkTheme })
    );
  };

  const logoutHandler = () => {
    auth.logout();
  };

  return (
    <MuiThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Card>
        <button onClick={setThemeHandler}>Сменить тему</button>
        <button onClick={logoutHandler}>Выйти</button>
      </Card>
    </MuiThemeProvider>
  );
};

export default Portfolio;
