import { useState } from "react";
import API from "../api/api";
import getErrorMessage from "../api/errorMessage";
import { Link, useLocation, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const location = useLocation();
  const [data, setData] = useState({
    email: location.state?.email || "",
    otp: ""
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!data.email || !data.otp) {
      alert("Please enter email and OTP");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/verify", data);
      alert(res.data);
      navigate("/login", { state: { email: data.email } });
    } catch (error) {
      alert(getErrorMessage(error, "Invalid OTP"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="page-card auth-form" onSubmit={handleVerify}>
      <h2>Verify OTP</h2>
      <p>Enter the OTP sent to your email after registration.</p>
      <p className="helper-note">
        Not getting the OTP? Check spam, make sure the email is correct, and confirm the backend mail settings are running.
      </p>
      <input name="email" type="email" placeholder="Email" value={data.email} onChange={handleChange} />
      <input name="otp" placeholder="OTP" value={data.otp} onChange={handleChange} />
      <button type="submit" disabled={loading}>
        {loading ? "Verifying..." : "Verify"}
      </button>
      <div className="form-links">
        <Link to="/">Back to register</Link>
        <Link to="/login">Go to login</Link>
      </div>
    </form>
  );
};

export default VerifyOtp;
