import NavigationBar from "../components/NavigationBar";

const Home = () => {
  const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  return (
    <section className="page-card content-card">
      <NavigationBar />

      <div className="section-heading">
        <p className="section-tag">Home</p>
        <h2>Session Active</h2>
        <p>
          This page loads only when a logged-in user exists in localStorage.
        </p>
      </div>

      <div className="info-grid">
        <article className="info-card">
          <strong>Logged In User</strong>
          <p>{storedUser?.username}</p>
        </article>
        <article className="info-card">
          <strong>User ID</strong>
          <p>{storedUser?.userId}</p>
        </article>
        <article className="info-card">
          <strong>Session Storage Type</strong>
          <p>localStorage</p>
        </article>
      </div>
    </section>
  );
};

export default Home;
