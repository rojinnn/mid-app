import React, { useEffect } from "react";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./containers/Login";
import { useAuth } from "./context/UserContext";
import Register from "./containers/Register";
import {Provider, useDispatch, useSelector } from 'react-redux';
import store from "./store/store";
import NotFound from "./NotFound";
import { loginSuccessActionn } from "./store/reducers/userSlice";
 
const MainApp = () => {
  // const {
  //   data: { user },
  //   loadUser
  // } = useAuth();

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    try{
    const userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn'));
    if(!!userLoggedIn) {
      dispatch(loginSuccessActionn(userLoggedIn))
      // loadUser(userLoggedIn);
    }
    }catch(err) {
      console.log(err, 'not found!');
    }
  },[]);
  return (
    // <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {!user && <Route path="/" element={<Login />} />}
        {!user && <Route path="/register" element={<Register />} />}
        {!user && <Route path="*" element={<NotFound />} />}
        <Route path="*" element={<App />} />
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
    // </Provider>
  );
};

export default MainApp;
