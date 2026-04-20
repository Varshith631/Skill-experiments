import { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";

const API_URL = "http://localhost:8084/api/auth";

const Profile = () => {
  const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setError("");
        setLoading(true);
        const response = await axios.get(`${API_URL}/profile`, {
          params: { username: storedUser?.username },
        });
        setProfile(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Unable to load profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [storedUser?.username]);

  return (
    <section className="page-card content-card">
      <NavigationBar />

      <div className="section-heading">
        <p className="section-tag">Profile</p>
        <h2>User Profile Details</h2>
        <p>
          This page reads the stored username, calls the backend, and displays
          the complete user record from the database.
        </p>
      </div>

      {loading && <p className="status-message">Loading profile...</p>}
      {error && <p className="status-message error-message">{error}</p>}

      {!loading && !error && profile && (
        <div className="info-grid">
          <article className="info-card">
            <strong>ID</strong>
            <p>{profile.id}</p>
          </article>
          <article className="info-card">
            <strong>Name</strong>
            <p>{profile.name}</p>
          </article>
          <article className="info-card">
            <strong>Username</strong>
            <p>{profile.username}</p>
          </article>
          <article className="info-card">
            <strong>Email</strong>
            <p>{profile.email}</p>
          </article>
        </div>
      )}
    </section>
  );
};

export default Profile;
