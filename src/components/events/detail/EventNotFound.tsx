import {
  Link,
} from "react-router-dom";

type EventNotFoundProps = {
  error?: string | null;

  onRetry?: () => void;
};

export default function EventNotFound({
  error,
  onRetry,
}: EventNotFoundProps) {
  return (
    <section className="event-not-found">
      <div>
        <span>
          Event unavailable
        </span>

        <h1>
          THIS EVENT
          <strong>
            COULDN'T BE FOUND.
          </strong>
        </h1>

        {error && (
          <p>
            {error}
          </p>
        )}

        <div className="event-not-found__actions">
          <Link to="/events">
            ← All events
          </Link>

          {onRetry && (
            <button
              type="button"
              onClick={
                onRetry
              }
            >
              Retry ↻
            </button>
          )}
        </div>
      </div>
    </section>
  );
}