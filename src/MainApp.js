import React from "react";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./containers/Login";
import { useAuth } from "./context/UserContext";

const MainApp = () => {
  const {
    data: { user },
  } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        {!user && <Route path="/" element={<Login />} />}
        <Route path="/" element={<App />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainApp;
