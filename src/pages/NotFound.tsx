import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page section">
      <div className="container">
        <p>404</p>

        <h1>
          This page doesn't exist.
        </h1>

        <Link to="/">
          Return home
        </Link>
      </div>
    </section>
  );
}