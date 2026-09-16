import { useAuth } from "../AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="page">
      <h1>Security Dashboard</h1>

      {user && (
        <div className="user-info">
          <h3>Current User</h3>
          <p>
            Username: <strong>{user.username}</strong>
          </p>
          <p>
            Role: <strong>{user.role}</strong>
          </p>
        </div>
      )}

      <p>
        Monitor AI security activity and threats.
      </p>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Requests</h3>
          <p>1,250</p>
        </div>

        <div className="card">
          <h3>Blocked Prompts</h3>
          <p>120</p>
        </div>

        <div className="card">
          <h3>Threats Detected</h3>
          <p>85</p>
        </div>

        <div className="card">
          <h3>Active Users</h3>
          <p>12</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;