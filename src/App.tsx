import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import useRoutes from "./routes";
import { useAuth } from "./hooks/useAuth";
import { AuthContext } from "./context/AuthContext";
import Header from "./Components/Header/Header";

const App: React.FC = () => {
  const { token, userId, login, logout } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  //TODO: заменить контекст на редакс
  return (
    <AuthContext.Provider
      value={{ token, userId, login, logout, isAuthenticated }}
    >
      <Router>
        {isAuthenticated ? (
          <div>
            <Header />
            {routes}
          </div>
        ) : (
          <div>{routes}</div>
        )}
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
