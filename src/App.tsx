import React from "react";
import Auth from "./pages/Auth";
import Registry from "./pages/Registry";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <Route path="/auth" component={Auth} />
      <Route path="/registry" component={Registry} />
      <Redirect from="/" to="/auth" />
    </Router>
  );
};

export default App;
