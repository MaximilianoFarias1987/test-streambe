import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button, Container } from "@mui/material";
import { NavBar } from "./common/NavBar";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./Router";
import { NotificationProvider } from "./context/notification";
import { AuthProvider } from "./auth";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
