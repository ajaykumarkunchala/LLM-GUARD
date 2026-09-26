import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("llmGuardUser");

    if (savedUser) {
      return JSON.parse(savedUser);
    }

    return null;
  });

  const login = (username, role) => {
    const loggedInUser = {
      username,
      role,
    };

    setUser(loggedInUser);

    localStorage.setItem(
      "llmGuardUser",
      JSON.stringify(loggedInUser)
    );
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("llmGuardUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}