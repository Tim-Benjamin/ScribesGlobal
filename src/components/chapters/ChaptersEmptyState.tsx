import {
  Link,
} from "react-router-dom";

export default function ChaptersEmptyState() {
  return (
    <section className="chapters-state">
      <div className="chapters-state__orb" />

      <div className="chapters-state__content">
        <span>
          No active chapters
        </span>

        <h2>
          THE NETWORK IS
          <strong>
            GROWING.
          </strong>
        </h2>

        <p>
          There are currently no
          active public chapters to
          display. Check back again
          as the Scribes Global
          community continues to
          expand.
        </p>

        <Link
          to="/volunteer"
          className="chapters-state__button"
        >
          Connect with Scribes
          <span>
            ↗
          </span>
        </Link>
      </div>
    </section>
  );
}