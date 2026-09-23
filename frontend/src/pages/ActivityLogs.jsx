import { activityLogs } from "../data/activityLogs";

function ActivityLogs() {
  return (
    <div className="page">
      <h1>Activity Logs</h1>

      <p>
        Monitor administrative actions performed in the dashboard.
      </p>

      <table className="logs-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Action</th>
            <th>Details</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {activityLogs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.user}</td>
              <td>{log.action}</td>
              <td>{log.details}</td>
              <td>{log.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActivityLogs;