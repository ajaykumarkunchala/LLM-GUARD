import { useAuth } from "../AuthContext";

function UserHeader() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="user-header">
      <div>
        <span className="user-header-label">Logged in as</span>
        <strong>{user.username}</strong>
      </div>

      <div>
        <span className="user-header-label">Role</span>
        <span className={`role-badge ${user.role.toLowerCase()}`}>
          {user.role}
        </span>
      </div>
    </div>
  );
}

export default UserHeader;