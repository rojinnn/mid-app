import React, { useEffect } from "react";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./containers/Login";
import { useAuth } from "./context/UserContext";
import Register from "./containers/Register";

const MainApp = () => {
  const {
    data: { user },
    loadUser
  } = useAuth();

  useEffect(() => {
    try{
    const userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn'));
    if(!!userLoggedIn) {
      loadUser(userLoggedIn);
    }
    }catch(err) {
      console.log(err, 'not found!');
    }
  },[]);
  return (
    <BrowserRouter>
      <Routes>
        {!user && <Route path="/" element={<Login />} />}
        {!user && <Route path="/register" element={<Register />} />}
        <Route path="/" element={<App />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainApp;
