import { useState } from "react";
import { useAuth } from "../AuthContext";
import { activityLogs } from "../data/activityLogs";

function Users() {
  const { user } = useAuth();

  const [users, setUsers] = useState([
    { id: 1, name: "Admin User", role: "Admin" },
    { id: 2, name: "Security Analyst", role: "Analyst" },
    { id: 3, name: "Security Analyst 2", role: "Analyst" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newRole, setNewRole] = useState("Analyst");

  const handleAddUser = (e) => {
    e.preventDefault();

    if (!newUsername.trim()) {
      alert("Please enter a username");
      return;
    }

    const newUser = {
      id: users.length + 1,
      name: newUsername,
      role: newRole,
    };

    setUsers([...users, newUser]);

    activityLogs.push({
      id: activityLogs.length + 1,
      user: user.username,
      action: "Add User",
      details: `Created user ${newUsername} with ${newRole} role`,
      time: new Date().toLocaleTimeString(),
    });

    setNewUsername("");
    setNewRole("Analyst");
    setShowForm(false);
  };

  const handleDeleteUser = (id) => {
    const selectedUser = users.find(
      (item) => item.id === id
    );

    if (selectedUser.role === "Admin") {
      alert("Admin users cannot be deleted.");
      return;
    }

    const confirmDelete = window.confirm(
      `Delete user "${selectedUser.name}"?`
    );

    if (confirmDelete) {
      setUsers(
        users.filter((item) => item.id !== id)
      );

      activityLogs.push({
        id: activityLogs.length + 1,
        user: user.username,
        action: "Delete User",
        details: `Deleted user ${selectedUser.name}`,
        time: new Date().toLocaleTimeString(),
      });
    }
  };

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
            <th>Action</th>
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

              <td>
                {item.role === "Admin" ? (
                  <span>Protected</span>
                ) : (
                  <button
                    className="delete-button"
                    onClick={() =>
                      handleDeleteUser(item.id)
                    }
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {user?.role === "Admin" && (
        <div className="admin-actions">
          <h3>Admin Actions</h3>

          <button
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Add User"}
          </button>

          {showForm && (
            <form
              className="add-user-form"
              onSubmit={handleAddUser}
            >
              <label>Username</label>

              <input
                type="text"
                placeholder="Enter username"
                value={newUsername}
                onChange={(e) =>
                  setNewUsername(e.target.value)
                }
              />

              <label>Role</label>

              <select
                value={newRole}
                onChange={(e) =>
                  setNewRole(e.target.value)
                }
              >
                <option value="Analyst">Analyst</option>
                <option value="Admin">Admin</option>
              </select>

              <button type="submit">
                Create User
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default Users;