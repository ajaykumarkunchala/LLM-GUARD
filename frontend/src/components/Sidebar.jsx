import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Sidebar() {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <aside className="sidebar">
      <h2>LLM-Guard</h2>

      <p>
        Welcome, {user.username}
      </p>

      <p>
        Role: <strong>{user.role}</strong>
      </p>

      <nav>
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/logs">Security Logs</Link>

        {user.role === "Admin" && (
          <Link to="/users">Users</Link>
        )}
      </nav>
      {user.role === "Admin" && (
  <Link to="/activity-logs">Activity Logs</Link>
)}

      <button onClick={logout}>
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;