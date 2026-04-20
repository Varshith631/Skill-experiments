import { useState } from "react";
import API from "../api/api";
import getErrorMessage from "../api/errorMessage";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/login", data);
      alert(res.data);

      if (res.data === "Login successful!") {
        navigate("/dashboard");
      }
    } catch (error) {
      alert(getErrorMessage(error, "Login failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="page-card auth-form" onSubmit={handleLogin}>
      <h2>Login</h2>
      <p>Sign in after your email has been verified with the OTP.</p>
      <input name="email" type="email" placeholder="Email" value={data.email} onChange={handleChange} />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={handleChange}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Login"}
      </button>
      <div className="form-links">
        <Link to="/">Create account</Link>
        <Link to="/verify">Verify OTP</Link>
      </div>
    </form>
  );
};

export default Login;
