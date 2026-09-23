import { useState } from "react";

function Logs() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const logs = [
    {
      id: 1,
      type: "Prompt Injection",
      user: "user01",
      status: "Blocked",
      severity: "High",
      time: "10:30 AM",
    },
    {
      id: 2,
      type: "Normal Request",
      user: "user02",
      status: "Allowed",
      severity: "Low",
      time: "10:42 AM",
    },
    {
      id: 3,
      type: "Sensitive Data",
      user: "user03",
      status: "Masked",
      severity: "Medium",
      time: "11:05 AM",
    },
    {
      id: 4,
      type: "Jailbreak Attempt",
      user: "user04",
      status: "Blocked",
      severity: "High",
      time: "11:20 AM",
    },
  ];

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.type.toLowerCase().includes(search.toLowerCase()) ||
      log.user.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || log.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="page">
      <h1>Security Logs</h1>

      <p>
        Monitor AI security events and detected threats.
      </p>

      {/* Security Summary Cards */}
      <div className="log-summary">
        <div className="log-card">
          <h3>Total Events</h3>
          <p>{logs.length}</p>
        </div>

        <div className="log-card">
          <h3>Blocked</h3>
          <p>
            {logs.filter((log) => log.status === "Blocked").length}
          </p>
        </div>

        <div className="log-card">
          <h3>Masked</h3>
          <p>
            {logs.filter((log) => log.status === "Masked").length}
          </p>
        </div>

        <div className="log-card">
          <h3>High Severity</h3>
          <p>
            {logs.filter((log) => log.severity === "High").length}
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="log-controls">
        <input
          type="text"
          placeholder="Search logs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Blocked">Blocked</option>
          <option value="Allowed">Allowed</option>
          <option value="Masked">Masked</option>
        </select>
      </div>

      {/* Security Logs Table */}
      <table className="logs-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Threat Type</th>
            <th>User</th>
            <th>Status</th>
            <th>Severity</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {filteredLogs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.type}</td>
              <td>{log.user}</td>

              {/* Status Badge */}
              <td>
                <span
                  className={`status-badge ${log.status.toLowerCase()}`}
                >
                  {log.status}
                </span>
              </td>

              {/* Severity Badge */}
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

      {filteredLogs.length === 0 && (
        <p>No matching security logs found.</p>
      )}
    </div>
  );
}

export default Logs;