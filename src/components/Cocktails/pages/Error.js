import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="section error-section">
      <div className="error-container">
        <div class="info-label">
          <div class="error">
            <h2> 404 </h2>
          </div>
        </div>

        <div class="info-text">
          <h1>Page not found</h1>
          <Link to="/" children="Home" className="btn btn-primary"/>
        </div>
      </div>
    </section>
  );
};

export default Error;
