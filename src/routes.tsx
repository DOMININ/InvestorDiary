import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Portfolio from "./pages/Portfolio/Portfolio";
import Auth from "./pages/Auth/Auth";
import Registry from "./pages/Registry/Registry";
import Settings from "./pages/Settings/Settings";
import NewStock from "./pages/NewStock/NewStock";
import StocksHistory from "./pages/StocksHistory/StocksHistory";
import StockInfo from "./pages/StockInfo/StockInfo";

const useRoutes = (isAuthenticated: Boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/new" component={NewStock} />
        <Route path="/info" component={StockInfo} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/history" component={StocksHistory} />
        <Route path="/settings" component={Settings} />
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
