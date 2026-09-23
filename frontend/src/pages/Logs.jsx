import { useState } from "react";
import { securityLogs } from "../data/securityLogs";

function Logs() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredLogs = securityLogs.filter((log) => {
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
          <p>{securityLogs.length}</p>
        </div>

        <div className="log-card">
          <h3>Blocked</h3>
          <p>
            {
              securityLogs.filter(
                (log) => log.status === "Blocked"
              ).length
            }
          </p>
        </div>

        <div className="log-card">
          <h3>Masked</h3>
          <p>
            {
              securityLogs.filter(
                (log) => log.status === "Masked"
              ).length
            }
          </p>
        </div>

        <div className="log-card">
          <h3>High Severity</h3>
          <p>
            {
              securityLogs.filter(
                (log) => log.severity === "High"
              ).length
            }
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