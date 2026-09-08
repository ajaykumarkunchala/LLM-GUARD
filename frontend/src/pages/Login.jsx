import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("Analyst");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username.trim()) {
      alert("Please enter username");
      return;
    }

    login(username, role);
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>LLM-Guard</h1>

        <p>Security Dashboard Login</p>

        <form onSubmit={handleLogin}>
          <label>Username</label>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Role</label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Admin">Admin</option>
            <option value="Analyst">Analyst</option>
          </select>

          <button type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;