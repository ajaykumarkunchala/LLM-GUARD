import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Logs from "./pages/Logs";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />

        <main className="main-content">
          <Routes>

            <Route path="/login" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Analyst"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/logs"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Analyst"]}>
                  <Logs />
                </ProtectedRoute>
              }
            />

            <Route
              path="/users"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <Users />
                </ProtectedRoute>
              }
            />

            <Route path="/" element={<Login />} />

          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;