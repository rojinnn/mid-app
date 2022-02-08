import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { login as loginApi } from "../apis";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const {
    data,
    loadUser,
    login: loginAction,
    loginSuccess,
    loginError,
  } = useAuth();

  const handleLogin = (e) => {
    if (username === "anisha" && password === "anisha123") {
      loadUser({ username });
    }
  };

  const getMemes = async () => {
    try {
      const response = await axios({
        url: "https://api.imgflip.com/get_memes",
        method: "GET",
      });
      console.log(response);
    } catch (err) {
      console.log(err, "error");
    }
  };

  const login = async (e) => {
    try {
      loginAction();
      const res = await loginApi({
        userName: username,
        password,
        userRole: "ADMIN",
      });
      if (res.status === 200) {
        loginSuccess(res.data);
        console.log("login sucessful");
      }
      // const
    } catch (err) {
      console.log(err, "err");
      loginError(err);
    }
  };
  const onClickButton = (e) => {
    getMemes();
  };
  useEffect(() => {
    getMemes();
  }, []);

  return (
    <div className="">
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <input
        type={show ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={(e) => setShow(!show)}>
        <span>{show ? "hide" : "show"}</span>
      </button>
      <button onClick={login}>
        <span>{data.loggingIn ? "loggging In..." : "login"}</span>
      </button>
      <button onClick={onClickButton}>
        <span>Get Memes</span>
      </button>
      <Link to="/register">
        <span> Register</span>
      </Link>
      <span>{data.loginError && "ERRROR"}</span>
    </div>
  );
};

export default Login;
