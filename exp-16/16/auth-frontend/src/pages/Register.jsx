import { useState } from "react";
import API from "../api/api";
import getErrorMessage from "../api/errorMessage";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/register", form);
      alert(res.data);
      navigate("/verify", { state: { email: form.email } });
    } catch (error) {
      alert(getErrorMessage(error, "Error registering user"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="page-card auth-form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      <p>Create your account and receive an OTP at your email address to verify your account.</p>
      <p className="helper-note">
        Use a real email address you can access. After registering, check your inbox and spam folder for the OTP.
      </p>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
      <div className="form-links">
        <Link to="/verify">Already have OTP?</Link>
        <Link to="/login">Go to login</Link>
      </div>
    </form>
  );
};

export default Register;
