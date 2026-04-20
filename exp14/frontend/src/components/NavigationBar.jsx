import { Link, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <nav className="nav-bar">
      <Link to="/home">Home</Link>
      <Link to="/profile">Profile</Link>
      <button type="button" className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default NavigationBar;
