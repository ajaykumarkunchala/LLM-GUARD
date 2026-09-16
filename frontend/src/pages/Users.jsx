import { useAuth } from "../AuthContext";

function Users() {
  const { user } = useAuth();

  const users = [
    {
      id: 1,
      name: "Admin User",
      role: "Admin",
    },
    {
      id: 2,
      name: "Security Analyst",
      role: "Analyst",
    },
    {
      id: 3,
      name: "Security Analyst 2",
      role: "Analyst",
    },
  ];

  return (
    <div className="page">
      <h1>User Management</h1>

      <p>
        Manage users and their assigned security roles.
      </p>

      <div className="user-info">
        <h3>Access Level</h3>

        <p>
          Logged in as: <strong>{user?.username}</strong>
        </p>

        <p>
          Role: <strong>{user?.role}</strong>
        </p>
      </div>

      <table className="logs-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Role</th>
            <th>Access</th>
          </tr>
        </thead>

        <tbody>
          {users.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.role}</td>
              <td>
                {item.role === "Admin"
                  ? "Full Access"
                  : "Dashboard & Logs"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {user?.role === "Admin" && (
        <div className="admin-actions">
          <h3>Admin Actions</h3>
          <button>Add User</button>
        </div>
      )}
    </div>
  );
}

export default Users;