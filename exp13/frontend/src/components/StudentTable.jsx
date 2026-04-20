const StudentTable = ({
  students,
  loading,
  message,
  error,
  onEditStudent,
  onDeleteStudent,
}) => {
  return (
    <section className="panel-card">
      <div className="section-heading">
        <p className="section-tag">Post Deployment Check</p>
        <h2>Live Deployment Results</h2>
        <p>
          After deployment, CRUD operations here should continue to work without
          reloading the page. This table confirms frontend and backend
          integration in deployed mode.
        </p>
      </div>

      {loading && <p className="status-message">Loading students...</p>}
      {!error && message && <p className="status-message success-message">{message}</p>}
      {error && <p className="status-message error-message">{error}</p>}

      {!loading && (
        <div className="table-wrap">
          <table className="student-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state">
                    No records found. Add one to verify deployment.
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.course}</td>
                    <td>
                      <div className="button-row">
                        <button
                          type="button"
                          className="secondary-button"
                          onClick={() => onEditStudent(student)}
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="danger-button"
                          onClick={() => onDeleteStudent(student.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default StudentTable;
