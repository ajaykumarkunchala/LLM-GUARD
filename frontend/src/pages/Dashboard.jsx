import { useAuth } from "../AuthContext";
import { securityLogs } from "../data/securityLogs";

function Dashboard() {
  const { user } = useAuth();

  const totalEvents = securityLogs.length;

  const blockedEvents = securityLogs.filter(
    (log) => log.status === "Blocked"
  ).length;

  const highSeverityEvents = securityLogs.filter(
    (log) => log.severity === "High"
  ).length;

  const activeUsers = new Set(
    securityLogs.map((log) => log.user)
  ).size;

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

      {/* Dashboard Statistics */}
      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Events</h3>
          <p>{totalEvents}</p>
        </div>

        <div className="card">
          <h3>Blocked Events</h3>
          <p>{blockedEvents}</p>
        </div>

        <div className="card">
          <h3>High Severity</h3>
          <p>{highSeverityEvents}</p>
        </div>

        <div className="card">
          <h3>Active Users</h3>
          <p>{activeUsers}</p>
        </div>
      </div>

      {/* Recent Security Activity */}
      <div className="recent-activity">
        <h2>Recent Security Activity</h2>

        <table className="logs-table">
          <thead>
            <tr>
              <th>Threat Type</th>
              <th>User</th>
              <th>Status</th>
              <th>Severity</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {securityLogs.map((log) => (
              <tr key={log.id}>
                <td>{log.type}</td>
                <td>{log.user}</td>
                <td>
                  <span
                    className={`status-badge ${log.status.toLowerCase()}`}
                  >
                    {log.status}
                  </span>
                </td>
                <td>
                  <span
                    className={`severity-badge ${log.severity.toLowerCase()}`}
                  >
                    {log.severity}
                  </span>
                </td>
                <td>{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;