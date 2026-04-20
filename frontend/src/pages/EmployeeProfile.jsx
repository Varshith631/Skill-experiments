import { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";

const API_URL = "http://localhost:8085";

const EmployeeProfile = () => {
  const authData = JSON.parse(localStorage.getItem("authData"));
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(`${API_URL}/employee/profile`, {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        });
        setProfile(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Unable to load profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [authData?.token]);

  return (
    <section className="page-card content-card">
      <NavigationBar />

      <div className="section-heading">
        <p className="section-tag">Employee</p>
        <h2>Secured Profile Endpoint</h2>
        <p>This data is returned only after JWT validation and role authorization.</p>
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
            <strong>Username</strong>
            <p>{profile.username}</p>
          </article>
          <article className="info-card">
            <strong>Role</strong>
            <p>{profile.role}</p>
          </article>
        </div>
      )}
    </section>
  );
};

export default EmployeeProfile;
