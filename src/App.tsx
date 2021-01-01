import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import useRoutes from "./routes";
import { useAuth } from "./hooks/useAuth";
import { AuthContext } from "./context/AuthContext";
import Header from "./Components/Header/Header";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/reducers";
import { switchTheme } from "./redux/actions";

const App: React.FC = () => {
  const { token, userId, login, logout } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  const darkThemeObj = useSelector((state: RootState) => state.isDarkTheme);
  const { isDarkTheme } = darkThemeObj;
  const dispatch = useDispatch();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(`theme${userId}`) || `false`);

    if (data) {
      dispatch(switchTheme(data.value));
    }
  }, [userId, dispatch]);

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

  return (
    <AuthContext.Provider
      value={{ token, userId, login, logout, isAuthenticated }}
    >
      <Router>
        {isAuthenticated ? (
          <MuiThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
            <div>
              <Header />
              {routes}
            </div>
          </MuiThemeProvider>
        ) : (
          <div>{routes}</div>
        )}
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
