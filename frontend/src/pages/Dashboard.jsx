import UserHeader from "../components/UserHeader";
import { useAuth } from "../AuthContext";
import { securityLogs } from "../data/securityLogs";
import ApiStatus from "../components/ApiStatus";

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

  const allowedEvents = securityLogs.filter(
    (log) => log.status === "Allowed"
  ).length;

  const maskedEvents = securityLogs.filter(
    (log) => log.status === "Masked"
  ).length;

  return (
    <div className="page">
      <h1>Security Dashboard</h1>

      {/* Logged-in User Header */}
      <UserHeader />

      {/* Backend API Status */}
      <ApiStatus />

      {/* RBAC Access Summary */}
      {user && (
        <div className="access-summary">
          <h2>Access Summary</h2>

          <div className="access-details">
            <div>
              <strong>Role</strong>
              <span>{user.role}</span>
            </div>

            <div>
              <strong>Dashboard</strong>
              <span>Allowed</span>
            </div>

            <div>
              <strong>Security Logs</strong>
              <span>Allowed</span>
            </div>

            <div>
              <strong>User Management</strong>
              <span>
                {user.role === "Admin"
                  ? "Allowed"
                  : "Admin Only"}
              </span>
            </div>

            <div>
              <strong>Activity Logs</strong>
              <span>
                {user.role === "Admin"
                  ? "Allowed"
                  : "Admin Only"}
              </span>
            </div>
          </div>
        </div>
      )}

      <p>
        Monitor AI security activity and detected threats.
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

      {/* Security Event Distribution */}
      <div className="threat-distribution">
        <h2>Security Event Distribution</h2>

        <div className="distribution-cards">
          <div className="distribution-card">
            <h3>Blocked</h3>
            <p>{blockedEvents}</p>
            <span>Threats blocked</span>
          </div>

          <div className="distribution-card">
            <h3>Allowed</h3>
            <p>{allowedEvents}</p>
            <span>Requests allowed</span>
          </div>

          <div className="distribution-card">
            <h3>Masked</h3>
            <p>{maskedEvents}</p>
            <span>Data protected</span>
          </div>
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