import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LocalUserList from "./pages/LocalUserList";
import UserList from "./pages/UserList";
import FakePostList from "./pages/FakePostList";

const App = () => {
  return (
    <main className="app-shell">
      <section className="hero-block">
        <p className="eyebrow">Skill 11 - React API Integration</p>
        <h1>News Portal Data Dashboard</h1>
        <p className="hero-copy">
          A workbook-ready React app that demonstrates local JSON loading,
          public API fetching with <code>fetch()</code>, Axios integration with
          a fake API, filtering, refresh handling, and page navigation.
        </p>
      </section>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/local-users">Local Users</Link>
        <Link to="/users-api">Users API</Link>
        <Link to="/fake-posts">Fake API Posts</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/local-users" element={<LocalUserList />} />
        <Route path="/users-api" element={<UserList />} />
        <Route path="/fake-posts" element={<FakePostList />} />
      </Routes>
    </main>
  );
};

export default App;
