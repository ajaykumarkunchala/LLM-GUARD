import { useState } from "react";
import { useAuth } from "../AuthContext";
import { activityLogs } from "../data/activityLogs";
import { users as initialUsers } from "../data/users";

function Users() {
  const { user } = useAuth();

  const [userList, setUserList] = useState(initialUsers);

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
      id: userList.length + 1,
      name: newUsername,
      role: newRole,
    };

    setUserList([...userList, newUser]);

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
    const selectedUser = userList.find(
      (item) => item.id === id
    );

    if (!selectedUser) {
      return;
    }

    if (selectedUser.role === "Admin") {
      alert("Admin users cannot be deleted.");
      return;
    }

    const confirmDelete = window.confirm(
      `Delete user "${selectedUser.name}"?`
    );

    if (confirmDelete) {
      setUserList(
        userList.filter((item) => item.id !== id)
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

      {/* Current User */}
      <div className="user-info">
        <h3>Access Level</h3>

        <p>
          Logged in as:{" "}
          <strong>{user?.username}</strong>
        </p>

        <p>
          Role: <strong>{user?.role}</strong>
        </p>
      </div>

      {/* User Table */}
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
          {userList.map((item) => (
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

      {/* Admin Actions */}
      {user?.role === "Admin" && (
        <div className="admin-actions">
          <h3>Admin Actions</h3>

          <button
            onClick={() =>
              setShowForm(!showForm)
            }
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
                <option value="Analyst">
                  Analyst
                </option>

                <option value="Admin">
                  Admin
                </option>
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