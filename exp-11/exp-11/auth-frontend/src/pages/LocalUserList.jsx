import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LocalUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/users.json");

        if (!response.ok) {
          throw new Error("Unable to load local users.");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(
          err.message || "Something went wrong while fetching local users."
        );
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <section className="page-card data-page">
      <div className="section-heading">
        <p className="section-tag">Part A</p>
        <h2>Fetching from Local JSON</h2>
        <p>
          The user records below come from <code>public/users.json</code> and
          are loaded with the Fetch API.
        </p>
      </div>

      {loading && <p className="status-message">Loading local user records...</p>}
      {error && <p className="status-message error-message">{error}</p>}

      {!loading && !error && (
        <div className="data-list">
          {users.map((user) => (
            <article key={user.id} className="data-item">
              <h3>{user.name}</h3>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
            </article>
          ))}
        </div>
      )}

      <div className="footer-link">
        <Link className="inline-link" to="/">
          Back to Dashboard
        </Link>
      </div>
    </section>
  );
};

export default LocalUserList;
