import NavigationBar from "../components/NavigationBar";

const Home = () => {
  const authData = JSON.parse(localStorage.getItem("authData"));

  return (
    <section className="page-card content-card">
      <NavigationBar />

      <div className="section-heading">
        <p className="section-tag">Dashboard</p>
        <h2>JWT Session Active</h2>
        <p>
          The token is stored in localStorage and sent in the Authorization
          header to protected backend endpoints.
        </p>
      </div>

      <div className="info-grid">
        <article className="info-card">
          <strong>Username</strong>
          <p>{authData?.username}</p>
        </article>
        <article className="info-card">
          <strong>Role</strong>
          <p>{authData?.role}</p>
        </article>
        <article className="info-card">
          <strong>Token Type</strong>
          <p>Bearer JWT</p>
        </article>
      </div>

      <div className="tips-card">
        <h3>Postman Checks</h3>
        <p>`POST /login` to get a token, then use `Bearer &lt;token&gt;` for:</p>
        <p>`POST /admin/add` and `DELETE /admin/delete?id=1` as ADMIN</p>
        <p>`GET /employee/profile` as EMPLOYEE or ADMIN</p>
      </div>
    </section>
  );
};

export default Home;
