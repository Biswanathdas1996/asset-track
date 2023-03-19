import React from "react";
import App from "./App";
import "./App.css";
import { HashRouter } from "react-router-dom";
import * as ReactDOM from "react-dom/client";

const rootElement = document.getElementById("app");
ReactDOM.createRoot(rootElement).render(
  <HashRouter>
    <App />
  </HashRouter>
);
