import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

const App = () => {
  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">EXP 14 - User Authentication & Session Management</p>
        <h1>React Authentication Portal</h1>
        <p className="hero-copy">
          Register, log in, store session details in localStorage, protect the
          home page, fetch the full profile from the backend, and log out
          cleanly.
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
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  );
};

export default App;
