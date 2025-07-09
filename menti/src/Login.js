import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = async () => {
    try {
      await axios.post("http://localhost:4000/login", { username, password });
      navigate("/vote");
    } catch (err) {
      alert(err.response?.data?.message || "Login error");
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} /><br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br />
      <button onClick={login}>Login</button>
    </div>
  );
}
export default Login;
