import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </Router>
  </React.StrictMode>
);
