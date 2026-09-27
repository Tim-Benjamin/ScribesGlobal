import {
  Link,
} from "react-router-dom";

export default function EventsEmptyState() {
  return (
    <section className="events-state">
      <div className="events-state__signal">
        <span />
        <span />
        <span />
      </div>

      <div className="events-state__content">
        <span>
          No events yet
        </span>

        <h2>
          THE NEXT
          <strong>
            GATHERING IS COMING.
          </strong>
        </h2>

        <p>
          There are currently no
          public events to display.
          When the next Scribes
          Global gathering is
          announced, it will appear
          here.
        </p>

        <Link
          to="/"
          className="events-state__button"
        >
          Back home

          <span>
            ↗
          </span>
        </Link>
      </div>
    </section>
  );
}