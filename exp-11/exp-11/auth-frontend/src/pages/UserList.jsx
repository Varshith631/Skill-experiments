import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
          throw new Error("Unable to load users from JSONPlaceholder.");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(
          err.message || "Something went wrong while fetching API users."
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
        <p className="section-tag">Part B</p>
        <h2>Fetching from JSONPlaceholder</h2>
        <p>
          This component uses <code>fetch()</code> to call the public users API
          and display name, email, and phone details.
        </p>
      </div>

      {loading && <p className="status-message">Loading API users...</p>}
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

export default UserList;
