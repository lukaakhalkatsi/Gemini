import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ContextProvider from "./context/Context.jsx";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ContextProvider>
      <Toaster />
      <App />
    </ContextProvider>
  </AuthContextProvider>
);
