import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout) {
      logout();
      navigate("/login");
    }
  };

  return (
    <aside className="sidebar">
      <h2>LLM-Guard</h2>

      <p>
        Welcome, <strong>{user.username}</strong>
      </p>

      <p>
        Role: <strong>{user.role}</strong>
      </p>

      <nav>
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/logs">Security Logs</Link>

        {user.role === "Admin" && (
          <>
            <Link to="/users">Users</Link>
            <Link to="/activity-logs">Activity Logs</Link>
          </>
        )}
      </nav>

      <button onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;