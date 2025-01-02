import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import ModalContextProvider from "./context/modalContext";
import "core-js/actual/promise";
import "core-js/actual/set";
import "core-js/actual/iterator";
import "core-js/actual/array/from";
import "core-js/actual/array/flat-map";
import "core-js/actual/structured-clone";
const root = ReactDOM.createRoot(document.getElementById("root"));
const env = process.env.NODE_ENV;
if (env === "development") {
} else if (env === "production") {
  console.log = function () {};
  console.error = function () {};
}
root.render(
  process.env.REACT_APP_MINIAPP == "1" ? (
    window?.Telegram?.WebApp?.initData ? (
      <BrowserRouter>
        <ModalContextProvider>
          <App />
        </ModalContextProvider>
      </BrowserRouter>
    ) : (
      <div style={{ fontStyle: "normal", fontWeight: "bold", fontSize: 20 }}>
        Please use this app on Telegram
      </div>
    )
  ) : (
    <BrowserRouter>
      <ModalContextProvider>
        <App />
      </ModalContextProvider>
    </BrowserRouter>
  )
);
reportWebVitals();
