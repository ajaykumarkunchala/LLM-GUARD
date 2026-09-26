import { useState } from "react";
import { securityLogs } from "../data/securityLogs";

function Logs() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");

  const filteredLogs = securityLogs.filter((log) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      log.type.toLowerCase().includes(searchText) ||
      log.user.toLowerCase().includes(searchText);

    const matchesType =
      typeFilter === "All" || log.type === typeFilter;

    const matchesStatus =
      statusFilter === "All" || log.status === statusFilter;

    const matchesSeverity =
      severityFilter === "All" || log.severity === severityFilter;

    return (
      matchesSearch &&
      matchesType &&
      matchesStatus &&
      matchesSeverity
    );
  });

  const resetFilters = () => {
    setSearch("");
    setTypeFilter("All");
    setStatusFilter("All");
    setSeverityFilter("All");
  };

  return (
    <div className="page">
      <h1>Security Logs</h1>

      <p>
        Monitor AI security events and detected threats.
      </p>

      {/* Log Summary */}
      <div className="log-summary">
        <div className="log-card">
          <h3>Total Events</h3>
          <p>{securityLogs.length}</p>
        </div>

        <div className="log-card">
          <h3>Blocked</h3>
          <p>
            {securityLogs.filter(
              (log) => log.status === "Blocked"
            ).length}
          </p>
        </div>

        <div className="log-card">
          <h3>Masked</h3>
          <p>
            {securityLogs.filter(
              (log) => log.status === "Masked"
            ).length}
          </p>
        </div>

        <div className="log-card">
          <h3>High Severity</h3>
          <p>
            {securityLogs.filter(
              (log) => log.severity === "High"
            ).length}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="log-controls">
        <input
          type="text"
          placeholder="Search threat type or user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="All">All Threat Types</option>
          <option value="Prompt Injection">
            Prompt Injection
          </option>
          <option value="Jailbreak Attempt">
            Jailbreak Attempt
          </option>
          <option value="Sensitive Data">
            Sensitive Data
          </option>
          <option value="Normal Request">
            Normal Request
          </option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Blocked">Blocked</option>
          <option value="Allowed">Allowed</option>
          <option value="Masked">Masked</option>
        </select>

        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
        >
          <option value="All">All Severity</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button
          className="reset-button"
          onClick={resetFilters}
        >
          Reset
        </button>
      </div>

      {/* Result Count */}
      <p className="result-count">
        Showing {filteredLogs.length} of {securityLogs.length} events
      </p>

      {/* Security Logs Table */}
      {filteredLogs.length === 0 ? (
        <div className="empty-state">
          <h3>No Security Logs Found</h3>

          <p>
            No security events match your current search or filters.
          </p>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default Logs;