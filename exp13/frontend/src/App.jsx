import { useEffect, useState } from "react";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import "./App.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const App = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`${API_BASE_URL}/students`);
      setStudents(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to fetch students from backend."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleSaveStudent = async (student) => {
    try {
      setError("");
      if (editingStudent) {
        await axios.put(`${API_BASE_URL}/students/${editingStudent.id}`, student);
        setMessage("Student updated successfully.");
      } else {
        await axios.post(`${API_BASE_URL}/students`, student);
        setMessage("Student added successfully.");
      }

      setEditingStudent(null);
      await loadStudents();
      return true;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to save student."
      );
      return false;
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      setError("");
      await axios.delete(`${API_BASE_URL}/students/${id}`);
      setMessage("Student deleted successfully.");
      if (editingStudent?.id === id) {
        setEditingStudent(null);
      }
      await loadStudents();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to delete student."
      );
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setMessage("");
    setError("");
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
    setMessage("");
    setError("");
  };

  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">EXP 13 - Deployment of Full-Stack Application</p>
        <h1>Deployment Verification Console</h1>
        <p className="hero-copy">
          This frontend is intentionally deployment-focused. It demonstrates
          React production build generation, Spring Boot JAR packaging,
          environment variable configuration, and final deployment through the
          Spring Boot static folder.
        </p>
        <div className="info-strip">
          <span>Task 1: React production build completed</span>
          <span>Task 2: Spring Boot JAR packaging ready</span>
          <span>Task 3: Environment variables configured</span>
          <span>Task 4: Backend APIs exposed under /api</span>
          <span>Task 5: React served from Spring static folder</span>
        </div>
      </section>

      <section className="layout-grid">
        <StudentForm
          editingStudent={editingStudent}
          onSaveStudent={handleSaveStudent}
          onCancelEdit={handleCancelEdit}
        />

        <StudentTable
          students={students}
          loading={loading}
          message={message}
          error={error}
          onEditStudent={handleEditStudent}
          onDeleteStudent={handleDeleteStudent}
        />
      </section>
    </main>
  );
};

export default App;
