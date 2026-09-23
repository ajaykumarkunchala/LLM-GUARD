import { useAuth } from "../AuthContext";

function Dashboard() {
  const { user } = useAuth();

  const logs = [
    {
      id: 1,
      status: "Blocked",
      severity: "High",
    },
    {
      id: 2,
      status: "Allowed",
      severity: "Low",
    },
    {
      id: 3,
      status: "Masked",
      severity: "Medium",
    },
    {
      id: 4,
      status: "Blocked",
      severity: "High",
    },
  ];

  const totalEvents = logs.length;

  const blockedEvents = logs.filter(
    (log) => log.status === "Blocked"
  ).length;

  const highSeverityEvents = logs.filter(
    (log) => log.severity === "High"
  ).length;

  const activeUsers = new Set(
    ["user01", "user02", "user03", "user04"]
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
    </div>
  );
}

export default Dashboard;