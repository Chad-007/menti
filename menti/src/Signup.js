import React, { useState } from "react";
import axios from "axios";
function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const signup = async () => {
    try {
      await axios.post("http://localhost:4000/signup", { username, password });
      alert("Signup successful! Go login.");
    } catch (err) {
      alert(err.response?.data?.message || "Signup error");
    }
  };
  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} /><br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br />
      <button onClick={signup}>Signup</button>
    </div>
  );
}
export default Signup;
