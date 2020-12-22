import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import Expenses from "./pages/Expenses";
import Auth from "./pages/Auth";
import Registry from "./pages/Registry";

const useRoutes = (isAuthenticated: Boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/expenses" component={Expenses} />
        <Redirect to="/portfolio" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/registry" component={Registry} />
      <Redirect to="/auth" />
    </Switch>
  );
};

export default useRoutes;