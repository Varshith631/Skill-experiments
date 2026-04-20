import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [backendInfo, setBackendInfo] = useState(null);
  const [backendError, setBackendError] = useState("");

  useEffect(() => {
    const loadBackendInfo = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/project-info");

        if (!response.ok) {
          throw new Error("Backend service is not responding.");
        }

        const data = await response.json();
        setBackendInfo(data);
      } catch (error) {
        setBackendError(
          error.message ||
            "Unable to reach the backend. Start the backend before the demo."
        );
      }
    };

    loadBackendInfo();
  }, []);

  return (
    <section className="page-card dashboard-page">
      <div className="section-heading">
        <p className="section-tag">Part D</p>
        <h2>Project Dashboard</h2>
        <p>
          Use the links below to open each required component. This home page
          also checks the backend service so your submission includes both
          frontend and backend output.
        </p>
      </div>

      <div className="dashboard-links">
        <Link to="/local-users">
          Local Users
          <span>Fetch records from `public/users.json` using `fetch()`.</span>
        </Link>
        <Link to="/users-api">
          Users API
          <span>Load live user data from JSONPlaceholder with loading/error handling.</span>
        </Link>
        <Link to="/fake-posts">
          Fake API Posts
          <span>Use Axios with refresh and filtering by `userId`.</span>
        </Link>
      </div>

      <div className="stats-grid">
        <article className="info-card">
          <strong>Frontend Stack</strong>
          <p>React + Vite + React Router + Axios</p>
        </article>
        <article className="info-card">
          <strong>Required Hooks</strong>
          <p>`useState` and `useEffect` drive loading, refresh, and filtering.</p>
        </article>
        <article className="info-card">
          <strong>Styling</strong>
          <p>Responsive card layout with simple workbook-ready CSS.</p>
        </article>
      </div>

      {backendInfo && (
        <p className="status-message success-message">
          Backend connected: {backendInfo.projectName} on port {backendInfo.port}
        </p>
      )}

      {backendError && (
        <p className="status-message error-message">{backendError}</p>
      )}

      <div className="feature-grid">
        <article className="feature-card">
          <strong>Backend API</strong>
          <p>
            The backend uses Spring Boot with MySQL `testdb` and reads from the
            `users` table.
          </p>
        </article>
        <article className="feature-card">
          <strong>Submission Notes</strong>
          <p>
            This app satisfies local JSON fetch, public API fetch, Axios usage,
            filtering, refresh, routing, and neat UI styling.
          </p>
        </article>
      </div>
    </section>
  );
};

export default Dashboard;
