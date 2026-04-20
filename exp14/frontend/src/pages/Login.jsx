import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8084/api/auth";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setError("");
      const response = await axios.post(`${API_URL}/login`, formData);
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed.");
    }
  };

  return (
    <section className="page-card auth-card">
      <div className="section-heading">
        <p className="section-tag">Login</p>
        <h2>Welcome Back</h2>
        <p>Validate credentials, store the logged-in user, and redirect to home.</p>
      </div>

      {error && <p className="status-message error-message">{error}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <button type="submit" className="primary-button">Login</button>
      </form>

      <p className="form-link-line">
        New user? <Link to="/register">Create an account</Link>
      </p>
    </section>
  );
};

export default Login;
