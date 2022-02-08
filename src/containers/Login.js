import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const { data, loadUser } = useAuth();

  const handleLogin = (e) => {
    if (username === "anisha" && password === "anisha123") {
      // navigate("/home");
      // console.log(navigate);
      loadUser({ username });
    }
  };

  const getMemes = async() => {
    try {
    const response = await axios({
      url: 'https://api.imgflip.com/get_memes',
      method: 'GET',
    });
    console.log(response);
  }catch(err) {
    console.log(err, 'error');
  }
  };

  const login = async(e) => {
    try {
      const res = await axios({
        url: 'http://167.71.226.245:3005/api/auth/login',
        method: 'POST',
        data: {
            userName: username,
            password,
            userRole: 'ADMIN',
        }
      });
      // const
      console.log(res, 'res');
      loadUser(res.data);
    }catch(err) {
      console.log(err, 'err');
    }
  };
  const onClickButton = e => {
    getMemes();
  };
  useEffect(() => {
    getMemes();
  },[]);

  return (
    <div className="">
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <input
        type={show ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={(e) => setShow(!show)}>
        <span >{show ? "hide" : "show"}</span>
      </button>
      <button onClick={login}>
        <span>login</span>
      </button>
      <button onClick={onClickButton}>
        <span>Get Memes</span>
      </button>
      <Link to="/register">
        <span> Register</span>
      </Link>
    </div>
  );
};

export default Login;
