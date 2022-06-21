import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./context/ContextProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <ContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </ContextProvider>,
  document.getElementById("root")
);
