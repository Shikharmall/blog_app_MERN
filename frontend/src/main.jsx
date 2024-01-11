import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeProvider from "./utils/ThemeContext";
import App from "./App";
import AuthContextProvider from "./components/context/AuthContext/AuthContext";
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CookiesProvider>
    <AuthContextProvider>
      <Router>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Router>
    </AuthContextProvider>
  </CookiesProvider>
);
