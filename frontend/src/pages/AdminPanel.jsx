import { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";

const API_URL = "http://localhost:8085";

const initialForm = {
  name: "",
  department: "",
  email: "",
  position: "",
};

const AdminPanel = () => {
  const authData = JSON.parse(localStorage.getItem("authData"));
  const [formData, setFormData] = useState(initialForm);
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const authHeaders = {
    Authorization: `Bearer ${authData?.token}`,
  };

  const loadEmployees = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/employees`, {
        headers: authHeaders,
      });
      setEmployees(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Unable to load employees.");
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

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
      setMessage("");
      setError("");
      await axios.post(`${API_URL}/admin/add`, formData, {
        headers: authHeaders,
      });
      setFormData(initialForm);
      setMessage("Employee record added successfully.");
      loadEmployees();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Unable to add employee.");
    }
  };

  const handleDelete = async (id) => {
    try {
      setMessage("");
      setError("");
      await axios.delete(`${API_URL}/admin/delete`, {
        headers: authHeaders,
        params: { id },
      });
      setMessage("Employee record deleted successfully.");
      loadEmployees();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Unable to delete employee.");
    }
  };

  return (
    <section className="page-card content-card">
      <NavigationBar />

      <div className="section-heading">
        <p className="section-tag">Admin</p>
        <h2>Manage Employee Records</h2>
        <p>
          Only ADMIN users can access `/admin/add`, `/admin/delete`, and the employee list.
        </p>
      </div>

      {message && <p className="status-message success-message">{message}</p>}
      {error && <p className="status-message error-message">{error}</p>}

      <form className="auth-form admin-form" onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Employee name" required />
        <input name="department" value={formData.department} onChange={handleChange} placeholder="Department" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input name="position" value={formData.position} onChange={handleChange} placeholder="Position" required />
        <button type="submit" className="primary-button">Add Employee</button>
      </form>

      <div className="table-wrap">
        <table className="records-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Position</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.department}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td>
                  <button type="button" className="danger-button" onClick={() => handleDelete(employee.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminPanel;
