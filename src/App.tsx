import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import useRoutes from "./routes";
import { useAuth } from "./hooks/useAuth";
import { AuthContext } from "./context/AuthContext";
import Header from "./Components/Header/Header";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

const App: React.FC = () => {
  const { token, userId, login, logout } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

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
          //TODO: true заменить на редакс
          <MuiThemeProvider theme={true ? darkTheme : lightTheme}>
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
