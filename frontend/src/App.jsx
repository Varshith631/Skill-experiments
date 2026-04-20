import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPanel from "./pages/AdminPanel";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmployeeProfile from "./pages/EmployeeProfile";
import Register from "./pages/Register";
import "./App.css";

const App = () => {
  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">EXP 15 - JWT Authentication & Role Authorization</p>
        <h1>Corporate Portal Security Console</h1>
        <p className="hero-copy">
          Log in with JWT, protect routes using bearer tokens, and allow only
          ADMIN users to manage employee records while EMPLOYEE users access
          profile data.
        </p>
      </section>

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute roles={["ADMIN", "EMPLOYEE"]}>
              <EmployeeProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  );
};

export default App;
