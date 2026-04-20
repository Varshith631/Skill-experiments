import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const POSTS_API = "https://dummyjson.com/posts";

const FakePostList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(POSTS_API);
      const apiPosts = response.data.posts || [];
      setPosts(apiPosts);
    } catch (err) {
      setError(
        err.message || "Something went wrong while fetching fake API posts."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (selectedUser === "all") {
      setFilteredPosts(posts);
      return;
    }

    setFilteredPosts(
      posts.filter((post) => String(post.userId) === selectedUser)
    );
  }, [posts, selectedUser]);

  const userOptions = [...new Set(posts.map((post) => post.userId))];

  return (
    <section className="page-card data-page">
      <div className="section-heading">
        <p className="section-tag">Part C</p>
        <h2>Fetching from Fake API with Axios</h2>
        <p>
          Posts are fetched from DummyJSON using Axios. Use the dropdown to
          filter by <code>userId</code> and the refresh button to reload data.
        </p>
      </div>

      <div className="toolbar">
        <label className="filter-group">
          <span>Filter by userId</span>
          <select
            value={selectedUser}
            onChange={(event) => setSelectedUser(event.target.value)}
          >
            <option value="all">All Users</option>
            {userOptions.map((userId) => (
              <option key={userId} value={String(userId)}>
                User {userId}
              </option>
            ))}
          </select>
        </label>

        <button
          className="action-button"
          type="button"
          onClick={fetchPosts}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh Posts"}
        </button>
      </div>

      {loading && <p className="status-message">Loading fake API posts...</p>}
      {error && <p className="status-message error-message">{error}</p>}

      {!loading && !error && (
        <div className="data-list">
          {filteredPosts.map((post) => (
            <article key={post.id} className="data-item">
              <div className="data-item-meta">User ID: {post.userId}</div>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
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

export default FakePostList;
