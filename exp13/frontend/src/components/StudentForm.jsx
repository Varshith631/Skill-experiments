import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  email: "",
  course: "",
};

const StudentForm = ({ editingStudent, onSaveStudent, onCancelEdit }) => {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name,
        email: editingStudent.email,
        course: editingStudent.course,
      });
      return;
    }

    setFormData(emptyForm);
  }, [editingStudent]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const saved = await onSaveStudent(formData);
    if (saved && !editingStudent) {
      setFormData(emptyForm);
    }
  };

  return (
    <section className="panel-card">
      <div className="section-heading">
        <p className="section-tag">{editingStudent ? "Deployment Update" : "Deployment Create"}</p>
        <h2>{editingStudent ? "Update Student Record" : "Create Student Record"}</h2>
        <p>
          Use this panel to verify that deployed frontend-to-backend requests
          still work after build and packaging.
        </p>
      </div>

      <form className="student-form" onSubmit={handleSubmit}>
        <label>
          <span>Name</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student name"
            required
          />
        </label>

        <label>
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter student email"
            required
          />
        </label>

        <label>
          <span>Course</span>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="Enter course name"
            required
          />
        </label>

        <div className="button-row">
          <button type="submit" className="primary-button">
            {editingStudent ? "Update Student" : "Add Student"}
          </button>

          {editingStudent && (
            <button type="button" className="secondary-button" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default StudentForm;
