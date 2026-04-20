import { Link, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();
  const authData = JSON.parse(localStorage.getItem("authData"));

  const handleLogout = () => {
    localStorage.removeItem("authData");
    navigate("/login");
  };

  return (
    <nav className="nav-bar">
      <Link to="/home">Home</Link>
      <Link to="/profile">Profile</Link>
      {authData?.role === "ADMIN" && <Link to="/admin">Admin Panel</Link>}
      <button type="button" className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default NavigationBar;
