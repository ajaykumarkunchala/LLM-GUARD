function Logs() {
  const logs = [
    {
      id: 1,
      type: "Prompt Injection",
      user: "user01",
      status: "Blocked",
    },
    {
      id: 2,
      type: "Normal Request",
      user: "user02",
      status: "Allowed",
    },
    {
      id: 3,
      type: "Sensitive Data",
      user: "user03",
      status: "Masked",
    },
    {
      id: 4,
      type: "Jailbreak Attempt",
      user: "user04",
      status: "Blocked",
    },
  ];

  return (
    <div className="page">
      <h1>Security Logs</h1>

      <p>
        Monitor AI security events and detected threats.
      </p>

      <table className="logs-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Threat Type</th>
            <th>User</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.type}</td>
              <td>{log.user}</td>
              <td>{log.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Logs;