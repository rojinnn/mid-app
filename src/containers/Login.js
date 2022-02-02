import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      <button onClick={handleLogin}>
        <span>login</span>
      </button>
    </div>
  );
};

export default Login;
