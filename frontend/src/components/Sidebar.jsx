import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>LLM-Guard</h2>

      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/logs">Security Logs</Link>
        <Link to="/users">Users</Link>
      </nav>
    </aside>
  );
}

export default Sidebar;