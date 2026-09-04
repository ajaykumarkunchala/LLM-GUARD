function Users() {
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
      <h1>Users</h1>

      <p>
        Manage users and their assigned roles.
      </p>

      <table className="logs-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;