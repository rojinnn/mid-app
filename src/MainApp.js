import React, { useEffect } from "react";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./containers/Login";
import { useAuth } from "./context/UserContext";

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
        <Route path="/" element={<App />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainApp;
