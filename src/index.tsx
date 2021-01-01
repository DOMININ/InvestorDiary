import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./normalize.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "./redux/reducers";

const store = createStore(
  allReducers,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
