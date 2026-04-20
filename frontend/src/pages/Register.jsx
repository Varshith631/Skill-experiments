import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8085";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "EMPLOYEE",
  });
  const [message, setMessage] = useState("");
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
      setMessage("");
      await axios.post(`${API_URL}/register`, formData);
      setMessage("Registration successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 900);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Registration failed.");
    }
  };

  return (
    <section className="page-card auth-card">
      <div className="section-heading">
        <p className="section-tag">Register</p>
        <h2>Create Portal User</h2>
        <p>Create either an ADMIN or EMPLOYEE account for JWT-based login.</p>
      </div>

      {message && <p className="status-message success-message">{message}</p>}
      {error && <p className="status-message error-message">{error}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="EMPLOYEE">EMPLOYEE</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button type="submit" className="primary-button">Register</button>
      </form>

      <p className="form-link-line">
        Already registered? <Link to="/login">Login here</Link>
      </p>
    </section>
  );
};

export default Register;
