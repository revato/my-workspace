import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Notes from "./pages/Notes";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainLayout from "./layout/MainLayout";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => setIsLoggedIn(true);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
  };

  return (
    <Routes>
      {isLoggedIn ? (
        // Protected routes wrapped with MainLayout (sidebar)
        <Route element={<MainLayout onLogout={handleLogout} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      ) : (
        // Public routes
        <>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={
              <Signup onSignup={() => (window.location.href = "/login")} />
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
}
